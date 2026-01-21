// --- عناصر الهيدر والسلايدر ---
const navAbout = document.getElementById('nav-about');
const navSkills = document.getElementById('nav-skills');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// --- وظيفة تحديث حالة الهيدر (تغيير الألوان) ---
function updateNav(activeSection) {
    if (activeSection === 'about') {
        navAbout.classList.add('active');
        navSkills.classList.remove('active');
    } else {
        navSkills.classList.add('active');
        navAbout.classList.remove('active');
    }
}

// --- إدارة السلايدر (الأسهم يمين ويسار) ---
function showSlide(index) {
    // إخفاء جميع السلايدات
    slides.forEach(slide => slide.classList.remove('active'));
    
    // معالجة الحدود (الدوران)
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // إظهار السلايد المختار
    slides[currentSlide].classList.add('active');
    
    // تحديث الهيدر ليصبح "مهاراتي" أزرق لأننا نتفاعل مع السلايدر
    updateNav('skills');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// --- التنقل عند الضغط على الهيدر (Navigation Click) ---
navAbout.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNav('about');
};

navSkills.onclick = () => {
    document.querySelector('.skills-slider').scrollIntoView({ behavior: 'smooth' });
    updateNav('skills');
};

// --- إدارة نافذة التواصل (Contact Modal) ---
const modal = document.getElementById("contactModal");
const contactBtn = document.querySelector(".contact-btn");
const closeBtn = document.querySelector(".close-btn");

contactBtn.onclick = () => {
    modal.style.display = "flex";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- تحديث اللون تلقائياً عند السكرول (Scroll Spy) ---
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills-slider');
    const sectionTop = skillsSection.offsetTop;
    const scrollPosition = window.scrollY + 150; // هامش لتحديد الدقة

    if (scrollPosition >= sectionTop) {
        updateNav('skills');
    } else {
        updateNav('about');
    }
}

);

document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    projects.forEach(project => observer.observe(project));
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. إدارة المودال (النافذة المنبثقة)
    const modal = document.getElementById("contactModal");
    const contactBtns = document.querySelectorAll(".contact-btn"); // سيطبق على كل زر تواصل
    const closeBtn = document.querySelector(".close-btn");

    // فتح المودال عند الضغط على أي زر تواصل
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // منع التمرير
        });
    });

    // إغلاق المودال عند الضغط على زر الإغلاق
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    // إغلاق المودال عند الضغط في أي مكان خارج المحتوى
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // 2. أنيميشن ظهور المشاريع عند السكرول (Scroll Reveal)
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // تشغيل الأنيميشن مرة واحدة فقط
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });
});