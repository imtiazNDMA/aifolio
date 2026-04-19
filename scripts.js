/* 
 * UI/UX Optimized Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroParticles();
    initAnimations();
    initSkills();
    initContactForm();
    initCertIframe();
    initTypedEffect();
    initTimelineAnimation();
    initTerminalTyping();
    
    // UI/UX Upgrades (New)
    initCustomCursor();
    initScrollProgress();
    init3DTilt();
    initMobileMenu();
    initLeadChat();
    initAnalyticsTracking();
});

// Header Scroll Effect
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function trackEvent(eventName, payload = {}) {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...payload });
    }
    if (typeof window.plausible === 'function') {
        window.plausible(eventName, { props: payload });
    }
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

    const targets = document.querySelectorAll('a, button, .tech-tag, .project-card');
    targets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });

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
    const startedAtField = form.querySelector('#form-started-at');
    if (startedAtField) {
        startedAtField.value = String(Date.now());
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        if (!btn) return;

        const honeypot = form.querySelector('input[name="_gotcha"]');
        if (honeypot && honeypot.value.trim() !== '') {
            return;
        }

        const startedAt = Number(startedAtField?.value || Date.now());
        if ((Date.now() - startedAt) < 3000) {
                btn.innerHTML = '[ERROR] Wait 3 seconds, then retry <i class="bx bx-time"></i>';
            btn.style.background = '#f38ba8';
            btn.style.color = '#1e1e2e';
                setTimeout(() => {
                btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
            return;
        }

        btn.innerHTML = 'Sending Intelligence... <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                btn.innerHTML = '[SUCCESS] Message sent successfully <i class="bx bx-check"></i>';
                btn.style.background = '#a6e3a1';
                btn.style.color = '#1e1e2e';
                form.reset();
                if (startedAtField) {
                    startedAtField.value = String(Date.now());
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            btn.innerHTML = '[ERROR] Transmission failed, retry <i class="bx bx-refresh"></i>';
            btn.style.background = '#f38ba8';
            btn.style.color = '#1e1e2e';
        }

        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 4000);
    });
}

function initLeadChat() {
    const toggleBtn = document.getElementById('lead-chat-toggle');
    const closeBtn = document.getElementById('lead-chat-close');
    const panel = document.getElementById('lead-chat-panel');
    const messagesEl = document.getElementById('lead-chat-messages');
    const chatForm = document.getElementById('lead-chat-form');
    const chatInput = document.getElementById('lead-chat-input');
    const quickButtons = document.querySelectorAll('.chat-quick-btn');
    const leadForm = document.getElementById('lead-capture-form');

    if (!toggleBtn || !closeBtn || !panel || !messagesEl || !chatForm || !chatInput || !leadForm) return;

    let initialized = false;
    let selectedIntent = '';
    let openAt = Date.now();
    const transcript = [];

    const botReplies = {
        rag: 'Great use case. I usually start with data quality checks, chunking strategy, hybrid retrieval, and evaluation harness setup.',
        agent: 'Perfect. I can deliver a production-focused AI agent MVP in two weeks with tool orchestration and guardrails.',
        optimization: 'Good call. I can audit your current stack for latency, hallucination patterns, and cost leaks with an actionable hardening plan.'
    };

    function addMessage(role, text) {
        const message = document.createElement('div');
        message.className = `lead-chat-message ${role}`;
        message.textContent = text;
        messagesEl.appendChild(message);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        transcript.push(`${role}: ${text}`);
        if (transcript.length > 30) transcript.shift();
    }

    function openChat() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        openAt = Date.now();
        if (!initialized) {
            addMessage('bot', 'Hi, I can help scope your project and suggest the best next step. Share your use case and timeline.');
            initialized = true;
        }
        chatInput.focus();
    }

    function closeChat() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }

    toggleBtn.addEventListener('click', () => {
        if (panel.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
            trackEvent('chat_open', { source: 'floating_button' });
        }
    });

    closeBtn.addEventListener('click', closeChat);

    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const intent = btn.getAttribute('data-intent') || '';
            selectedIntent = intent;
            addMessage('user', btn.textContent || 'Project request');
            addMessage('bot', botReplies[intent] || 'Thanks. Share your current challenge and target outcome.');
            trackEvent('chat_quick_intent', { intent: selectedIntent || 'unknown' });
        });
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage('user', text);
        trackEvent('chat_message_sent', { length_bucket: text.length > 80 ? 'long' : 'short' });
        const lower = text.toLowerCase();
        if (lower.includes('budget')) {
            addMessage('bot', 'I can propose phased options. Share your timeline and target business outcome in one line.');
        } else if (lower.includes('timeline') || lower.includes('time')) {
            addMessage('bot', 'For most builds: audit in 2-3 days, MVP in ~2 weeks, hardening in 1-2 weeks.');
        } else if (lower.includes('@')) {
            addMessage('bot', 'Thanks. I also captured your email context. Submit the short lead form below and I will follow up with a proposal.');
        } else {
            addMessage('bot', 'Got it. If this looks aligned, submit the mini form below and I will send a tailored proposal.');
        }

        chatInput.value = '';
    });

    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('lead-name');
        const email = document.getElementById('lead-email');
        const company = document.getElementById('lead-company');
        const submitBtn = leadForm.querySelector('button[type="submit"]');

        if (!name || !email || !submitBtn) return;
        if ((Date.now() - openAt) < 3000) {
            addMessage('bot', 'Please wait 3 seconds and submit again.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            const formData = new FormData();
            formData.append('name', name.value.trim());
            formData.append('email', email.value.trim());
            formData.append('company', company ? company.value.trim() : '');
            formData.append('_subject', 'New Lead from Portfolio Chat Assistant');
            formData.append('message', `Intent: ${selectedIntent || 'general'}\n\nTranscript:\n${transcript.join('\n')}`);

            const response = await fetch('https://formspree.io/f/meevkvpj', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) throw new Error('Lead submit failed');

            addMessage('bot', 'Done. Thanks for sharing details - I will follow up with next steps and a proposal path soon.');
            leadForm.reset();
            trackEvent('chat_lead_submit_success', { intent: selectedIntent || 'general' });
        } catch (error) {
            addMessage('bot', 'Submission failed. Please retry or use the contact form below.');
            trackEvent('chat_lead_submit_failed', { intent: selectedIntent || 'general' });
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Get Proposal';
    });
}

function initAnalyticsTracking() {
    document.querySelectorAll('.btn-primary').forEach((button) => {
        button.addEventListener('click', () => {
            const text = (button.textContent || '').trim().toLowerCase().replace(/\s+/g, '_').slice(0, 40);
            trackEvent('cta_click', { label: text || 'primary_button' });
        });
    });

    document.querySelectorAll('.project-link').forEach((link) => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            trackEvent('project_link_click', { destination: href.includes('github.com') ? 'github' : href });
        });
    });
}

// Certificate iframe lazy loading
function initCertIframe() {
    const iframes = document.querySelectorAll('.cert-iframe');
    
    iframes.forEach(iframe => {
        const src = iframe.getAttribute('data-src');
        if (!iframe.getAttribute('title')) {
            iframe.setAttribute('title', 'Certification preview');
        }
        if (src) {
            iframe.src = src;
        }
    });
}

// Typed.js Effect for Hero
function initTypedEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const typed = new Typed('#typed-text', {
        strings: [
            "Imtiaz Nabi",
            " an AI Engineer"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        contentType: 'html'
    });
}

// Timeline Scroll Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Terminal Command Typing Effect using Typed.js
function initTerminalTyping() {
    const terminalCommands = [
        { id: 'typed-cmd-1', text: 'cat /docs/value_proposition.txt', delay: 800 },
        { id: 'typed-cmd-2', text: './execute_hire.sh', delay: 1800 },
        { id: 'typed-cmd-3', text: 'git log --career --oneline', delay: 800 },
        { id: 'typed-cmd-4', text: 'ls -la --certificates', delay: 800 }
    ];

    terminalCommands.forEach((cmd) => {
        const element = document.getElementById(cmd.id);
        if (!element) return;

        setTimeout(() => {
            new Typed(`#${cmd.id}`, {
                strings: [cmd.text],
                typeSpeed: 60,
                backSpeed: 0,
                startDelay: 0,
                showCursor: false,
                contentType: 'text'
            });
        }, cmd.delay);
    });
}
