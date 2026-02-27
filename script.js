// =============================================
// PREMIUM PORTFOLIO JS
// Lenis · GSAP ScrollTrigger · Kinetic Typography · Counter
// =============================================

(function () {
    'use strict';

    // ─── Lenis Smooth Scroll ─────────────────────
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ─── Mobile Menu ─────────────────────────────
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ─── Navbar scroll effect ────────────────────
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -20',
            onUpdate: (self) => {
                navbar.classList.toggle('scrolled', self.scroll() > 20);
            },
        });
    }

    // ─── Smooth scrolling for anchors (via Lenis) ─
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -72 });
            }
        });
    });

    // ─── Kinetic Typography: Hero Title ──────────
    const titleWords = document.querySelectorAll('.title-word');
    if (titleWords.length) {
        gsap.set(titleWords, { yPercent: 110, opacity: 0 });

        gsap.to(titleWords, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.07,
            ease: 'expo.out',
            delay: 0.25,
        });
    }

    // ─── Orbit Entrance Animation ────────────────
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, i) => {
        gsap.from(orbit, {
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            delay: 0.5 + i * 0.2,
        });
    });

    // ─── Kinetic Typography: Section Titles (scroll-triggered mask reveal) ─
    document.querySelectorAll('[data-split]').forEach(title => {
        const html = title.innerHTML;
        const wrapped = html
            .replace(/<br\s*\/?>/gi, ' |||BR||| ')
            .split(/\s+/)
            .filter(Boolean)
            .map(word => {
                if (word === '|||BR|||') return '<br>';
                return '<span class="word"><span class="word-inner">' + word + '</span></span>';
            })
            .join(' ');

        title.innerHTML = wrapped;

        const wordInners = title.querySelectorAll('.word-inner');
        gsap.set(wordInners, { yPercent: 100 });

        ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            onEnter: () => {
                title.classList.add('in-view');
                gsap.to(wordInners, {
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.035,
                    ease: 'expo.out',
                });
            },
            once: true,
        });
    });

    // ─── Section Header scroll trigger ───────────
    document.querySelectorAll('.section-header').forEach(header => {
        ScrollTrigger.create({
            trigger: header,
            start: 'top 85%',
            onEnter: () => header.classList.add('in-view'),
            once: true,
        });
    });

    // ─── Counter Animation (on page load) ────────
    function animateCounters() {
        document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // ms
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                counter.textContent = current + suffix;
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    }

    // Fire counters after hero title finishes revealing (~1s delay)
    setTimeout(animateCounters, 900);

    // ─── Scroll-Bound Animations with GSAP ───────

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            delay: (i % 3) * 0.1,
        });
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            delay: i * 0.1,
        });
    });

    // Bento cards
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            scale: 0.97,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            delay: (i % 3) * 0.08,
        });
    });

    // Contact items
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
            x: -30,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            delay: i * 0.1,
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.from(contactForm, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: contactForm,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    }

    // About stats
    gsap.utils.toArray('.about-stats .stat').forEach((stat, i) => {
        gsap.from(stat, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            delay: i * 0.1,
        });
    });

    // About text paragraphs
    gsap.utils.toArray('.about-text p').forEach((p, i) => {
        gsap.from(p, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: p,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            delay: i * 0.15,
        });
    });

    // ─── Parallax: Hero image ────────────────────
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        gsap.to(heroVisual, {
            y: 80,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
    }

    // Parallax: Project images with depth
    gsap.utils.toArray('.project-image img').forEach(img => {
        gsap.to(img, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
                trigger: img.closest('.project-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    });

    // ─── Footer reveal ──────────────────────────
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer.querySelector('.footer-content'), {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: footer,
                start: 'top 92%',
                toggleActions: 'play none none none',
            },
        });
    }

    // ─── Scroll-to-top button ────────────────────
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: #fff;
        color: #171717;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        z-index: 100;
    `;
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-2px)';
        scrollBtn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    });
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
    });

    ScrollTrigger.create({
        start: 'top -400',
        onUpdate: (self) => {
            scrollBtn.style.display = self.scroll() > 400 ? 'flex' : 'none';
        },
    });

    scrollBtn.addEventListener('click', () => {
        lenis.scrollTo(0);
    });

})();
