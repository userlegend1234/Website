(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Intro: Strichzeichnung vorbereiten, dann starten ---------- */
  document.querySelectorAll('.house-art .draw').forEach((el) => {
    const len = Math.ceil(el.getTotalLength ? el.getTotalLength() : 1000);
    el.style.setProperty('--len', len);
  });
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));

  /* ---------- Header ---------- */
  const header = document.querySelector('.site-header');
  const mobileCta = document.querySelector('.mobile-cta');
  const contact = document.getElementById('kontakt');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    const contactTop = contact.getBoundingClientRect().top;
    mobileCta.classList.toggle('show', y > window.innerHeight * 0.8 && contactTop > window.innerHeight);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobiles Menü ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const setNav = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  };
  toggle.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  document.querySelectorAll('.site-nav a').forEach((a) => a.addEventListener('click', () => setNav(false)));

  /* ---------- Reveal beim Scrollen ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- Hero: Lichtschein folgt der Maus ---------- */
  const hero = document.querySelector('.hero');
  if (finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- 3D-Neigung & Lichtpunkt auf Karten ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach((el) => {
      const max = el.classList.contains('visual-frame') ? 6 : 5;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
        el.style.setProperty('--cx', `${px * 100}%`);
        el.style.setProperty('--cy', `${py * 100}%`);
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    /* Magnetische Buttons */
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Versprechen: Wörter leuchten beim Scrollen auf ---------- */
  const statement = document.querySelector('[data-words]');
  const highlight = ['Menschen', 'Zeit,', 'Ehrlichkeit', 'aufgehoben'];
  const words = statement.textContent.trim().split(/\s+/);
  statement.innerHTML = words
    .map((w) => `<span class="w${highlight.includes(w) ? ' hl' : ''}">${w}</span>`)
    .join(' ');
  const wordEls = [...statement.querySelectorAll('.w')];

  /* ---------- Ablauf: Linie füllt sich, Schritte werden aktiv ---------- */
  const steps = document.querySelector('.steps');
  const stepEls = [...steps.querySelectorAll('.step')];

  const onScrollFx = () => {
    const vh = window.innerHeight;

    const sr = statement.getBoundingClientRect();
    const sp = Math.min(1, Math.max(0, (vh * 0.85 - sr.top) / (sr.height + vh * 0.35)));
    const lit = Math.round(sp * wordEls.length);
    wordEls.forEach((w, i) => w.classList.toggle('on', reduceMotion || i < lit));

    const pr = steps.getBoundingClientRect();
    const pp = Math.min(1, Math.max(0, (vh * 0.6 - pr.top) / pr.height));
    steps.style.setProperty('--progress', pp.toFixed(3));
    stepEls.forEach((s) => {
      s.classList.toggle('active', s.getBoundingClientRect().top < vh * 0.62);
    });
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScrollFx(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', onScrollFx);
  onScrollFx();

  /* ---------- FAQ: nur eine Antwort offen ---------- */
  const details = document.querySelectorAll('.accordion details');
  details.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) details.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* ---------- Erstgespräch-Formular in 3 Schritten ---------- */
  const form = document.getElementById('wizard');
  const stepsW = [...form.querySelectorAll('.wstep')];
  const next = form.querySelector('[data-next]');
  const back = form.querySelector('[data-back]');
  const bar = form.querySelector('.wizard-progress span');
  const count = form.querySelector('.wizard-count b');
  const error = form.querySelector('.form-error');
  const field = (n) => form.elements.namedItem(n).value.trim();
  const data = {};
  let current = 1;

  const show = (n) => {
    current = n;
    stepsW.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === n));
    bar.style.width = `${Math.min(n, 3) / 3 * 100}%`;
    count.textContent = Math.min(n, 3);
    back.hidden = n === 1 || n === 4;
    next.textContent = n === 3 ? 'Anfrage senden' : 'Weiter';
    next.disabled = (n === 1 && !data.objekt) || (n === 2 && !data.zeitpunkt);
    error.hidden = true;
    if (n === 4) form.classList.add('finished');
  };

  form.querySelectorAll('.chips').forEach((group) => {
    group.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach((c) => c.classList.toggle('selected', c === chip));
      data[group.dataset.name] = chip.dataset.value;
      next.disabled = false;
      setTimeout(() => { if (current < 3) show(current + 1); }, 350);
    });
  });

  back.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => {
    if (current < 3) { show(current + 1); return; }
    const name = field('name');
    const email = field('email');
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { error.hidden = false; return; }

    // TODO: durch echten Formular-Versand ersetzen (z.B. Formspree, Netlify Forms)
    const body = [
      'Anfrage für ein kostenloses Erstgespräch',
      '',
      `Objekt: ${data.objekt}`,
      `Zeitpunkt: ${data.zeitpunkt}`,
      `Name: ${name}`,
      `Telefon: ${field('telefon') || '-'}`,
      `E-Mail: ${email}`,
      '',
      field('nachricht'),
    ].join('\n');
    window.location.href = `mailto:info@immovana.ch?subject=${encodeURIComponent('Erstgespräch – ' + data.objekt)}&body=${encodeURIComponent(body)}`;
    show(4);
  });

  show(1);

  document.getElementById('year').textContent = new Date().getFullYear();
})();
