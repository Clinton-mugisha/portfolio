(function () {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const header = document.querySelector('[data-header]');
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let previousScroll = window.scrollY;
    let scrollFrame = null;

    root.classList.add('js');

    function setMenu(open) {
        if (!menuButton || !mobileMenu) return;

        menuButton.classList.toggle('is-active', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileMenu.classList.toggle('is-open', open);
        mobileMenu.setAttribute('aria-hidden', String(!open));
        body.classList.toggle('menu-open', open);
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
                setMenu(false);
                menuButton.focus();
            }
        });
    }

    const year = document.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    const localTime = document.querySelector('[data-local-time]');
    function updateLocalTime() {
        if (!localTime) return;

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Kampala',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date());

        localTime.textContent = `${time} EAT`;
    }
    updateLocalTime();
    window.setInterval(updateLocalTime, 60000);

    // Throttle header updates to one write per animation frame.
    function updateHeader() {
        if (!header || body.classList.contains('menu-open')) {
            scrollFrame = null;
            return;
        }

        const currentScroll = window.scrollY;
        const shouldHide = currentScroll > previousScroll && currentScroll > 180;
        header.classList.toggle('is-hidden', shouldHide);
        previousScroll = currentScroll;
        scrollFrame = null;
    }

    window.addEventListener('scroll', () => {
        if (scrollFrame === null) {
            scrollFrame = window.requestAnimationFrame(updateHeader);
        }
    }, { passive: true });

    // IntersectionObserver triggers each reveal once; nothing follows the scroll position.
    const revealSelectors = [
        '.section-heading',
        '[data-project] .project-media',
        '[data-project] .project-copy',
        '.archive-heading',
        '.archive-row',
        '.about-heading',
        '.about-statement',
        '.capabilities',
        '.toolkit',
        '.contact-top',
        '.contact-main',
        '.contact-details',
    ];
    const revealElements = document.querySelectorAll(revealSelectors.join(','));

    revealElements.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');

        if (element.classList.contains('project-copy')) {
            element.style.setProperty('--reveal-delay', '80ms');
        } else if (element.classList.contains('archive-row')) {
            element.style.setProperty('--reveal-delay', `${(index % 4) * 45}ms`);
        }
    });

    if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.06,
        });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    const portraitCard = document.querySelector('.portrait-card');
    if (portraitCard) {
        if (!reduceMotion && 'IntersectionObserver' in window) {
            const orbitObserver = new IntersectionObserver(([entry]) => {
                portraitCard.classList.toggle('orbit-paused', !entry.isIntersecting);
            }, { threshold: 0.01 });
            orbitObserver.observe(portraitCard);
        } else if (reduceMotion) {
            portraitCard.classList.add('orbit-paused');
        }
    }

    const heroTitle = document.querySelector('.hero-title');

    // GSAP is reserved for the short opening sequence only.
    if (typeof window.gsap === 'undefined' || reduceMotion) {
        heroTitle?.classList.add('is-settled');
        return;
    }

    const { gsap } = window;
    gsap.defaults({ ease: 'power3.out', duration: 0.85 });

    gsap.fromTo('.title-line > span',
        { yPercent: 110 },
        {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.075,
            ease: 'power4.out',
            delay: 0.12,
            clearProps: 'transform',
            onComplete: () => heroTitle?.classList.add('is-settled'),
        }
    );

    gsap.fromTo('.hero .reveal-up',
        { y: 18, autoAlpha: 0 },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.08,
            delay: 0.36,
            clearProps: 'transform,opacity,visibility',
        }
    );
})();
