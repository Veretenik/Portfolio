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
    });
});

// ===== HORIZONTAL SCROLL GALLERY ON VERTICAL SCROLL =====
(function() {
    // Get elements
    const section = document.getElementById('gallery');
    const container = document.querySelector('.gallery-container');
    
    if (!section || !container) {
        console.error('Gallery section or container not found!');
        return;
    }

    // Wait for images to load to get correct dimensions
    let imagesLoaded = 0;
    const images = container.querySelectorAll('img');
    const totalImages = images.length;

    function onAllImagesLoaded() {
        console.log('All images loaded, initializing scroll effect');
        
        // Get dimensions
        const containerWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = containerWidth - viewportWidth + 100; // Extra padding
        
        console.log('Container width:', containerWidth);
        console.log('Viewport width:', viewportWidth);
        console.log('Scroll distance:', scrollDistance);

        if (scrollDistance <= 0) {
            console.log('Content fits in viewport, no scroll needed');
            return;
        }

        // Scroll handler
        function handleScroll() {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Only animate when section is in view
            if (rect.bottom < 0 || rect.top > windowHeight) {
                return;
            }

            // Calculate progress: 0 when section enters, 1 when section leaves
            // Section enters when its top reaches bottom of viewport
            // Section leaves when its bottom reaches top of viewport
            const totalScrollRange = sectionHeight + windowHeight;
            const currentPosition = windowHeight - sectionTop;
            const progress = currentPosition / totalScrollRange;
            
            // Clamp progress between 0 and 1
            const clampedProgress = Math.min(Math.max(progress, 0), 1);
            
            // Calculate horizontal offset
            const xOffset = clampedProgress * scrollDistance;
            
            // Apply transform
            container.style.transform = 'translateX(' + (-xOffset) + 'px)';
        }

        // Add scroll listener
        document.addEventListener('scroll', handleScroll);
        
        // Run once on init
        handleScroll();
        
        // Recalculate on resize
        window.addEventListener('resize', function() {
            handleScroll();
        });
    }

    // Check if images are already loaded (cached)
    images.forEach(function(img) {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    onAllImagesLoaded();
                }
            });
            img.addEventListener('error', function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    onAllImagesLoaded();
                }
            });
        }
    });

    // If all images were already loaded
    if (imagesLoaded === totalImages) {
        onAllImagesLoaded();
    }
})();

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
