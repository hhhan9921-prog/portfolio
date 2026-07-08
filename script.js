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

nonHeroReveals.forEach(el => {
    revealObserver.observe(el);
    // 初始检查：如果元素已经在视口内，立即添加 active 类
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
    }
});

// ============================
// Work Item Click (精选作品)
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
// Other Work Card Click (其他作品)
// ============================
document.querySelectorAll('.other-work-card').forEach(card => {
    card.addEventListener('click', () => {
        const href = card.getAttribute('data-href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        }
    });
});

// ============================
// Other Works — 鼠标拖拽滑动
// ============================
const scrollContainer = document.querySelector('.other-works-scroll');
if (scrollContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = '';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = '';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

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
