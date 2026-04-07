/* 
 * UI/UX Optimized Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroParticles();
    initSpotlight();
    initAnimations();
    initSkills();
    initContactForm();
});

// Header Scroll Effect
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Global Spotlight Logic
function initSpotlight() {
    const spotlights = document.querySelectorAll('.spotlight-overlay');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        
        spotlights.forEach(spot => {
            const rect = spot.getBoundingClientRect();
            const relX = x - rect.left;
            const relY = y - rect.top;
            spot.style.setProperty('--mouse-x', `${relX}px`);
            spot.style.setProperty('--mouse-y', `${relY}px`);
        });
    });
}

// Professional AI Particle Engine (Vector Field & Mouse Attraction)
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('hero-canvas-container');

    let particles = [];
    const particleCount = 140; // Denser particles
    const connectionDistance = 120;
    const mouseRadius = 150;
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.density = (Math.random() * 30) + 1;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            // Mouse Interaction Logic
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouseRadius - distance) / mouseRadius;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouseRadius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }

            this.x += this.vx;
            this.y += this.vy;
            this.baseX += this.vx;
            this.baseY += this.vy;

            // Boundary checks
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(203, 166, 247, 0.8)'; // Mauve
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.update();
            p.draw();

            // Inter-particle connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(180, 190, 254, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }

            // Connection to mouse
            if (mouse.x !== null) {
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(148, 226, 213, ${1 - mdist / connectionDistance})`; // Teal for mouse interaction
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', init);
    init();
    animate();
}

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry
    const tl = gsap.timeline();
    tl.from('.hero-text h1', { duration: 1.2, y: 100, opacity: 0, ease: 'power4.out' })
      .from('.hero-text p', { duration: 1, y: 50, opacity: 0, ease: 'power4.out' }, '-=0.8')
      .from('.hero-btns', { duration: 1, y: 30, opacity: 0, ease: 'power4.out' }, '-=0.8')
      .from('.hero-visual', { duration: 1.5, scale: 0.8, opacity: 0, ease: 'power4.out' }, '-=1');

    // Section Reveals
    gsap.utils.toArray('section:not(#hero)').forEach(section => {
        gsap.from(section.querySelectorAll('.hero-tagline, h2, p, .about-content, .stat-item, .bento-item, .project-card, .contact-card, .domain-card, .arch-card'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });
}

// Progress Bar Animation
function initSkills() {
    gsap.utils.toArray('.skill-progress').forEach(progress => {
        const val = progress.getAttribute('data-progress');
        gsap.to(progress, {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 75%',
            },
            width: `${val}%`,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerHTML = 'Sending Intelligence... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Mission Successful! <i class="bx bx-check"></i>';
                btn.style.background = '#a6e3a1';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = 'Contact Me Now <i class="bx bx-send"></i>';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1800);
        });
    }
}