'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/constants';

/**
 * Cmd+K palette — ported from design-reference/command-palette.js.
 *
 * Item actions:
 *  - Routes: pushed via Next router (client-side nav)
 *  - "Ask Jason": dispatches `command-palette-action` custom event with
 *    detail.action = 'ask-jason'. The AskJason component (future, Day 4 / Week 4)
 *    listens for this. Decoupled so AskJason can be added without touching this
 *    file.
 *  - "Toggle theme": calls window.__toggleTheme exposed by <ThemeToggle/> so the
 *    icon + state stay in sync.
 *  - External links / mailto: window.open
 *  - Resume: direct download via window.location.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // ⌘K / Ctrl+K toggle, ESC close (cmdk handles ESC inside the dialog, but
  // the toggle binding is ours).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((current) => !current);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function openExternal(href: string) {
    setOpen(false);
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  function openMailto(email: string) {
    setOpen(false);
    window.location.href = `mailto:${email}`;
  }

  function askJason() {
    setOpen(false);
    window.dispatchEvent(
      new CustomEvent('command-palette-action', { detail: { action: 'ask-jason' } }),
    );
  }

  function downloadResume() {
    setOpen(false);
    window.location.href = SITE.resumePath;
  }

  function flipTheme() {
    setOpen(false);
    const fn = (window as unknown as { __toggleTheme?: () => void }).__toggleTheme;
    fn?.();
  }

  return (
    <>
      <button
        type="button"
        className="kbd"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        ⌘ K
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        className="palette-dialog"
      >
        <Dialog.Title className="sr-only">Command palette</Dialog.Title>
        <Command.Input placeholder="Type a command or search…" />
        <Command.List>
          <Command.Empty>No matches.</Command.Empty>

          <Command.Group heading="Navigate">
            <Command.Item onSelect={() => go('/')}>
              <span>→ Home</span>
              <span className="hint">G H</span>
            </Command.Item>
            <Command.Item onSelect={() => go('/work')}>
              <span>→ Work / Case studies</span>
              <span className="hint">G W</span>
            </Command.Item>
            <Command.Item onSelect={() => go('/writing')}>
              <span>→ Writing</span>
              <span className="hint">G B</span>
            </Command.Item>
            <Command.Item onSelect={() => go('/now')}>
              <span>→ Now</span>
              <span className="hint">G N</span>
            </Command.Item>
            <Command.Item onSelect={() => go('/about')}>
              <span>→ About</span>
              <span className="hint">G A</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item onSelect={askJason}>
              <span>⌘ Ask Jason</span>
              <span className="hint">A</span>
            </Command.Item>
            <Command.Item onSelect={downloadResume}>
              <span>↓ Download resume</span>
              <span className="hint">R</span>
            </Command.Item>
            <Command.Item onSelect={() => openExternal(SITE.cal)}>
              <span>📅 Schedule a call</span>
              <span className="hint">S</span>
            </Command.Item>
            <Command.Item onSelect={() => openMailto(SITE.email)}>
              <span>✉ Email Jason</span>
              <span className="hint">E</span>
            </Command.Item>
            <Command.Item onSelect={flipTheme}>
              <span>☼ Toggle theme</span>
              <span className="hint">T</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
