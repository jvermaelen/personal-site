/* ============================================================================
 * Command palette — shared across all pages.
 * Inject:  <script src="command-palette.js"></script>
 *
 * Reads CSS variables from the host page (--bg, --ink, --accent, etc.) so it
 * inherits theme automatically.
 *
 * Triggers `__command-palette-action` events on window for custom actions
 * other scripts (e.g. ask-jason.js) can listen for.
 * ==========================================================================*/

(function () {
  if (window.__cmdkLoaded) return;
  window.__cmdkLoaded = true;

  // ============ STYLES ============
  const css = `
    .kbd {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      border: 1px solid var(--line-strong);
      background: var(--bg-elev);
      border-radius: 4px;
      padding: 2px 8px;
      line-height: 1;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 26px;
      letter-spacing: 0.02em;
    }
    .kbd:hover { color: var(--ink); border-color: var(--accent); }

    .palette-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      z-index: 100;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 14vh;
    }
    .palette-backdrop.open { display: flex; }
    .palette {
      width: min(580px, 92vw);
      background: var(--bg-elev);
      border: 1px solid var(--line-strong);
      border-radius: 10px;
      box-shadow: 0 24px 80px -20px rgba(0,0,0,0.6);
      overflow: hidden;
      animation: cmdk-pop 180ms ease-out;
    }
    @keyframes cmdk-pop {
      from { transform: translateY(-12px) scale(0.98); opacity: 0; }
      to   { transform: none; opacity: 1; }
    }
    .palette-input {
      width: 100%;
      padding: 16px 20px;
      border: none;
      background: transparent;
      color: var(--ink);
      font-family: var(--sans);
      font-size: 15px;
      border-bottom: 1px solid var(--line);
      outline: none;
    }
    .palette-input::placeholder { color: var(--muted); }
    .palette-list { padding: 8px 0; max-height: 56vh; overflow-y: auto; }
    .palette-group {
      font-family: var(--mono);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--muted);
      padding: 10px 20px 6px;
    }
    .palette-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 20px;
      font-size: 14px;
      color: var(--ink-soft);
      cursor: pointer;
      text-decoration: none;
      transition: background 100ms ease, color 100ms ease;
    }
    .palette-item:hover, .palette-item.active {
      background: var(--bg-elev-2);
      color: var(--ink);
    }
    .palette-item .hint {
      margin-left: auto;
      font-family: var(--mono);
      font-size: 10px;
      color: var(--muted);
      background: var(--bg);
      border: 1px solid var(--line);
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.04em;
    }
    .palette-empty {
      padding: 24px 20px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--muted);
      text-align: center;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ============ MARKUP ============
  // Routes are relative paths matching the file layout in this preview project.
  // In the Next.js build, Claude Code should swap to /work, /writing, /now etc.
  const items = [
    { group: 'Navigate', label: '→ Home',            href: 'Homepage Preview.html',     hint: 'G H' },
    { group: 'Navigate', label: '→ Work / Case studies', href: 'Work Index Preview.html', hint: 'G W' },
    { group: 'Navigate', label: '→ Writing',         href: 'Writing Preview.html',      hint: 'G B' },
    { group: 'Navigate', label: '→ Now',             href: 'Now Preview.html',          hint: 'G N' },
    { group: 'Navigate', label: '→ About',           href: 'About Preview.html',        hint: 'G A' },
    { group: 'Actions',  label: '⌘ Ask Jason',        action: 'ask-jason',               hint: 'A' },
    { group: 'Actions',  label: '↓ Download resume',  href: '/resume.pdf',               hint: 'R' },
    { group: 'Actions',  label: '📅 Schedule a call', href: 'https://app.cal.com/jason-vermaelen', hint: 'S' },
    { group: 'Actions',  label: '✉ Email Jason',     href: 'mailto:jason.vermaelen@gmail.com',  hint: 'E' },
    { group: 'Actions',  label: '☼ Toggle theme',     action: 'theme',                   hint: 'T' },
  ];

  const backdrop = document.createElement('div');
  backdrop.className = 'palette-backdrop';
  backdrop.id = 'palette';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-label', 'Command palette');

  let listHTML = '';
  let lastGroup = '';
  items.forEach((it, i) => {
    if (it.group !== lastGroup) {
      listHTML += `<div class="palette-group">${it.group}</div>`;
      lastGroup = it.group;
    }
    const attrs = it.action ? `data-action="${it.action}"` : `href="${it.href}"`;
    listHTML += `<a class="palette-item${i === 0 ? ' active' : ''}" ${attrs}>${it.label}<span class="hint">${it.hint}</span></a>`;
  });

  backdrop.innerHTML = `
    <div class="palette">
      <input class="palette-input" placeholder="Type a command or search…" id="palette-input" autocomplete="off" />
      <div class="palette-list" id="palette-list">${listHTML}</div>
    </div>
  `;

  // ============ INIT ============
  function init() {
    if (document.getElementById('palette')) return;
    document.body.appendChild(backdrop);

    // Inject the kbd trigger into .nav-tools on this page.
    const navTools = document.querySelector('.nav-tools');
    if (navTools && !navTools.querySelector('.kbd')) {
      const btn = document.createElement('button');
      btn.className = 'kbd';
      btn.id = 'open-palette';
      btn.setAttribute('aria-label', 'Open command palette');
      btn.innerHTML = '⌘ K';
      navTools.insertBefore(btn, navTools.firstChild);
      btn.addEventListener('click', openPalette);
    }

    const input = document.getElementById('palette-input');

    function openPalette() {
      backdrop.classList.add('open');
      setTimeout(() => input.focus(), 50);
    }
    function closePalette() {
      backdrop.classList.remove('open');
      input.value = '';
      filterList('');
    }
    function filterList(q) {
      q = q.toLowerCase();
      const items = backdrop.querySelectorAll('.palette-item');
      let shown = 0;
      items.forEach(el => {
        const match = el.textContent.toLowerCase().includes(q);
        el.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      // Hide group headers whose items are all hidden
      backdrop.querySelectorAll('.palette-group').forEach(g => {
        let next = g.nextElementSibling;
        let anyVisible = false;
        while (next && next.classList.contains('palette-item')) {
          if (next.style.display !== 'none') anyVisible = true;
          next = next.nextElementSibling;
        }
        g.style.display = anyVisible ? '' : 'none';
      });
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePalette();
    });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        backdrop.classList.contains('open') ? closePalette() : openPalette();
      }
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closePalette();
    });
    input.addEventListener('input', () => filterList(input.value));

    // Action handlers
    backdrop.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const action = el.dataset.action;
        closePalette();
        if (action === 'theme') {
          // Defer to the per-page toggle button so its SVG/icon stays in sync.
          const toggle = document.getElementById('theme-toggle');
          if (toggle) toggle.click();
        } else {
          window.dispatchEvent(new CustomEvent('command-palette-action', { detail: { action } }));
        }
      });
    });

    // Expose for other scripts
    window.openCommandPalette = openPalette;
    window.closeCommandPalette = closePalette;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
