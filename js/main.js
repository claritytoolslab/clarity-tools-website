/**
 * Clarity Tools Lab - Main JavaScript
 * Handles navigation, scroll effects, and interactive elements
 */

// ===========================================
// MOBILE NAVIGATION
// ===========================================
const initMobileNav = () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (!mobileToggle || !navLinks) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });

    // Close menu when clicking a link
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');

            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');

            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
};

// ===========================================
// SCROLL EFFECTS
// ===========================================
const initScrollEffects = () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow to navbar on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
};

// ===========================================
// SMOOTH SCROLL
// ===========================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for non-section links
            if (href === '#' || href.length === 1) return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ===========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.product-card, .contact-card, .principles li, .section-header'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
};

// ===========================================
// EMAIL VALIDATION & TRACKING
// ===========================================
const initEmailTracking = () => {
    // Track email link clicks (for analytics if needed)
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Email contact initiated');
            // Add analytics tracking here if needed
        });
    });
};

// ===========================================
// PRODUCT CARD INTERACTIONS
// ===========================================
const initProductCards = () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Add hover effect enhancements
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        // Track product interest clicks
        const ctaButtons = card.querySelectorAll('.btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productName = card.querySelector('h3').textContent;
                const action = btn.textContent;
                console.log(`Product interaction: ${productName} - ${action}`);
                // Add analytics tracking here if needed
            });
        });
    });
};

// ===========================================
// LAZY LOADING IMAGES
// ===========================================
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// ===========================================
// ACCESSIBILITY ENHANCEMENTS
// ===========================================
const initAccessibility = () => {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Focus management for links
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.transition = 'outline 0.2s ease';
        });
    });
};

// ===========================================
// PERFORMANCE MONITORING
// ===========================================
const initPerformanceMonitoring = () => {
    // Log page load performance
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
};

// ===========================================
// THEME DETECTION (Optional future feature)
// ===========================================
const detectUserPreferences = () => {
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduce-motion');
        console.log('Reduced motion mode enabled');
    }

    // Detect high contrast mode
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    if (prefersHighContrast) {
        document.body.classList.add('high-contrast');
        console.log('High contrast mode enabled');
    }
};

// ===========================================
// EXTERNAL LINKS
// ===========================================
const initExternalLinks = () => {
    // Add security attributes to external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
};

// ===========================================
// SCROLL TO TOP
// ===========================================
const initScrollToTop = () => {
    // Show/hide scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-accent);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ===========================================
// INITIALIZE ALL FEATURES
// ===========================================
const initApp = () => {
    console.log('Initializing Clarity Tools Lab website...');

    // Core features
    initMobileNav();
    initScrollEffects();
    initSmoothScroll();
    initScrollAnimations();

    // Enhanced features
    initEmailTracking();
    initProductCards();
    initLazyLoading();
    initAccessibility();
    initExternalLinks();
    initScrollToTop();

    // Performance & preferences
    initPerformanceMonitoring();
    detectUserPreferences();

    console.log('Clarity Tools Lab website initialized successfully!');
};

// ===========================================
// START APP WHEN DOM IS READY
// ===========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ===========================================
// ERROR HANDLING
// ===========================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ===========================================
// EXPORT FOR POTENTIAL MODULE USE
// ===========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        initMobileNav,
        initScrollEffects,
        initSmoothScroll
    };
}
