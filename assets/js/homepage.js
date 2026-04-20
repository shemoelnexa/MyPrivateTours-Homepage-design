/**
 * homepage.js — motion + behavior for the 2026-04-21 redesigned homepage
 * Depends on: motion-core.js (loaded first), gsap, ScrollTrigger, Lenis, SplitType
 */
(function () {
  'use strict';
  if (!window.MPT) { console.error('homepage.js: MPT missing'); return; }

  MPT.initSmoothScroll({ duration: 1.2 });

  // Mega menu content (attractions, articles, partners)
  const MEGA_ATTRACTIONS = [
    { t:'Eiffel Tower Tours',        s:'Attraction in Paris, France' },
    { t:'Colosseum Tours',           s:'Attraction in Rome, Italy' },
    { t:'Sagrada Família Tours',     s:'Attraction in Barcelona, Spain' },
    { t:'Vatican Museums Tours',     s:'Attraction in Rome, Italy' },
    { t:'Disneyland Paris Tours',    s:'Attraction in Paris, France' },
    { t:'Memorial & Museum Tours',   s:'Attraction in Oświęcim, Poland' },
    { t:'Warner Bros. Studio Tours', s:'Attraction in London, UK' },
    { t:'Seine River Tours',         s:'Attraction in Paris, France' },
    { t:'Van Gogh Museum Tours',     s:'Attraction in Amsterdam, Netherlands' },
    { t:'Louvre Museum Tours',       s:'Attraction in Paris, France' },
    { t:'Anne Frank House Tours',    s:'Attraction in Amsterdam, Netherlands' },
    { t:'Alhambra Tours',            s:'Attraction in Granada, Spain' },
    { t:'Park Güell Tours',          s:'Attraction in Barcelona, Spain' },
    { t:'Keukenhof Tours',           s:'Attraction in Lisse, Netherlands' },
    { t:'Montserrat Monastery Tours',s:'Attraction in Monistrol, Spain' },
    { t:'Last Supper Tours',         s:'Attraction in Milan, Italy' },
    { t:'Moulin Rouge Tours',        s:'Attraction in Paris, France' },
    { t:'Tower of London Tours',     s:'Attraction in London, UK' },
  ];

  const MEGA_ARTICLES = [
    { t:'10 Hidden Gems in Paris Only Locals Know',         s:'Travel Tips · 6 min read' },
    { t:'Ultimate Guide to the Colosseum in 2026',          s:'Destination Guide · 8 min read' },
    { t:'London with Kids: A Family Travel Guide',          s:'Family Travel · 5 min read' },
    { t:'Barcelona Beyond Gaudí: Local Favourites',         s:'Hidden Gems · 7 min read' },
    { t:'Best Food Tours in Europe: A Tasting Guide',       s:'Food & Culture · 6 min read' },
    { t:'Venice Off the Beaten Path',                       s:'Hidden Gems · 5 min read' },
    { t:'Prague in Winter: A Magical Experience',           s:'Destination Guide · 6 min read' },
    { t:'Florence Art & Wine: The Perfect Combo',           s:'Food & Culture · 7 min read' },
    { t:"First-Timer's Guide to New York City",             s:'Travel Tips · 9 min read' },
  ];

  const MEGA_PARTNERS = [
    { t:'White-Label Solutions',   s:'Branded booking for your clients' },
    { t:'API Integration',         s:'Connect your platform to our tours' },
    { t:'Commission Program',      s:'Earn on every referral booking' },
    { t:'Group Bookings',          s:'Custom itineraries for 10+ guests' },
    { t:'Concierge Desk Program',  s:'Exclusive rates for hotel partners' },
    { t:'Corporate Experiences',   s:'Team building & incentive trips' },
    { t:'MICE & Events',           s:'Meetings, incentives & conferences' },
    { t:'DMC Partnerships',        s:'Destination management collaboration' },
    { t:'Affiliate Program',       s:'Earn commissions from your audience' },
  ];

  function megaTileHTML(it) {
    return `<a href="#" class="hp-mega__tile"><div class="hp-mega__tile-img"></div><div class="hp-mega__tile-text"><strong>${it.t}</strong><span>${it.s}</span></div></a>`;
  }
  function populateAttractions() { const c = document.querySelector('[data-mega-attractions]'); if (c) c.innerHTML = MEGA_ATTRACTIONS.map(megaTileHTML).join(''); }
  function populateArticles()    { const c = document.querySelector('[data-mega-articles]');    if (c) c.innerHTML = MEGA_ARTICLES.map(megaTileHTML).join(''); }
  function populatePartners()    { const c = document.querySelector('[data-mega-partners]');    if (c) c.innerHTML = MEGA_PARTNERS.map(megaTileHTML).join(''); }

  function buildMobileList(list) {
    if (!list) return;
    list.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li><button type="button" data-accordion>City Tours<span>▾</span></button>
        <div class="hp-mobile-nav__sub">
          <a href="../my private tours/paris.html">Paris</a>
          <a href="#">Rome</a><a href="#">London</a><a href="#">Barcelona</a>
          <a href="#">Florence</a><a href="#">Prague</a><a href="#">Venice</a><a href="#">New York</a>
        </div></li>
      <li><button type="button" data-accordion>Blog<span>▾</span></button>
        <div class="hp-mobile-nav__sub">
          <a href="../my private tours/blog.html">All Articles</a>
          <a href="#">Travel Tips</a><a href="#">Destination Guides</a>
          <a href="#">Food & Culture</a><a href="#">Family Travel</a><a href="#">Hidden Gems</a>
        </div></li>
      <li><a href="../my private tours/about.html">About</a></li>
      <li><button type="button" data-accordion>B2B<span>▾</span></button>
        <div class="hp-mobile-nav__sub">
          <a href="../my private tours/b2b.html">Overview</a>
          <a href="#">Travel Agencies</a><a href="#">Hotels &amp; Concierge</a>
          <a href="#">Corporate Groups</a><a href="#">DMCs &amp; Operators</a><a href="#">Affiliate Program</a>
        </div></li>
      <li><a href="../my private tours/contact.html">Contact</a></li>
    `;
    list.querySelectorAll('[data-accordion]').forEach(btn => {
      btn.addEventListener('click', () => btn.parentElement.classList.toggle('is-open'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Nav: sticky shadow, mega menus, mobile overlay
    (function initNav() {
      const nav = document.querySelector('[data-nav]');
      if (!nav) return;

      // Sticky shadow
      const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      // Populate mega menu content
      populateAttractions();
      populateArticles();
      populatePartners();

      // Mobile overlay refs (declared early so Escape handler can see closeMobile)
      const hamburger = nav.querySelector('[data-hamburger]');
      const overlay   = document.querySelector('[data-mobile-nav]');
      const backdrop  = document.querySelector('[data-mobile-backdrop]');
      const closeBtn  = document.querySelector('[data-mobile-close]');
      const list      = document.querySelector('[data-mobile-list]');

      if (!hamburger || !overlay || !backdrop || !closeBtn || !list) {
        console.warn('homepage.js: nav elements missing');
        return;
      }

      buildMobileList(list);

      function openMobile() {
        nav.classList.add('is-open');
        overlay.classList.add('is-open');
        backdrop.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        overlay.removeAttribute('inert');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      function closeMobile() {
        nav.classList.remove('is-open');
        overlay.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('inert', '');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      // Mega menu hover + focus + click
      nav.querySelectorAll('.hp-nav__has-mega').forEach(item => {
        const btn = item.querySelector('button');
        let closeTimer;
        const open  = () => { clearTimeout(closeTimer); item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
        const close = () => { closeTimer = setTimeout(() => { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 120); };
        item.addEventListener('mouseenter', open);
        item.addEventListener('mouseleave', close);
        btn.addEventListener('focus', open);
        btn.addEventListener('click', e => {
          e.preventDefault();
          const nowOpen = !item.classList.contains('is-open');
          item.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', String(nowOpen));
        });
      });

      // Click outside closes any open mega
      document.addEventListener('click', e => {
        if (!e.target.closest('.hp-nav__has-mega')) {
          nav.querySelectorAll('.hp-nav__has-mega.is-open').forEach(i => {
            i.classList.remove('is-open');
            i.querySelector('button')?.setAttribute('aria-expanded', 'false');
          });
        }
      });

      // Unified Escape: close mega menus and mobile overlay
      document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        nav.querySelectorAll('.hp-nav__has-mega.is-open').forEach(i => {
          i.classList.remove('is-open');
          i.querySelector('button')?.setAttribute('aria-expanded', 'false');
        });
        if (overlay.classList.contains('is-open')) {
          closeMobile();
          hamburger.focus();
        }
      });

      // Hamburger + overlay wiring
      hamburger.addEventListener('click', () => overlay.classList.contains('is-open') ? closeMobile() : openMobile());
      closeBtn.addEventListener('click', closeMobile);
      backdrop.addEventListener('click', closeMobile);
    })();

    // ── Hero: rings fade, magazines fly in, headline split, parallax ──
    (function initHero() {
      if (MPT.isReducedMotion()) {
        document.querySelectorAll('.hp-hero__ring').forEach(r => r.style.opacity = .12);
        document.querySelectorAll('.hp-hero__mag').forEach(m => m.style.opacity = 1);
        return;
      }

      const rings = document.querySelectorAll('.hp-hero__ring');
      const mags  = document.querySelectorAll('.hp-hero__mag');
      const line1 = document.querySelector('[data-hero-split]');
      const line2 = document.querySelector('[data-hero-em]');

      gsap.set(rings, { scale: .85, opacity: 0 });
      gsap.to(rings, { scale: 1, opacity: .12, duration: .9, ease: 'power3.out', stagger: .12, delay: .1 });

      mags.forEach((m, i) => {
        const initialX = m.classList.contains('hp-hero__mag--1') || m.classList.contains('hp-hero__mag--2') ? -40 : 40;
        const initialY = m.classList.contains('hp-hero__mag--1') || m.classList.contains('hp-hero__mag--3') ? -30 : 30;
        gsap.fromTo(m, { x: initialX, y: initialY, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: .3 + i * .1 });

        gsap.to(m, {
          y: ['-15%','-8%','-20%','-11%'][i] || '-10%',
          ease: 'none',
          scrollTrigger: { trigger: '.hp-hero', start: 'top top', end: 'bottom top', scrub: true }
        });
      });

      if (line1) {
        MPT.splitAndAnimate(line1, { split: 'words', stagger: .08, duration: .5, ease: 'power3.out', from: { y: 20 }, start: 'top 90%' });
      }
      if (line2) {
        gsap.from(line2, { y: 20, opacity: 0, duration: .6, delay: .55, ease: 'power3.out' });
      }
    })();

    // ── Orbital: ring stroke-draws, labels fade in around circle ──
    (function initOrbital() {
      const section = document.querySelector('.hp-orbital');
      if (!section) return;

      const ring   = section.querySelector('[data-orbital-ring]');
      const labels = section.querySelectorAll('.hp-orbital__label');
      const h2Pre  = section.querySelector('[data-orbital-h2-prefix]');
      const h2Em   = section.querySelector('[data-orbital-h2-em]');

      // Split the prefix text only; animate the <em> as a whole so its italic/colour treatment survives.
      if (h2Pre) {
        MPT.splitAndAnimate(h2Pre, { split: 'words', stagger: .05, duration: .5, from: { y: 16 }, start: 'top 85%' });
      }
      if (h2Em) {
        if (MPT.isReducedMotion()) {
          h2Em.style.opacity = 1;
        } else {
          gsap.from(h2Em, {
            y: 16,
            opacity: 0,
            duration: .5,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            delay: .35,
          });
        }
      }

      if (MPT.isReducedMotion()) {
        if (ring) ring.setAttribute('stroke-dashoffset', '0');
        labels.forEach(l => { l.style.opacity = 1; });
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
      if (ring) tl.to(ring, { strokeDashoffset: 0, duration: .9, ease: 'power2.out' });
      labels.forEach((l, i) => {
        tl.to(l, { opacity: 1, x: 0, y: 0, duration: .4, ease: 'power2.out' }, `>${i === 0 ? '-0.5' : '-0.25'}`);
      });
    })();

    // ── Cities: tabs + peek carousel, auto-advance, arrows, sync ──
    (async function initCities() {
      const track   = document.querySelector('[data-city-track]');
      const tabsEl  = document.querySelector('[data-city-tabs]');
      if (!track || !tabsEl) return;

      const res = await fetch('assets/data/cities.json');
      const cities = await res.json();

      tabsEl.innerHTML = cities.map((c, i) =>
        `<button type="button" class="hp-cities__tab ${i === 0 ? 'is-active' : ''}" role="tab" data-city-tab="${i}">${c.name} <span class="count">(${c.tourCount})</span></button>`
      ).join('');

      track.innerHTML = cities.map((c, i) => {
        const chapter = String(i + 1).padStart(2, '0');
        return `
          <article class="hp-city-card ${i === 0 ? 'is-active' : ''}" data-city-card="${i}" style="background-image:url('${c.image}')">
            <span class="hp-city-card__chip">Private tours</span>
            <div class="hp-city-card__caption">
              <div class="hp-city-card__chapter">No. ${chapter}</div>
              <div class="hp-city-card__title">${c.name.toUpperCase()} — ${c.country.toUpperCase()}</div>
              <div class="hp-city-card__tagline">${c.tagline}</div>
            </div>
          </article>`;
      }).join('');

      let active = 0;
      let autoTimer = null;

      function setActive(i) {
        active = (i + cities.length) % cities.length;
        track.querySelectorAll('.hp-city-card').forEach((c, idx) => c.classList.toggle('is-active', idx === active));
        tabsEl.querySelectorAll('.hp-cities__tab').forEach((t, idx) => t.classList.toggle('is-active', idx === active));
        const card = track.querySelector(`[data-city-card="${active}"]`);
        if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => setActive(active + 1), 7000);
      }
      function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

      tabsEl.addEventListener('click', e => {
        const t = e.target.closest('[data-city-tab]');
        if (!t) return;
        setActive(parseInt(t.dataset.cityTab, 10));
        stopAuto(); startAuto();
      });

      document.querySelectorAll('[data-city-nav]').forEach(btn => {
        btn.addEventListener('click', () => {
          setActive(active + parseInt(btn.dataset.cityNav, 10));
          stopAuto(); startAuto();
        });
      });

      track.addEventListener('mouseenter', stopAuto);
      track.addEventListener('mouseleave', startAuto);

      startAuto();
    })();

    // ── Tours: render from tours.json (first 6) ──
    (async function initTours() {
      const grid = document.querySelector('[data-tours-grid]');
      if (!grid) return;

      const res = await fetch('assets/data/tours.json');
      const tours = await res.json();
      const six = tours.slice(0, 6);

      const cur = (code) => ({ EUR: '€', GBP: '£', USD: '$' }[code] ?? code);

      grid.innerHTML = six.map(t => `
        <a href="#" class="hp-tour-card">
          <div class="hp-tour-card__img">
            <span class="hp-tour-card__chip">${t.city}</span>
            <img src="${t.image}" alt="${t.name} — ${t.city}" loading="lazy" />
          </div>
          <div class="hp-tour-card__body">
            <h3>${t.name}</h3>
            <div class="hp-tour-card__meta">
              <span>${t.duration}</span>
              <span><span class="star">★</span> ${t.rating} (${t.reviews})</span>
            </div>
            <div class="hp-tour-card__price">from ${cur(t.currency)}${t.priceFrom}<small>per private group, up to 8</small></div>
            <span class="hp-tour-card__link">View tour →</span>
          </div>
        </a>
      `).join('');
    })();
  });
})();
