/**
 * Tim Dietrich - Personal Website
 * Main JavaScript file
 */

(function() {
    'use strict';

    // ========================================
    // Navigation
    // ========================================

    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Smooth Scroll for anchor links
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Reveal Animations
    // ========================================

    const revealElements = document.querySelectorAll('.section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // ========================================
    // Active Navigation Link
    // ========================================

    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // ========================================
    // Timeline Animation
    // ========================================

    const timelineItems = document.querySelectorAll('.timeline-item');

    const animateTimeline = () => {
        const windowHeight = window.innerHeight;

        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
    };

    // Initial check
    animateTimeline();

    // Check on scroll
    window.addEventListener('scroll', animateTimeline, { passive: true });

    // ========================================
    // Skill Cards Hover Effect
    // ========================================

    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // Project Cards Tilt Effect
    // ========================================

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // Highlight Cards Counter Animation
    // ========================================

    const highlightNumbers = document.querySelectorAll('.highlight-number');
    let hasAnimated = false;

    const animateNumbers = () => {
        if (hasAnimated) return;

        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;

        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            hasAnimated = true;

            highlightNumbers.forEach(number => {
                const text = number.textContent;
                const numMatch = text.match(/\d+/);

                if (numMatch) {
                    const target = parseInt(numMatch[0]);
                    const suffix = text.replace(/\d+/, '');
                    let current = 0;
                    const increment = target / 30;
                    const duration = 1500;
                    const stepTime = duration / 30;

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            number.textContent = target + suffix;
                            clearInterval(counter);
                        } else {
                            number.textContent = Math.floor(current) + suffix;
                        }
                    }, stepTime);
                }
            });
        }
    };

    window.addEventListener('scroll', animateNumbers, { passive: true });

    // ========================================
    // Form Handling (if contact form exists)
    // ========================================

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    // ========================================
    // Lazy Loading Images
    // ========================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // Keyboard Navigation
    // ========================================

    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Performance: Throttle scroll events
    // ========================================

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to intensive scroll handlers if needed
    // Example: window.addEventListener('scroll', throttle(someFunction, 100));

    // ========================================
    // Dynamic Copyright Year
    // ========================================

    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // ========================================
    // Email Obfuscation
    // ========================================

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const u = 'timdietrich';
        const d = 'gmail';
        const t = 'com';
        const addr = u + '@' + d + '.' + t;
        emailLink.href = 'mail' + 'to:' + addr;
    }

    // Email obfuscation for terms and privacy pages
    const contactEmailTos = document.getElementById('contact-email-tos');
    if (contactEmailTos) {
        contactEmailTos.addEventListener('click', function(e) {
            e.preventDefault();
            const u = 'timdietrich';
            const d = 'gmail';
            const t = 'com';
            const addr = u + '@' + d + '.' + t;
            this.href = 'mail' + 'to:' + addr;
            this.textContent = addr;
        });
    }

    const contactEmailPrivacy = document.getElementById('contact-email-privacy');
    if (contactEmailPrivacy) {
        contactEmailPrivacy.addEventListener('click', function(e) {
            e.preventDefault();
            const u = 'timdietrich';
            const d = 'gmail';
            const t = 'com';
            const addr = u + '@' + d + '.' + t;
            this.href = 'mail' + 'to:' + addr;
            this.textContent = addr;
        });
    }

    // ========================================
    // Initialize
    // ========================================

    console.log('Tim Dietrich - Personal Website Loaded');

})();
