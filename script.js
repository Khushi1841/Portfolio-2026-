/* 
   KHUSHI KUMARI - PORTFOLIO SHARED LOGIC
   Used across all pages (index, about, Resume, Contact)
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Loader & Safety Timeout
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    };
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 4000);

    // 2. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
    }

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            menuToggle.classList.toggle('is-open', navMenu.classList.contains('mobile-active'));
        });
    }

    // 5. Typewriter Effect (Hero page only)
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const roles = ["Full Stack Developer", "Data Science Student", "AI Builder", "Machine Learning Explorer"];
        let roleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            typewriterElement.textContent = currentRole.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
            charIndex += isDeleting ? -1 : 1;
            typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true; typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 6. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            observer.observe(el);
            // Auto-trigger reveals visible on load (for sections at top)
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) el.classList.add('visible');
        });
    }

    // 7. Canvas Background (Animated Dots)
    const canvas = document.getElementById('canvas-dots');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let dots = [];
        const dotCount = 80;

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            dots = [];
            for (let i = 0; i < dotCount; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(246, 196, 83, 0.22)';
            dots.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;
                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }

        initCanvas();
        animate();
        window.addEventListener('resize', initCanvas);
    }

    // 8. Number Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter); // Only animate once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // 9. Certificate cards from shared data
    const certificateTracks = document.querySelectorAll('[data-certificates]');
    const certificates = window.PORTFOLIO_CERTIFICATES || [];
    if (certificateTracks.length > 0 && certificates.length > 0) {
        certificateTracks.forEach(track => {
            const prefix = track.getAttribute('data-asset-prefix') || '';
            track.innerHTML = certificates.map(cert => {
                const imagePath = prefix + cert.image;
                const postButton = cert.postUrl
                    ? `<a class="cert-post-btn" href="${cert.postUrl}" target="_blank" rel="noopener">View Post <i class="fab fa-linkedin-in"></i></a>`
                    : `<span class="cert-post-btn disabled" title="Add this certificate's LinkedIn post URL in Data/certificates.js">Post Link Needed</span>`;

                return `
                    <article class="cert-card">
                        <img src="${imagePath}" alt="${cert.title}">
                        <div class="cert-card-body">
                            <h3>${cert.title}</h3>
                            ${postButton}
                        </div>
                    </article>
                `;
            }).join('');

            if (!track.dataset.cloned) {
                track.innerHTML += track.innerHTML;
                track.dataset.cloned = 'true';
            }
        });
    }
});
