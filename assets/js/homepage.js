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

      const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      populateAttractions();
      populateArticles();
      populatePartners();

      nav.querySelectorAll('.hp-nav__has-mega').forEach(item => {
        const btn = item.querySelector('button');
        let closeTimer;
        const open  = () => { clearTimeout(closeTimer); item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
        const close = () => { closeTimer = setTimeout(() => { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 120); };
        item.addEventListener('mouseenter', open);
        item.addEventListener('mouseleave', close);
        btn.addEventListener('focus', open);
        btn.addEventListener('click', e => { e.preventDefault(); item.classList.toggle('is-open'); btn.setAttribute('aria-expanded', item.classList.contains('is-open')); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
      });
      document.addEventListener('click', e => {
        if (!e.target.closest('.hp-nav__has-mega')) {
          nav.querySelectorAll('.hp-nav__has-mega.is-open').forEach(i => {
            i.classList.remove('is-open');
            i.querySelector('button')?.setAttribute('aria-expanded', 'false');
          });
        }
      });

      const hamburger = nav.querySelector('[data-hamburger]');
      const overlay   = document.querySelector('[data-mobile-nav]');
      const backdrop  = document.querySelector('[data-mobile-backdrop]');
      const closeBtn  = document.querySelector('[data-mobile-close]');
      const list      = document.querySelector('[data-mobile-list]');
      buildMobileList(list);

      const openMobile = () => { nav.classList.add('is-open'); overlay.classList.add('is-open'); backdrop.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); hamburger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
      const closeMobile = () => { nav.classList.remove('is-open'); overlay.classList.remove('is-open'); backdrop.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); hamburger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
      hamburger.addEventListener('click', () => nav.classList.contains('is-open') ? closeMobile() : openMobile());
      closeBtn.addEventListener('click', closeMobile);
      backdrop.addEventListener('click', closeMobile);
    })();
  });
})();
