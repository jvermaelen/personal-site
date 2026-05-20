/* ============================================================================
 * Ask Jason — AI chat over Jason's professional background.
 * Inject:  <script src="ask-jason.js"></script>
 *
 * Demo wiring uses window.claude.complete (HTML-artifact built-in, runs on
 * claude-haiku-4-5, no API key needed). For the Next.js production build:
 *
 *   - Replace the window.claude.complete call with fetch('/api/chat', ...)
 *   - Route handler at app/api/chat/route.ts (Edge runtime)
 *   - Uses Anthropic SDK (Haiku for cost / Sonnet for quality)
 *   - RAG over an Upstash Vector index of:
 *       data/resume.json
 *       content/work/**.mdx
 *       content/writing/**.mdx
 *       content/now.mdx
 *   - Embeddings: OpenAI text-embedding-3-small or Voyage
 *   - Rate limit by IP (Upstash Ratelimit), no PII collection
 *   - System prompt scopes the model to topics about Jason's professional bg.
 *   - Conversation persists in localStorage only (no server-side history)
 *   - $20/mo Anthropic budget cap; cache common queries
 *
 * Listens for `command-palette-action` event with detail.action === 'ask-jason'
 * to open the chat (so Cmd+K → A opens this).
 * ==========================================================================*/

