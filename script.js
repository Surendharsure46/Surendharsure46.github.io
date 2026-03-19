document.addEventListener('DOMContentLoaded', () => {
    // Nav menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Form submission EmailJS
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');

            // Loading state
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Send via EmailJS
            emailjs.sendForm('service_b36q8pn', 'template_9n0711c', contactForm)
                .then(() => {
                    formStatus.style.display = 'block';
                    formStatus.style.color = 'var(--neon-blue)';
                    formStatus.textContent = 'Message sent successfully!';
                    alert('Message sent successfully!');

                    contactForm.reset();
                    btn.textContent = 'Send Message';
                    btn.disabled = false;

                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#ff4c4c';
                    formStatus.textContent = 'Failed to send message';
                    alert('Failed to send message');

                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                    console.log('EmailJS Error:', error);
                });
        });
    }
});
