/**
 * motion-core.js
 *
 * Initializes Lenis smooth-scroll and GSAP with ScrollTrigger. Exports
 * helpers used across all three concepts:
 *   - initSmoothScroll(options)
 *   - splitAndAnimate(element, options)
 *   - animateCounter(element, target, duration)
 *   - isReducedMotion()
 *
 * Each concept script calls initSmoothScroll() once and then uses
 * the helpers + its own ScrollTrigger choreography.
 */

window.MPT = window.MPT || {};

MPT.isReducedMotion = function () {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

MPT.initSmoothScroll = function (options = {}) {
  if (MPT.isReducedMotion()) return null;
  if (typeof Lenis === 'undefined') {
    console.warn('motion-core: Lenis not loaded; native scrolling');
    return null;
  }

  try {
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }
    if (typeof gsap !== 'undefined' && gsap.ticker) {
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    return lenis;
  } catch (err) {
    console.warn('motion-core: Lenis init failed, falling back to native scroll', err);
    return null;
  }
};

/**
 * Split an element's text via split-type and stagger reveal it.
 * @param {HTMLElement} el
 * @param {object} options { split: 'chars'|'words'|'lines', from: {y,opacity,blur}, stagger, duration, ease }
 */
MPT.splitAndAnimate = function (el, options = {}) {
  if (MPT.isReducedMotion()) {
    gsap.to(el, { opacity: 1, duration: 0.2 });
    return;
  }

  const splitType = options.split ?? 'chars';
  const split = new SplitType(el, { types: splitType });
  const targets = split[splitType] ?? split.chars;

  const from = {
    opacity: 0,
    y: options.from?.y ?? 24,
    filter: options.from?.blur ? `blur(${options.from.blur}px)` : 'blur(0px)',
  };

  gsap.set(targets, from);
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: options.duration ?? 0.6,
    ease: options.ease ?? 'power3.out',
    stagger: options.stagger ?? 0.08,
    scrollTrigger: {
      trigger: el,
      start: options.start ?? 'top 85%',
      once: true,
    },
  });
};

/**
 * Count a number from 0 to target when element enters viewport.
 * @param {HTMLElement} el element whose textContent becomes the number
 * @param {number} target final integer value
 * @param {number} duration seconds (default 1.6)
 */
MPT.animateCounter = function (el, target, duration = 1.6) {
  if (MPT.isReducedMotion()) {
    el.textContent = target.toLocaleString();
    return;
  }

  const obj = { n: 0 };
  gsap.to(obj, {
    n: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString(); },
  });
};

/**
 * Magnetic cursor pull for CTAs (Concept A).
 * Mutates transform; keep elements out of flow-dependent layouts.
 */
MPT.magnetize = function (el, strength = 0.3) {
  if (MPT.isReducedMotion()) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
};

/**
 * Register GSAP plugins when this file loads.
 * Concept scripts assume these are registered.
 */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