(function () {
  if (window.__askJasonLoaded) return;
  window.__askJasonLoaded = true;

  // ============ SYSTEM PROMPT ============
  // Edit this block to tune the bot. It's intentionally narrow.
  const SYSTEM_PROMPT = `You are a research assistant for Jason Vermaelen's personal portfolio site (jasonvermaelen.com). You answer questions from recruiters and hiring managers about his professional background.

WHO JASON IS:
- Senior Business Intelligence Analyst at Indeed (2024–present), on Salesforce CRM Analytics for Scaled Business Solutions.
- Previously: Product Strategist at Indeed (2022–2024, Global Product Commercialization); Senior Data Business Analyst at Talroo (2018–2022); CSA Team Lead at Talroo (2017–2018).
- BA Marketing, Southeastern Louisiana (2014). MS Data Analytics, WGU (in progress).
- Located in Austin, TX. Black belt in Brazilian Jiu-Jitsu (Paragon BJJ).
- Stack: SQL, Snowflake, Python, Salesforce CRM Analytics, Metabase, Tableau, Jupyter.

HEADLINE METRICS:
- Salesforce case automation that returned ~2,000 hours/year to the team (2024, Indeed).
- Built and shipped a global CRM Analytics dashboard with hundreds of daily users (2024, Indeed).
- Drove 2M+ employer↔jobseeker connections via GTM optimization (2023, Indeed).
- Led a 3-month promo that brought in 10K+ new clients (2023, Indeed).
- 700-client sales automation pilot, 2× adoption vs. control (2023, Indeed).
- Title expansion rollout: +50K clicks, +3K applicants Q/Q, record-low CPA (2020, Talroo).
- Led 5-person team owning 70% of revenue, grew 20% QoQ at 95% retention (2017–18, Talroo).

WHAT HE'S CONSIDERING NEXT:
- Senior Analytics, BizOps, or Product roles at Seed → Series D startups, AI-native companies, and FAANG.
- Remote (US) or Austin hybrid.
- Looking for teams where the data layer gets a seat in the launch meeting.

VOICE:
- Confident, dry, analyst-precise. Numbers before adjectives. Active verbs.
- Don't use "passionate," "data-driven decision making," "rockstar," or emojis.
- Be honest about scope: if you don't know something specific, say so and suggest the visitor email Jason directly at jason.vermaelen@gmail.com.

CONSTRAINTS:
- Only answer questions about Jason's professional background, work, fit for roles, and the projects mentioned on the site.
- If asked something off-topic, politely redirect.
- Never speculate about salary expectations, compensation history, or anything not on the site.
- Keep responses tight — 2–4 sentences for most answers, longer only for "tell me about [project]" depth questions.`;

  const SUGGESTED_PROMPTS = [
    "What's Jason's strongest case study?",
    "Tell me about his work at Indeed",
    "Is he a fit for a Series B startup?",
    "What's the Salesforce automation about?",
    "What kind of role is he looking for next?",
  ];

  // ============ STYLES ============
  const css = `
    .aj-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 80;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px 12px 14px;
      background: var(--accent);
      color: var(--accent-ink);
      border: none;
      border-radius: 999px;
      font-family: var(--sans);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      box-shadow:
        0 1px 0 rgba(0,0,0,0.04),
        0 10px 28px -10px color-mix(in oklab, var(--accent) 60%, transparent);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }
    .aj-fab:hover {
      transform: translateY(-2px);
      box-shadow:
        0 1px 0 rgba(0,0,0,0.04),
        0 14px 32px -10px color-mix(in oklab, var(--accent) 70%, transparent);
    }
    .aj-fab .aj-fab-icon {
      width: 22px; height: 22px; border-radius: 50%;
      background: color-mix(in oklab, var(--accent-ink) 18%, transparent);
      display: inline-flex; align-items: center; justify-content: center;
      font-family: var(--mono); font-size: 11px;
      letter-spacing: 0;
    }
    .aj-fab .aj-fab-icon::before { content: "?"; font-weight: 600; }
    .aj-fab .aj-fab-pulse {
      width: 8px; height: 8px; border-radius: 50%;
      background: color-mix(in oklab, var(--accent-ink) 70%, transparent);
      animation: aj-pulse 2.4s ease-out infinite;
      margin-left: 4px;
    }
    @keyframes aj-pulse {
      0%   { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent-ink) 60%, transparent); }
      70%  { box-shadow: 0 0 0 8px color-mix(in oklab, var(--accent-ink) 0%, transparent); }
      100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent-ink) 0%, transparent); }
    }

    .aj-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      z-index: 90;
      display: none;
    }
    .aj-overlay.open { display: block; }

    .aj-panel {
      position: fixed;
      bottom: 24px; right: 24px;
      width: min(440px, calc(100vw - 32px));
      max-height: min(680px, calc(100vh - 48px));
      background: var(--bg-elev);
      border: 1px solid var(--line-strong);
      border-radius: 12px;
      box-shadow: 0 24px 80px -20px rgba(0,0,0,0.45);
      z-index: 91;
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: aj-slide-up 220ms ease-out;
    }
    .aj-panel.open { display: flex; }
    @keyframes aj-slide-up {
      from { transform: translateY(16px); opacity: 0; }
      to   { transform: none; opacity: 1; }
    }

    .aj-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--line);
      display: flex; align-items: center; justify-content: space-between;
      background: var(--bg-elev-2);
    }
    .aj-header .aj-title {
      display: flex; align-items: center; gap: 10px;
      font-family: var(--sans); font-size: 15px; font-weight: 600;
      color: var(--ink);
    }
    .aj-header .aj-title-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
    }
    .aj-header .aj-sub {
      display: block;
      font-family: var(--mono); font-size: 11px;
      color: var(--muted); margin-top: 2px;
      letter-spacing: 0.02em;
    }
    .aj-close {
      background: none; border: none;
      color: var(--muted); font-family: var(--mono); font-size: 18px;
      cursor: pointer; padding: 0; line-height: 1;
      width: 28px; height: 28px; border-radius: 6px;
      display: inline-flex; align-items: center; justify-content: center;
      transition: background 120ms ease, color 120ms ease;
    }
    .aj-close:hover { background: var(--bg); color: var(--ink); }

    .aj-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .aj-empty {
      padding: 12px 0 4px;
    }
    .aj-empty .aj-empty-title {
      font-family: var(--sans); font-size: 17px; color: var(--ink);
      margin: 0 0 8px; font-weight: 500;
      letter-spacing: -0.01em;
    }
    .aj-empty .aj-empty-body {
      font-family: var(--sans); font-size: 14px;
      color: var(--ink-soft); line-height: 1.5; margin: 0 0 16px;
    }
    .aj-prompts {
      display: flex; flex-direction: column; gap: 8px;
    }
    .aj-prompt-chip {
      display: block; width: 100%; text-align: left;
      padding: 10px 14px;
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: 8px;
      font-family: var(--sans); font-size: 13px;
      color: var(--ink-soft);
      cursor: pointer;
      transition: border-color 120ms ease, background 120ms ease, color 120ms ease;
    }
    .aj-prompt-chip:hover {
      border-color: var(--accent);
      color: var(--ink);
      background: color-mix(in oklab, var(--accent) 5%, var(--bg));
    }

    .aj-msg {
      display: flex; flex-direction: column;
      gap: 4px;
      max-width: 100%;
    }
    .aj-msg-meta {
      font-family: var(--mono); font-size: 10px;
      text-transform: uppercase; letter-spacing: 0.12em;
      color: var(--muted);
    }
    .aj-msg-body {
      font-family: var(--sans); font-size: 14px; line-height: 1.55;
      color: var(--ink);
      padding: 12px 14px;
      border-radius: 10px;
      background: var(--bg);
      border: 1px solid var(--line);
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .aj-msg.user .aj-msg-meta { color: var(--accent); }
    .aj-msg.user .aj-msg-body {
      background: color-mix(in oklab, var(--accent) 10%, var(--bg-elev));
      border-color: color-mix(in oklab, var(--accent) 30%, var(--line));
    }
    .aj-msg.assistant .aj-msg-meta { color: var(--ink-soft); }

    .aj-typing {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 12px 14px;
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: 10px;
    }
    .aj-typing span {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--muted);
      animation: aj-typing 1.2s ease-in-out infinite;
    }
    .aj-typing span:nth-child(2) { animation-delay: 0.15s; }
    .aj-typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes aj-typing {
      0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
      30%           { opacity: 1;   transform: translateY(-3px); }
    }

    .aj-form {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--line);
      background: var(--bg-elev);
      display: flex; gap: 8px;
      align-items: flex-end;
    }
    .aj-input {
      flex: 1;
      min-height: 40px;
      max-height: 120px;
      padding: 10px 14px;
      border: 1px solid var(--line-strong);
      border-radius: 8px;
      background: var(--bg);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 14px;
      line-height: 1.4;
      resize: none;
      outline: none;
      transition: border-color 120ms ease;
    }
    .aj-input:focus { border-color: var(--accent); }
    .aj-input::placeholder { color: var(--muted); }
    .aj-send {
      height: 40px;
      padding: 0 16px;
      background: var(--accent);
      color: var(--accent-ink);
      border: none;
      border-radius: 8px;
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 120ms ease, transform 120ms ease;
    }
    .aj-send:hover { transform: translateY(-1px); }
    .aj-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .aj-footnote {
      padding: 8px 20px 12px;
      font-family: var(--mono); font-size: 10px;
      color: var(--muted-soft); letter-spacing: 0.02em;
      text-align: center;
      background: var(--bg-elev);
    }
    .aj-footnote a { color: var(--muted); text-decoration: underline; }

    @media (max-width: 600px) {
      .aj-fab { bottom: 16px; right: 16px; padding: 10px 14px; }
      .aj-panel {
        bottom: 0; right: 0; left: 0;
        width: 100%; max-height: 80vh;
        border-radius: 12px 12px 0 0;
      }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ============ MARKUP ============
  const fab = document.createElement('button');
  fab.className = 'aj-fab';
  fab.id = 'aj-fab';
  fab.setAttribute('aria-label', 'Ask Jason — open AI research assistant');
  fab.innerHTML = `
    <span class="aj-fab-icon" aria-hidden="true"></span>
    <span>Ask Jason</span>
    <span class="aj-fab-pulse" aria-hidden="true"></span>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'aj-overlay';
  overlay.id = 'aj-overlay';

  const panel = document.createElement('div');
  panel.className = 'aj-panel';
  panel.id = 'aj-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Ask Jason chat');
  panel.innerHTML = `
    <div class="aj-header">
      <div>
        <div class="aj-title">
          <span class="aj-title-dot" aria-hidden="true"></span>
          <span>Ask Jason</span>
        </div>
        <span class="aj-sub">research assistant · trained on this site</span>
      </div>
      <button class="aj-close" id="aj-close" aria-label="Close chat">×</button>
    </div>
    <div class="aj-body" id="aj-body">
      <div class="aj-empty" id="aj-empty">
        <h3 class="aj-empty-title">Ask about Jason's work.</h3>
        <p class="aj-empty-body">Case studies, fit for a role, what he's done — I'm a research assistant trained on his resume, projects, and Now page. For anything outside that scope, email <a href="mailto:jason.vermaelen@gmail.com" style="color: var(--accent);">jason.vermaelen@gmail.com</a>.</p>
        <div class="aj-prompts" id="aj-prompts"></div>
      </div>
    </div>
    <form class="aj-form" id="aj-form">
      <textarea
        class="aj-input"
        id="aj-input"
        placeholder="Ask anything about Jason's background…"
        rows="1"
        autocomplete="off"
      ></textarea>
      <button type="submit" class="aj-send" id="aj-send">Send</button>
    </form>
    <div class="aj-footnote">
      Powered by Claude · conversation lives in your browser only
    </div>
  `;

  // ============ INIT ============
  function init() {
    if (document.getElementById('aj-fab')) return;
    document.body.appendChild(fab);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    const body = document.getElementById('aj-body');
    const empty = document.getElementById('aj-empty');
    const promptsContainer = document.getElementById('aj-prompts');
    const form = document.getElementById('aj-form');
    const input = document.getElementById('aj-input');
    const send = document.getElementById('aj-send');

    // Render suggested prompts
    SUGGESTED_PROMPTS.forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'aj-prompt-chip';
      chip.type = 'button';
      chip.textContent = p;
      chip.addEventListener('click', () => {
        input.value = p;
        form.requestSubmit();
      });
      promptsContainer.appendChild(chip);
    });

    // Conversation state
    let messages = [];
    try {
      const stored = localStorage.getItem('ask-jason-v1');
      if (stored) messages = JSON.parse(stored);
    } catch (e) {}

    function persist() {
      try { localStorage.setItem('ask-jason-v1', JSON.stringify(messages)); } catch (e) {}
    }

    function renderMessage(role, content) {
      const wrap = document.createElement('div');
      wrap.className = `aj-msg ${role}`;
      wrap.innerHTML = `
        <span class="aj-msg-meta">${role === 'user' ? 'You' : 'Ask Jason'}</span>
        <div class="aj-msg-body"></div>
      `;
      wrap.querySelector('.aj-msg-body').textContent = content;
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
      return wrap;
    }

    function renderTyping() {
      const wrap = document.createElement('div');
      wrap.className = 'aj-msg assistant';
      wrap.id = 'aj-typing-row';
      wrap.innerHTML = `
        <span class="aj-msg-meta">Ask Jason</span>
        <div class="aj-typing"><span></span><span></span><span></span></div>
      `;
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
      return wrap;
    }

    // Replay stored conversation on load
    function replay() {
      if (messages.length > 0) {
        empty.style.display = 'none';
        messages.forEach(m => renderMessage(m.role, m.content));
      }
    }
    replay();

    function open() {
      panel.classList.add('open');
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 100);
    }
    function close() {
      panel.classList.remove('open');
      overlay.classList.remove('open');
    }

    fab.addEventListener('click', open);
    overlay.addEventListener('click', close);
    document.getElementById('aj-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) close();
    });

    // Cmd+K palette can request to open this
    window.addEventListener('command-palette-action', (e) => {
      if (e.detail && e.detail.action === 'ask-jason') open();
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(120, input.scrollHeight) + 'px';
    });

    // Enter to send, Shift+Enter for newline
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      // Hide empty state
      empty.style.display = 'none';

      // Add user message
      messages.push({ role: 'user', content: text });
      persist();
      renderMessage('user', text);

      // Reset input
      input.value = '';
      input.style.height = 'auto';
      send.disabled = true;

      // Show typing
      const typingEl = renderTyping();

      try {
        // ====================================================================
        // DEMO WIRING — uses window.claude.complete (HTML artifact built-in,
        // Haiku, 1024 token cap, no API key).
        //
        // For Next.js production: replace with `fetch('/api/chat', {...})`
        // and route to Anthropic SDK with system prompt + RAG context.
        // ====================================================================
        const result = await window.claude.complete({
          messages: [
            { role: 'user', content: `${SYSTEM_PROMPT}\n\n---\n\nUser question: ${text}` }
          ]
        });

        typingEl.remove();
        const reply = (result || "").trim() || "I'm not sure — try emailing Jason directly at jason.vermaelen@gmail.com.";
        messages.push({ role: 'assistant', content: reply });
        persist();
        renderMessage('assistant', reply);
      } catch (err) {
        typingEl.remove();
        const fallback = "I hit an error reaching the model. In the meantime, you can email Jason directly at jason.vermaelen@gmail.com.";
        messages.push({ role: 'assistant', content: fallback });
        persist();
        renderMessage('assistant', fallback);
      }

      send.disabled = false;
    });

    // Expose
    window.openAskJason = open;
    window.closeAskJason = close;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
