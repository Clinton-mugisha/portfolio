// =============================================
// CLEAN PORTFOLIO JS — Minimal & Purposeful
// =============================================

(function () {
    'use strict';

    // --- Mobile Menu ---
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

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // --- Smooth scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 72,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll reveal (subtle fade-in on scroll) ---
    const revealElements = document.querySelectorAll(
        '.project-card, .skill-category, .service-card, .contact-item, .about-stats .stat, .section-header'
    );

    if (revealElements.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i % 6 * 0.06}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i % 6 * 0.06}s`;
            revealObserver.observe(el);
        });
    }

    // --- Scroll-to-top button ---
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

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.pageYOffset > 400 ? 'flex' : 'none';
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
