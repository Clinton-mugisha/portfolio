(function () {
    'use strict';

    const motionPreference = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    );
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    const desktop = window.matchMedia('(min-width: 1000px)');
    if (menuButton && menu && typeof menu.showModal === 'function') {
        document.documentElement.classList.add('has-mobile-menu');
        menuButton.hidden = false;
        menuButton.addEventListener('click', () => {
            if (menu.open) return;
            menu.showModal();
            menuButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
        });
        menu.querySelector('.menu-close').addEventListener('click', () =>
            menu.close(),
        );
        menu.addEventListener('close', () => {
            menuButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            window.requestAnimationFrame(() => window.ScrollTrigger?.refresh());
        });
        menu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', () => {
                menu.close();
                const target = document.querySelector(link.hash);
                target?.setAttribute('tabindex', '-1');
                target?.focus({ preventScroll: true });
            });
        });
        desktop.addEventListener('change', ({ matches }) => {
            if (matches && menu.open) {
                menu.close();
                document
                    .querySelector('.site-header .brand')
                    ?.focus({ preventScroll: true });
            }
        });
    }

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
    const animationMedia = gsap.matchMedia();
    animationMedia.add('(prefers-reduced-motion: no-preference)', () => {
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
                    // Mobile project previews have their own scroll-linked movement.
                    if (
                        entry.target.classList.contains('project') &&
                        !desktop.matches &&
                        window.ScrollTrigger
                    ) {
                        observer.unobserve(entry.target);
                        return;
                    }
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
    if (!window.ScrollTrigger) return;
    const { ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    animationMedia.add(
        '(max-width: 999px) and (prefers-reduced-motion: no-preference)',
        () => {
            const grid = document.querySelector('.project-grid');
            const cards = [...grid.querySelectorAll('.project')];
            // Measure the normal grid flow, not a card's changing sticky position.
            const cardOffset = (index) => {
                const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
                return cards
                    .slice(0, index)
                    .reduce((sum, card) => sum + card.offsetHeight + gap, 0);
            };
            cards.forEach((card, index) => {
                const frame = card.querySelector('.browser-frame');
                const rotation =
                    parseFloat(
                        getComputedStyle(card).getPropertyValue(
                            '--frame-rotation',
                        ),
                    ) || 0;
                gsap.fromTo(
                    frame,
                    { y: 20, rotation: rotation * 1.35, scale: 0.94 },
                    {
                        y: -10,
                        rotation: rotation * -0.3,
                        scale: 1.02,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: grid,
                            start: () => `top+=${cardOffset(index)} 95%`,
                            end: () =>
                                `top+=${cardOffset(index) + card.offsetHeight} 30%`,
                            scrub: 0.45,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            });
            gsap.from('.stack-tile', {
                y: 24,
                scale: 0.92,
                duration: 0.55,
                stagger: 0.04,
                ease: 'power3.out',
                clearProps: 'transform',
                scrollTrigger: {
                    trigger: '.stack-grid',
                    start: 'top 88%',
                    once: true,
                },
            });
            let active = true;
            let refreshFrame;
            const refresh = () => {
                window.cancelAnimationFrame(refreshFrame);
                refreshFrame = window.requestAnimationFrame(() => {
                    if (active) ScrollTrigger.refresh();
                });
            };
            const archive = document.querySelector('.more-projects');
            archive?.addEventListener('toggle', refresh);
            document.fonts?.ready.then(() => {
                if (active) refresh();
            });
            refresh();
            return () => {
                active = false;
                window.cancelAnimationFrame(refreshFrame);
                archive?.removeEventListener('toggle', refresh);
            };
        },
    );
})();
