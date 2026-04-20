/**
 * concept-c.js — Cinematic Immersive motion choreography
 */
(function () {
  MPT.initSmoothScroll({ duration: 1.4 });

  // Nav scroll-aware
  const nav = document.querySelector('[data-cc-nav]');
  if (nav) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 60,
      end: 99999,
      onEnter: () => nav.classList.add('is-stuck'),
      onLeaveBack: () => nav.classList.remove('is-stuck'),
    });
  }

  // Headline line-by-line mask + blur
  document.querySelectorAll('[data-split-lines]').forEach((el) => {
    MPT.splitAndAnimate(el, {
      split: 'lines',
      from: { y: 40, blur: 10 },
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      start: 'top 90%',
    });
  });

  // Cities + marquee
  (async function () {
    const track = document.querySelector('[data-cities-grid]');
    if (!track) return;
    const res = await fetch('assets/data/cities.json');
    const cities = await res.json();

    cities.forEach((city, i) => {
      const article = document.createElement('article');
      article.className = 'cc-city';
      const chapter = String(i + 1).padStart(2, '0');
      article.innerHTML = `
        <img src="${city.image}" alt="${city.name}, ${city.country}" loading="lazy" />
        <div class="cc-city__meta">
          <div class="cc-city__chapter">Chapter ${chapter}</div>
          <div class="cc-city__name">${city.name}</div>
          <div class="cc-city__info"><span>${city.tourCount} tours</span><span>${city.countryCode}</span></div>
        </div>
      `;
      track.appendChild(article);
    });

    document.querySelectorAll('[data-scroll-cities]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = parseInt(btn.dataset.scrollCities, 10);
        track.scrollBy({ left: dir * 340, behavior: 'smooth' });
      });
    });

    const marquee = document.querySelector('[data-marquee]');
    if (marquee) {
      const piece = cities.map((c) => c.name).join(' <em>✦</em> ');
      marquee.innerHTML = `<span>${piece} <em>✦</em> </span><span aria-hidden="true">${piece} <em>✦</em> </span>`;

      if (!MPT.isReducedMotion()) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }
    }
  })();

  // Why filmstrip
  (function () {
    if (MPT.isReducedMotion()) return;
    const steps = 4;
    ScrollTrigger.create({
      trigger: '.cc-why',
      start: 'top top',
      end: () => `+=${steps * window.innerHeight}`,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
        document.querySelectorAll('[data-why-title] .cc-why__slide').forEach((el) => {
          el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
        });
        document.querySelectorAll('[data-why-body] .cc-why__copy').forEach((el) => {
          el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
        });
        document.querySelectorAll('[data-why-images] img').forEach((el) => {
          el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
        });
        document.querySelectorAll('.cc-why__progress span').forEach((el) => {
          el.classList.toggle('is-active', parseInt(el.dataset.dot, 10) === idx);
        });
      },
    });
  })();

  // Tours dark grid
  (async function () {
    const grid = document.querySelector('[data-tours-grid]');
    if (!grid) return;
    const res = await fetch('assets/data/tours.json');
    const tours = await res.json();
    tours.slice(0, 6).forEach((t) => {
      const a = document.createElement('a');
      a.className = 'cc-tour';
      a.href = `#${t.id}`;
      a.innerHTML = `
        <img src="${t.image}" alt="${t.name}" loading="lazy" />
        <div class="cc-tour__body">
          <div class="cc-tour__name">${t.name}</div>
          <div class="cc-tour__meta">
            <span>${t.city} · ${t.duration}</span>
            <span class="price">From <em>€${t.priceFrom}</em></span>
          </div>
        </div>
      `;
      grid.appendChild(a);
    });
  })();

  // Testimonials fullscreen quotes
  (async function () {
    const stage = document.querySelector('[data-testimonials]');
    if (!stage) return;
    const res = await fetch('assets/data/testimonials.json');
    const reviews = await res.json();
    const citiesRes = await fetch('assets/data/cities.json');
    const cities = await citiesRes.json();

    reviews.forEach((r) => {
      const section = document.createElement('div');
      section.className = 'cc-test-quote';
      const cityData = cities.find((c) => c.name === r.city);
      const bgImage = cityData ? cityData.image : '';
      section.innerHTML = `
        <img src="${bgImage}" alt="" />
        <div class="cc-test-quote__inner">
          <blockquote>"${r.quote}"</blockquote>
          <div class="who">${r.name} · ${r.city}</div>
        </div>
      `;
      stage.appendChild(section);
    });
  })();

  // Trust counters
  document.querySelectorAll('[data-count]').forEach((el) => {
    MPT.animateCounter(el, parseInt(el.dataset.count, 10), 1.6);
  });

  // Blog populate
  (async function () {
    const grid = document.querySelector('[data-blog-grid]');
    if (!grid) return;
    const res = await fetch('assets/data/blog-posts.json');
    const posts = await res.json();
    posts.forEach((p) => {
      const a = document.createElement('a');
      a.className = 'cc-post';
      a.href = `#${p.slug}`;
      a.innerHTML = `
        <div class="cc-post__img"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
        <span class="cc-post__tag">${p.tag} · ${p.city}</span>
        <h3 class="cc-post__title">${p.title}</h3>
        <div class="cc-post__meta"><span>${p.readTime}</span><span>${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
      `;
      grid.appendChild(a);
    });
  })();
})();
