// ============================
// Navigation Scroll Effect
// ============================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ============================
// Mobile Menu Toggle
// ============================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ============================
// Reveal on Scroll (IntersectionObserver)
// ============================
const reveals = document.querySelectorAll('.reveal');

// 首屏元素直接显示（不需要滚动触发）
const heroReveals = document.querySelectorAll('.hero .reveal');
heroReveals.forEach((el, i) => {
    setTimeout(() => {
        el.classList.add('active');
    }, 100 + i * 120);
});

// 其他元素用 IntersectionObserver
const nonHeroReveals = document.querySelectorAll('.reveal:not(.hero .reveal)');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

nonHeroReveals.forEach(el => revealObserver.observe(el));

// ============================
// Work Item Click
// ============================
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', () => {
        const href = item.getAttribute('data-href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        }
    });
});

// ============================
// Smooth Active Nav Link
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-text)';
        }
    });
});
