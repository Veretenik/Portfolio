// ===== SMOOTH SCROLLING NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PROJECT CARD CLICK HANDLERS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectName = this.getAttribute('data-project');
        console.log('Clicked project:', projectName);
        // Future: Add modal or navigation to project detail page
        // window.location.href = `/projects/${projectName}.html`;
    });
});

// ===== PARALLAX SCROLLING FOR GALLERY =====
const galleryContainer = document.querySelector('.gallery-container');
const galleryWrapper = document.querySelector('.gallery-wrapper');

if (galleryContainer && galleryWrapper) {
    let scrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const gallerySection = document.querySelector('.gallery-section');
        if (!gallerySection) return;
        
        const sectionRect = gallerySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if gallery section is in viewport
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
            // Calculate scroll progress (0 to 1)
            const scrollProgress = 1 - (sectionRect.top / (windowHeight + sectionRect.height));
            
            // Calculate horizontal offset based on scroll progress
            // More scrolling down = more shift to the left
            const maxOffset = galleryContainer.scrollWidth - galleryWrapper.clientWidth;
            const offset = -scrollProgress * maxOffset;
            
            // Apply the transform
            galleryContainer.style.setProperty('--scroll-offset', `${offset}px`);
            galleryContainer.style.transform = `translateX(${offset}px)`;
        }
    });
}

// ===== HERO ANIMATION FALLBACK =====
// In case the MP4 doesn't load, show a fallback
const heroVideo = document.querySelector('.hero-animation');
if (heroVideo) {
    heroVideo.addEventListener('error', function() {
        console.warn('Video failed to load');
        this.style.backgroundColor = '#000';
    });
}

// ===== BUTTON ACTIVE STATE ON SCROLL =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-target') === sectionId) {
                    btn.classList.add('active');
                }
            });
        }
    });
});

console.log('Portfolio JS loaded successfully');
