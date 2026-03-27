/**
 * ScreenDimmer Landing Page - JavaScript
 * Modern, interactive, and conversion-focused
 */

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const demoSlider = document.getElementById('demoSlider');
const demoScreen = document.getElementById('demoScreen');
const demoPercentage = document.getElementById('demoPercentage');
const demoIcon = document.getElementById('demoIcon');
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contactForm = document.getElementById('contactForm');

// ========== NAVBAR SCROLL EFFECT ==========
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== INTERACTIVE DEMO ==========
if (demoSlider && demoScreen) {
    demoSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        const opacity = value / 100;
        
        // Update screen opacity
        demoScreen.style.opacity = opacity;
        
        // Update percentage text
        if (demoPercentage) {
            demoPercentage.textContent = `${value}%`;
        }
        
        // Update icon based on value
        if (demoIcon) {
            if (value < 30) {
                demoIcon.textContent = '☀️';
            } else if (value < 60) {
                demoIcon.textContent = '🌤️';
            } else {
                demoIcon.textContent = '🌙';
            }
        }
    });
}

// ========== TESTIMONIALS CAROUSEL ==========
let currentSlide = 0;
const testimonials = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];
const totalSlides = testimonials.length;

function updateCarousel() {
    if (!testimonialTrack) return;
    
    const slideWidth = testimonials[0]?.offsetWidth || 0;
    const gap = 32; // 2rem gap
    testimonialTrack.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Update on resize
window.addEventListener('resize', updateCarousel);

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .benefit-item, .download-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ========== DOWNLOAD BUTTON TRACKING ==========
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show coming soon message for actual download
        if (!btn.href || btn.href === '#') {
            e.preventDefault();
            showNotification('Download disponível em breve! 🚀');
        }
    });
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== CONTACT FORM ==========
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! 📧');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ========== KEYBOARD SHORTCUTS DEMO ==========
document.addEventListener('keydown', (e) => {
    // Only if demo slider is visible
    if (!demoSlider || !isElementInViewport(demoSlider)) return;
    
    if (e.ctrlKey && e.shiftKey) {
        const currentValue = parseInt(demoSlider.value);
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            demoSlider.value = Math.min(currentValue + 10, 80);
            demoSlider.dispatchEvent(new Event('input'));
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            demoSlider.value = Math.max(currentValue - 10, 10);
            demoSlider.dispatchEvent(new Event('input'));
        }
    }
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== ADD CSS ANIMATIONS DYNAMICALLY ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Set initial demo value
    if (demoSlider) {
        demoSlider.value = 50;
        demoSlider.dispatchEvent(new Event('input'));
    }
    
    // Log initialization
    console.log('%c🌙 ScreenDimmer Landing Page', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cCriado para ajudar pessoas com sensibilidade à luz', 'color: #94a3b8;');
});

// ========== PARTICLE BACKGROUND (OPTIONAL ENHANCEMENT) ==========
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Add floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
        }
        75% {
            transform: translateY(-30px) translateX(5px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particles
createParticles();
