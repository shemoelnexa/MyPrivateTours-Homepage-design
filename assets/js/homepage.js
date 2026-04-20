/**
 * homepage.js — motion + behavior for the 2026-04-21 redesigned homepage
 * Depends on: motion-core.js (loaded first), gsap, ScrollTrigger, Lenis, SplitType
 */
(function () {
  'use strict';
  if (!window.MPT) { console.error('homepage.js: MPT missing'); return; }

  // Force animations on regardless of OS prefers-reduced-motion — this is a
  // demo build. Restore MPT.isReducedMotion to its original definition during
  // the WordPress port if accessibility handling needs to be re-enabled.
  MPT.isReducedMotion = function () { return false; };

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

  // Resilient runner: each init block runs in isolation; one failure doesn't
  // cascade and kill the rest.
  function run(name, fn) {
    try { fn(); } catch (err) { console.error('[' + name + '] failed:', err); }
  }

  // Animation orchestration: defer reveals/GSAP setups until the preloader
  // begins fading. Without this, they fire behind the splash and the user
  // sees only the final static state.
  let animationsReady = false;
  const animQueue = [];
  function afterAnimations(fn) {
    if (animationsReady) { try { fn(); } catch (e) { console.error(e); } }
    else animQueue.push(fn);
  }
  function startAnimations() {
    if (animationsReady) return;
    animationsReady = true;
    document.body.classList.add('js-ready');
    animQueue.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
    animQueue.length = 0;
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }

  // Preloader: hide once page ready. Animations fire as preloader starts
  // fading so the user actually sees them.
  const preloaderStart = performance.now();
  const PRELOAD_MIN = 700;
  const PRELOAD_MAX = 2800;
  function hidePreloader() {
    if (!document.body || !document.body.classList.contains('is-loading')) return;
    document.body.classList.remove('is-loading');
    // Trigger animations one frame later so the preloader fade-out can begin
    // and content isn't occluded when the first reveals run.
    requestAnimationFrame(() => setTimeout(startAnimations, 80));
  }
  function hidePreloaderRespectingMin() {
    const elapsed = performance.now() - preloaderStart;
    const wait = Math.max(0, PRELOAD_MIN - elapsed);
    setTimeout(hidePreloader, wait);
  }
  window.addEventListener('load', hidePreloaderRespectingMin);
  setTimeout(hidePreloader, PRELOAD_MAX);

  function boot() {
    // js-ready is deferred to startAnimations() so the reveal styles don't
    // collapse content before the preloader fades.

    // Universal scroll-reveal: deferred until preloader fades so blocks in
    // the initial viewport reveal visibly instead of loading already-revealed.
    run('initReveal', function initReveal() {
      afterAnimations(() => {
        if (!('IntersectionObserver' in window)) {
          document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach(el => el.classList.add('is-in-view'));
          return;
        }
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in-view');
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach(el => io.observe(el));

        // Safety net: force-show anything still hidden after 3s.
        setTimeout(() => {
          document.querySelectorAll('[data-reveal]:not(.is-in-view),[data-reveal-stagger]:not(.is-in-view)').forEach(el => el.classList.add('is-in-view'));
        }, 3000);

        // Inspire curtain
        const inspire = document.querySelector('.hp-inspire');
        if (inspire) {
          const io2 = new IntersectionObserver((entries) => {
            entries.forEach(e => {
              if (e.isIntersecting) { e.target.classList.add('is-in-view'); io2.unobserve(e.target); }
            });
          }, { threshold: 0.25 });
          io2.observe(inspire);
        }
      });
    });

    // Headline line-reveals: deferred until preloader fades.
    run('initHeadlineReveals', function initHeadlineReveals() {
      if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;

      const headlines = document.querySelectorAll(
        '.hp-cities__h2, .hp-why__h2, .hp-tours__h2, .hp-testimonials__title, .hp-inspire__h2, .hp-journal__h2'
      );

      // Pre-split markup immediately so content is ready; defer the tween.
      headlines.forEach(h2 => {
        try {
          const split = new SplitType(h2, { types: 'lines' });
          if (!split.lines || split.lines.length === 0) return;

          split.lines.forEach(line => {
            line.classList.add('line');
            const inner = document.createElement('span');
            inner.className = 'line-inner';
            while (line.firstChild) inner.appendChild(line.firstChild);
            line.appendChild(inner);
          });

          const inners = h2.querySelectorAll('.line-inner');
          gsap.set(inners, { yPercent: 100, opacity: 0 });

          afterAnimations(() => {
            gsap.to(inners, {
              yPercent: 0,
              opacity: 1,
              duration: .9,
              stagger: .12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: h2,
                start: 'top 82%',
                once: true,
              }
            });
          });
        } catch (err) {
          console.warn('initHeadlineReveals: skip', h2, err);
        }
      });
    });

    // Parallax: hero content drifts as hero exits; orbital image zooms subtly.
    run('initParallax', function initParallax() {
      if (typeof gsap === 'undefined') return;
      afterAnimations(() => {

      const heroContent = document.querySelector('.hp-hero__content');
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -30,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hp-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      const orbitalImg = document.querySelector('.hp-orbital__visual img');
      if (orbitalImg) {
        gsap.fromTo(orbitalImg,
          { scale: 1.04 },
          {
            scale: 1.14,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hp-orbital',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Section backgrounds drift slightly as user scrolls — subtle depth cue
      document.querySelectorAll('.hp-testimonials, .hp-why, .hp-trust').forEach(sec => {
        gsap.fromTo(sec,
          { backgroundPositionY: '0%' },
          {
            backgroundPositionY: '-30%',
            ease: 'none',
            scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });

      }); // end afterAnimations
    });

    // Nav: sticky shadow, mega menus, mobile overlay
    run('initNav', function initNav() {
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
    });

    // ── Hero: full-bleed image slider with Ken Burns + auto-advance ──
    run('initHero', async function initHero() {
      const slidesEl = document.querySelector('[data-hero-slides]');
      const indicatorsEl = document.querySelector('[data-hero-indicators]');
      const caption = document.querySelector('[data-hero-caption]');
      if (!slidesEl) return;

      let cities = [];
      try {
        const res = await fetch('assets/data/cities.json');
        cities = await res.json();
      } catch (err) {
        console.warn('initHero: cities.json failed, using fallback', err);
        cities = [
          { name: 'Paris',     country: 'France',         tagline: 'Light, art, and slow afternoons.', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1920&fm=webp&q=85' },
          { name: 'Rome',      country: 'Italy',          tagline: 'Three millennia, one walk.',       image: 'https://images.unsplash.com/photo-1515542483964-5e8c63d7d89b?w=1920&fm=webp&q=85' },
          { name: 'Barcelona', country: 'Spain',          tagline: 'Gaudí mornings, tapas nights.',    image: 'https://images.unsplash.com/photo-1578095172812-dcc191c5aed8?w=1920&fm=webp&q=85' },
        ];
      }

      slidesEl.innerHTML = cities.map((c, i) =>
        `<div class="hp-hero__slide ${i === 0 ? 'is-active' : ''}" data-hero-slide="${i}" style="background-image: url('${c.image}')"></div>`
      ).join('');

      if (indicatorsEl) {
        indicatorsEl.innerHTML = cities.map((_, i) =>
          `<button type="button" data-hero-to="${i}" class="${i === 0 ? 'is-active' : ''}" aria-label="Slide ${i + 1} of ${cities.length}"></button>`
        ).join('');
      }

      const chapterEl = caption?.querySelector('[data-hero-chapter]');
      const nameEl    = caption?.querySelector('[data-hero-name]');
      const taglineEl = caption?.querySelector('[data-hero-tagline]');

      let active = 0;
      function setActive(i) {
        active = (i + cities.length) % cities.length;
        slidesEl.querySelectorAll('.hp-hero__slide').forEach((s, idx) => s.classList.toggle('is-active', idx === active));
        indicatorsEl?.querySelectorAll('button').forEach((b, idx) => b.classList.toggle('is-active', idx === active));
        const c = cities[active];
        if (chapterEl) chapterEl.textContent = 'No. ' + String(active + 1).padStart(2, '0');
        if (nameEl)    nameEl.textContent = (c.name + ' — ' + c.country).toUpperCase();
        if (taglineEl) taglineEl.textContent = c.tagline;
      }
      setActive(0);

      let auto;
      function startAuto() { stopAuto(); auto = setInterval(() => setActive(active + 1), 6000); }
      function stopAuto()  { if (auto) { clearInterval(auto); auto = null; } }

      indicatorsEl?.addEventListener('click', e => {
        const b = e.target.closest('[data-hero-to]');
        if (b) { setActive(parseInt(b.dataset.heroTo, 10)); stopAuto(); startAuto(); }
      });
      document.querySelectorAll('[data-hero-nav]').forEach(btn => {
        btn.addEventListener('click', () => { setActive(active + parseInt(btn.dataset.heroNav, 10)); stopAuto(); startAuto(); });
      });

      // Pause auto-advance when user hovers the arrows or indicators
      document.querySelectorAll('[data-hero-nav],[data-hero-indicators]').forEach(el => {
        el.addEventListener('mouseenter', stopAuto);
        el.addEventListener('mouseleave', startAuto);
      });

      startAuto();

      // Hero entry: stagger the whole content column in after preloader fades.
      // Pre-hide everything via GSAP so it can't flash.
      const heroEyebrow = document.querySelector('.hp-hero__eyebrow');
      const line1 = document.querySelector('[data-hero-split]');
      const line2 = document.querySelector('[data-hero-em]');
      const heroSub = document.querySelector('.hp-hero__sub');
      const heroCta = document.querySelector('.hp-hero__content .hp-btn--primary');
      const heroSearch = document.querySelector('.hp-hero__search');

      if (typeof gsap !== 'undefined') {
        gsap.set([heroEyebrow, line1, line2, heroSub, heroCta, heroSearch].filter(Boolean), { opacity: 0, y: 30 });
      }

      afterAnimations(() => {
        if (typeof gsap === 'undefined') return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: .9 } });
        if (heroEyebrow) tl.to(heroEyebrow, { opacity: 1, y: 0, duration: .6 });
        if (line1 && MPT?.splitAndAnimate) {
          tl.add(() => MPT.splitAndAnimate(line1, {
            split: 'words', stagger: .08, duration: .7, ease: 'power3.out', from: { y: 40 }, start: 'top 100%'
          }), '-=0.2');
          tl.to(line1, { opacity: 1, y: 0, duration: .7 }, '<');
        } else if (line1) {
          tl.to(line1, { opacity: 1, y: 0 }, '-=0.3');
        }
        if (line2) tl.to(line2, { opacity: 1, y: 0, duration: .9 }, '-=0.4');
        if (heroSub) tl.to(heroSub, { opacity: 1, y: 0, duration: .7 }, '-=0.5');
        if (heroCta) tl.to(heroCta, { opacity: 1, y: 0, duration: .6 }, '-=0.4');
        if (heroSearch) tl.to(heroSearch, { opacity: 1, y: 0, duration: .6 }, '-=0.4');
      });
    });

    // ── Orbital: ring stroke-draws, labels fade in around circle ──
    run('initOrbital', function initOrbital() {
      const section = document.querySelector('.hp-orbital');
      if (!section) return;

      const ring   = section.querySelector('[data-orbital-ring]');
      const labels = section.querySelectorAll('.hp-orbital__label');
      const h2Pre  = section.querySelector('[data-orbital-h2-prefix]');
      const h2Em   = section.querySelector('[data-orbital-h2-em]');

      afterAnimations(() => {
        if (h2Pre) {
          MPT.splitAndAnimate(h2Pre, { split: 'words', stagger: .05, duration: .5, from: { y: 16 }, start: 'top 85%' });
        }
        if (h2Em) {
          gsap.from(h2Em, {
            y: 16, opacity: 0, duration: .5, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            delay: .35,
          });
        }

        const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
        if (ring) tl.to(ring, { strokeDashoffset: 0, duration: .9, ease: 'power2.out' });
        labels.forEach((l, i) => {
          tl.to(l, { opacity: 1, x: 0, y: 0, duration: .4, ease: 'power2.out' }, `>${i === 0 ? '-0.5' : '-0.25'}`);
        });
      });
    });

    // ── Cities: tabs + peek carousel, auto-advance, arrows, sync ──
    run('initCities', async function initCities() {
      const track   = document.querySelector('[data-city-track]');
      const tabsEl  = document.querySelector('[data-city-tabs]');
      if (!track || !tabsEl) return;

      const res = await fetch('assets/data/cities.json');
      const cities = await res.json();

      tabsEl.innerHTML = cities.map((c, i) =>
        `<button type="button" class="hp-cities__tab ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="hp-city-panel-${i}" data-city-tab="${i}">${c.name} <span class="count">(${c.tourCount})</span></button>`
      ).join('');

      track.innerHTML = cities.map((c, i) => {
        const chapter = String(i + 1).padStart(2, '0');
        return `
          <article class="hp-city-card ${i === 0 ? 'is-active' : ''}" id="hp-city-panel-${i}" role="tabpanel" aria-hidden="${i === 0 ? 'false' : 'true'}" data-city-card="${i}" style="background-image:url('${c.image}')">
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
        track.querySelectorAll('.hp-city-card').forEach((c, idx) => {
          c.classList.toggle('is-active', idx === active);
          c.setAttribute('aria-hidden', idx === active ? 'false' : 'true');
        });
        tabsEl.querySelectorAll('.hp-cities__tab').forEach((t, idx) => {
          t.classList.toggle('is-active', idx === active);
          t.setAttribute('aria-selected', idx === active ? 'true' : 'false');
        });
        const card = track.querySelector(`[data-city-card="${active}"]`);
        if (card) {
          const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
          track.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
        }
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

      const carousel = document.querySelector('[data-city-carousel]');
      if (carousel) {
        carousel.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); setActive(active + 1); stopAuto(); startAuto(); }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); setActive(active - 1); stopAuto(); startAuto(); }
        });
      }

      track.addEventListener('mouseenter', stopAuto);
      track.addEventListener('mouseleave', startAuto);

      startAuto();
    });

    // ── Tours: render from tours.json (first 6) ──
    run('initTours', async function initTours() {
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
    });

    // ── Testimonials: render from testimonials.json, auto-advance 8s ──
    run('initTestimonials', async function initTestimonials() {
      const track = document.querySelector('[data-reviews-track]');
      const dotsEl = document.querySelector('[data-reviews-dots]');
      if (!track) return;

      const res = await fetch('assets/data/testimonials.json');
      const reviews = await res.json();

      const monthYear = 'April 2026';

      track.innerHTML = reviews.map(r => `
        <article class="hp-review">
          <div class="hp-review__stars">${'★'.repeat(r.rating)}</div>
          <p class="hp-review__quote">"${r.quote}"</p>
          <div class="hp-review__rule"></div>
          <div class="hp-review__meta">${r.name} · ${r.city} · ${monthYear}</div>
        </article>
      `).join('');

      if (dotsEl) {
        dotsEl.innerHTML = reviews.map((_, i) => `<button type="button" data-dot="${i}" class="${i === 0 ? 'is-active' : ''}" aria-label="Review ${i + 1}"></button>`).join('');
      }

      let idx = 0;
      function scrollToIdx(i) {
        idx = (i + reviews.length) % reviews.length;
        const card = track.children[idx];
        if (card) {
          const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
          track.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
        }
        dotsEl?.querySelectorAll('button').forEach((b, j) => b.classList.toggle('is-active', j === idx));
      }

      dotsEl?.addEventListener('click', e => {
        const b = e.target.closest('[data-dot]');
        if (b) { scrollToIdx(parseInt(b.dataset.dot, 10)); stopAuto(); startAuto(); }
      });

      let auto;
      function startAuto() { stopAuto(); auto = setInterval(() => scrollToIdx(idx + 1), 8000); }
      function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
      track.addEventListener('mouseenter', stopAuto);
      track.addEventListener('mouseleave', startAuto);
      startAuto();
    });

    // ── Trust: animate counters on scroll-in ──
    run('initTrust', function initTrust() {
      afterAnimations(() => {
        document.querySelectorAll('[data-counter]').forEach(el => {
          const target = parseInt(el.dataset.counter, 10);
          const suffix = target === 500000 ? '+' : '';
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString() + suffix; },
          });
        });
      });
    });

    // ── Journal: render from blog-posts.json ──
    run('initJournal', async function initJournal() {
      const grid = document.querySelector('[data-journal-grid]');
      if (!grid) return;

      const res = await fetch('assets/data/blog-posts.json');
      const posts = await res.json();

      const fmt = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      };

      grid.innerHTML = posts.map(p => `
        <a href="../my private tours/blog-article.html" class="hp-journal-card">
          <div class="hp-journal-card__img">
            <img src="${p.image}" alt="${p.title}" loading="lazy" />
          </div>
          <span class="hp-journal-card__tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <div class="hp-journal-card__meta">${p.readTime} read · ${fmt(p.date)}</div>
        </a>
      `).join('');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
