// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// Mobile Menu System
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// إنشاء overlay للقائمة
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// فتح القائمة
function openMobileMenu() {
    if (!navLinks || !menuToggle) return;
    
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    body.style.overflow = 'hidden';
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    menuToggle.classList.add('active');
}

// إغلاق القائمة
function closeMobileMenu() {
    if (!navLinks || !menuToggle) return;
    
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.classList.remove('active');
}

// التبديل بين فتح وإغلاق القائمة
function toggleMobileMenu() {
    if (!navLinks || !menuToggle) return;
    
    if (navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Mobile Menu Toggle - مع التحقق من وجود العناصر
if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle || !navLinks) return;
    
    if(!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu when clicking overlay
navOverlay.addEventListener('click', closeMobileMenu);

// Close menu when pressing ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill Animation
const skillCards = document.querySelectorAll('.skill-card');

if (skillCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const levelFill = entry.target.querySelector('.level-fill');
                if(levelFill) {
                    // Animate skill level bars
                    setTimeout(() => {
                        levelFill.style.transition = 'width 1.5s ease';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => observer.observe(card));
}

// Project Animation
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('شكراً لك! سيتم الرد عليك في أقرب وقت.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Floating Elements Animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    if (elements.length > 0) {
        elements.forEach((el, index) => {
            el.style.animation = `float 6s ease-in-out ${index * 2}s infinite`;
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateFloatingElements();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // إضافة الـ CSS للـ overlay إذا لم يكن موجوداً
    if (!document.querySelector('#nav-overlay-style')) {
        const style = document.createElement('style');
        style.id = 'nav-overlay-style';
        style.textContent = `
            .nav-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(3px);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .nav-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            @media (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 280px;
                    height: 100vh;
                    background: #050505;
                    flex-direction: column;
                    padding: 80px 20px 30px;
                    transition: all 0.4s ease;
                    z-index: 1000;
                    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
                    border-left: 1px solid rgba(255, 255, 255, 0.05);
                }
                .nav-links.active {
                    right: 0;
                }
                .menu-toggle {
                    display: flex !important;
                }
                .nav-links .nav-link {
                    width: 100%;
                    padding: 15px 20px;
                    font-size: 1rem;
                    justify-content: flex-start;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Update navbar padding on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});