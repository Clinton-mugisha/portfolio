(function () {
    'use strict';

    const motionPreference = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    );
    const portrait = document.querySelector('.portrait-card');
    let portraitVisible = true;
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    // The orbits stop off screen, in inactive tabs, or when reduced motion is requested.
    function syncOrbits() {
        portrait?.classList.toggle(
            'orbit-paused',
            !portraitVisible || document.hidden || motionPreference.matches,
        );
    }
    if (portrait && 'IntersectionObserver' in window) {
        new IntersectionObserver(
            ([entry]) => {
                portraitVisible = entry.isIntersecting;
                syncOrbits();
            },
            { threshold: 0.01 },
        ).observe(portrait);
    }
    document.addEventListener('visibilitychange', syncOrbits);
    motionPreference.addEventListener('change', syncOrbits);
    syncOrbits();

    // Keep content visible by default, including if the animation CDN is unavailable.
    if (!window.gsap) return;
    const { gsap } = window;
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.title-line > span', {
            yPercent: 105,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
            clearProps: 'transform',
        });
        gsap.from('.portrait-card', {
            scale: 0.94,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
        });
        // Observe before starting each reveal so deep links and no-JS loads stay usable.
        if (!('IntersectionObserver' in window)) return;
        const tweens = [];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    tweens.push(
                        gsap.from(entry.target, {
                            y: 35,
                            duration: 0.9,
                            ease: 'power3.out',
                            clearProps: 'transform',
                        }),
                    );
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.06 },
        );
        document
            .querySelectorAll('[data-reveal]')
            .forEach((element) => observer.observe(element));
        return () => {
            observer.disconnect();
            tweens.forEach((tween) => tween.revert());
        };
    });
})();
