/**
 * homepage.js — motion + behavior for the 2026-04-21 redesigned homepage
 * Depends on: motion-core.js (loaded first), gsap, ScrollTrigger, Lenis, SplitType
 */
(function () {
  'use strict';
  if (!window.MPT) { console.error('homepage.js: MPT missing'); return; }

  MPT.initSmoothScroll({ duration: 1.2 });

  document.addEventListener('DOMContentLoaded', () => {
    // Section modules register here as tasks progress
  });
})();
