// Projects Filter Functionality
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-all-grid .project-card');

    if (!filterBtns.length || !projectCards.length) return;

    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const cats = card.dataset.category || '';
                if (filter === 'all' || cats.includes(filter)) {
                    card.style.display = '';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = '';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.92)';
                    setTimeout(() => { card.style.display = 'none'; }, 350);
                }
            });
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                let current = 0;
                const step = target / 60;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current) + suffix;
                    }
                }, 16);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

// Scroll reveal for cards
function initScrollReveal() {
    const cards = document.querySelectorAll('.feature-card, .step-card, .service-card, .use-case-card, .process-step');

    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// EmailJS Contact Form (configure SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY)
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جارٍ الإرسال...</span>';
        btn.disabled = true;

        const templateParams = {
            from_name: document.getElementById('name')?.value || '',
            from_email: document.getElementById('email')?.value || '',
            project_type: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || '',
            to_name: 'براء'
        };

        try {
            if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
                await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey);
                showFormSuccess(form, btn, originalHTML);
            } else {
                setTimeout(() => showFormSuccess(form, btn, originalHTML), 1500);
            }
        } catch (err) {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            alert('حدث خطأ. يرجى التواصل عبر البريد الإلكتروني مباشرةً.');
        }
    });
}

function showFormSuccess(form, btn, originalHTML) {
    btn.innerHTML = '<i class="fas fa-check-circle"></i> <span>تم الإرسال بنجاح!</span>';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';

    setTimeout(() => {
        form.reset();
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectsFilter();
    initFAQ();
    initCounters();
    initScrollReveal();
    initContactForm();
});
