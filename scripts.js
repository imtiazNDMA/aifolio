/* 
 * UI/UX Optimized Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroParticles();
    initAnimations();
    initSkills();
    initContactForm();
    
    // UI/UX Upgrades (New)
    initCustomCursor();
    initScrollProgress();
    init3DTilt();
    initMobileMenu();
});

// Header Scroll Effect
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenu ? mobileMenu.querySelector('i') : null;

    if (!mobileMenu || !navLinks) return;

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) menuIcon.classList.replace('bx-x', 'bx-menu');
        });
    });
}

// Professional AI Particle Engine (Synaptic Graph Evolution)
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('hero-canvas-container');

    let particles = [];
    const particleCount = 140;
    const connectionDistance = 120;
    const mouseRadius = 150;
    let mouse = { x: null, y: null };

    function resize() {
        if (!container) return;
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
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseRadius) {
                    let force = (mouseRadius - distance) / mouseRadius;
                    this.x -= (dx / distance) * force * this.density;
                    this.y -= (dy / distance) * force * this.density;
                } else {
                    this.x += (this.baseX - this.x) / 10;
                    this.y += (this.baseY - this.y) / 10;
                }
            }

            this.x += this.vx;
            this.y += this.vy;
            this.baseX += this.vx;
            this.baseY += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(203, 166, 247, 0.8)';
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

// GSAP Animations (Reveals)
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-text h1', { duration: 1.2, y: 100, opacity: 0, ease: 'power4.out' });
    gsap.from('.hero-text p', { duration: 1, y: 50, opacity: 0, ease: 'power4.out', delay: 0.3 });
    gsap.from('.hero-btns', { duration: 1, y: 30, opacity: 0, ease: 'power4.out', delay: 0.5 });

    gsap.utils.toArray('section:not(#hero)').forEach(section => {
        gsap.from(section.querySelectorAll('h2, p, .domain-card, .project-card, .contact-card'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });
}

function initSkills() {
    // Skills are mostly static tech tags now
}

// Custom Magnetic Cursor Logic (Binary Stream)
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    let lastX = 0;
    let lastY = 0;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Main Dot Position
        gsap.to(dot, { duration: 0.1, x: posX, y: posY });

        // Spawn Binary Particle only if mouse moved enough (Throttled)
        const dist = Math.hypot(posX - lastX, posY - lastY);
        if (dist > 15) {
            spawnBinary(posX, posY);
            lastX = posX;
            lastY = posY;
        }

        // Magnetic Effect
        const targets = document.querySelectorAll('a, button, .tech-tag, .project-card');
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    });
}

function spawnBinary(x, y) {
    const particle = document.createElement('div');
    particle.className = 'binary-particle';
    particle.innerText = Math.random() > 0.5 ? '1' : '0';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    gsap.to(particle, {
        y: (Math.random() - 0.5) * 40,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => particle.remove()
    });
}

// Scroll Progress Bar Logic
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height <= 0) return;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    });
}

// 3D Tilt Effect Logic
function init3DTilt() {
    const cards = document.querySelectorAll('.domain-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            
            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02,
                ease: 'power2.out'
            });

            // Update internal spotlight
            const spotlight = card.querySelector('.spotlight-overlay');
            if (spotlight) {
                spotlight.style.setProperty('--mouse-x', `${x}px`);
                spotlight.style.setProperty('--mouse-y', `${y}px`);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        if (!btn) return;
        btn.innerHTML = 'Sending Intelligence... <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '[SUCCESS] Payload delivered to Imtiaz Nabi <i class="bx bx-check"></i>';
            btn.style.background = '#a6e3a1';
            btn.style.color = '#1e1e2e';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = 'Execute Transmission <i class="bx bx-terminal"></i>';
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 4000);
        }, 1800);
    });
}