/* ==========================================================================
   VITOR BOMFIM CUNHA — TACTICAL PORTFOLIO INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileNav();
  initScrollSpy();
  initMissionTabs();
  initCodecTerminal();
  initCopyEmail();
  initRevealAnimations();
});

/**
 * Top tactical crimson scroll progress bar
 */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/**
 * Responsive mobile navigation drawer
 */
function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('hudNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Highlight active section in HUD nav while scrolling
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.hud-nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Mission Archive Tabs (API 2026.02 / API 2026.01)
 */
function initMissionTabs() {
  const tabs = document.querySelectorAll('.mission-tab');
  const panels = document.querySelectorAll('.dossier-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;

      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach((panel) => {
        const isMatch = panel.id === targetId;
        panel.hidden = !isMatch;
        panel.classList.toggle('active', isMatch);
        if (isMatch) {
          panel.classList.add('is-visible');
        }
      });
    });
  });
}

/**
 * Interactive Metal Gear Codec Frequency Selector
 */
function initCodecTerminal() {
  const cards = document.querySelectorAll('.codec-channel-card');
  const freqEl = document.getElementById('codecFreq');
  const channelEl = document.getElementById('codecChannelName');
  const transcriptEl = document.getElementById('codecTranscript');

  if (!cards.length || !freqEl || !channelEl || !transcriptEl) return;

  const activateCard = (card) => {
    cards.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');

    freqEl.textContent = card.dataset.freq || '140.85';
    channelEl.textContent = card.dataset.channel || 'CODEC CHANNEL';
    transcriptEl.innerHTML = `<p><strong>[VITOR BOMFIM]:</strong> "${card.dataset.msg || ''}"</p>`;
  };

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => activateCard(card));
    card.addEventListener('click', () => activateCard(card));
  });
}

/**
 * One-click copy email button inside Codec terminal
 */
function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', async (event) => {
    event.stopPropagation();
    const email = btn.dataset.email;
    if (!email) return;

    const originalText = btn.textContent;
    try {
      await navigator.clipboard.writeText(email);
      btn.textContent = 'COPIADO ✓';
    } catch {
      btn.textContent = email;
    }

    setTimeout(() => {
      btn.textContent = originalText;
    }, 2200);
  });
}

/**
 * Subtle tactical fade-up reveals on scroll
 */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((el) => observer.observe(el));
}
