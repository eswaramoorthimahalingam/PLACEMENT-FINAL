// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 2000);
});

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Hero Background Carousel
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function nextHeroSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}

// Auto-advance hero slides every 5 seconds
setInterval(nextHeroSlide, 5000);

// Counter Animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const numberElement = counter.querySelector('.stat-number');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 95) {
                    numberElement.textContent = Math.ceil(current) + '%';
                } else {
                    numberElement.textContent = Math.ceil(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 95) {
                    numberElement.textContent = target + '%';
                } else {
                    numberElement.textContent = target + '+';
                }
            }
        };
        
        updateCounter();
    });
}

// Progress Circle Animation
function animateProgressCircle() {
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const percentage = progressCircle.getAttribute('data-percentage');
        progressCircle.style.setProperty('--percentage', percentage);
    }
}

// Gallery Carousel
class GalleryCarousel {
    constructor() {
        this.carousel = document.getElementById('galleryCarousel');
        this.track = document.getElementById('galleryTrack');
        this.slides = document.querySelectorAll('.gallery-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('galleryIndicators');
        
        this.currentIndex = 0;
        this.slideWidth = 100;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.bindEvents();
        this.startAutoPlay();
        this.updateCarousel();
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = document.querySelectorAll('.indicator');
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Pause auto-play on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Image Modal
class ImageModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeModal');
        this.prevBtn = document.getElementById('modalPrev');
        this.nextBtn = document.getElementById('modalNext');
        
        this.images = [];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupAlbumItems();
    }
    
    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    }
    
    setupAlbumItems() {
        const albumItems = document.querySelectorAll('.album-item');
        
        albumItems.forEach((item, index) => {
            const img = item.querySelector('img');
            this.images.push(img.src);
            
            item.addEventListener('click', () => {
                this.open(index);
            });
        });
    }
    
    open(index) {
        this.currentIndex = index;
        this.modalImage.src = this.images[this.currentIndex];
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            
            if (entry.target.classList.contains('progress-circle')) {
                animateProgressCircle();
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery carousel
    new GalleryCarousel();
    
    // Initialize image modal
    new ImageModal();
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const elements = section.querySelectorAll('.section-header, .about-card, .session-card, .team-card, .blog-card, .info-card');
        elements.forEach((el, elIndex) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${elIndex * 0.1}s`;
        });
    });
    
    // Special animations for hero stats and progress circle
    const heroStats = document.querySelector('.hero-stats');
    const progressCircle = document.querySelector('.progress-circle');
    
    if (heroStats) {
        observer.observe(heroStats);
    }
    
    if (progressCircle) {
        observer.observe(progressCircle);
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--secondary-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Card Hover Effects with 3D Transform
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.session-card, .team-card, .blog-card, .album-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        // Add mouse move effect for 3D tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
});

// Add click handlers for session cards
document.querySelectorAll('.session-card .play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a simple modal for video demonstration
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        videoContainer.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #1f2937;">Session Video</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Video content would be displayed here</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        `;
        
        modal.appendChild(videoContainer);
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            videoContainer.style.transform = 'scale(1)';
        }, 10);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Enhanced form validation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation logic
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (fieldType === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add CSS for error styling
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(style);

// Advanced scroll animations
const advancedScrollAnimations = () => {
    const elements = document.querySelectorAll('.session-card, .team-card, .about-card, .album-item');
    
    elements.forEach((element, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) rotateX(10deg)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        observer.observe(element);
    });
};

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', advancedScrollAnimations);

// Real-time updates for dynamic content
function updateDynamicContent() {
    // Update timestamps
    const timestamps = document.querySelectorAll('[data-timestamp]');
    timestamps.forEach(element => {
        const timestamp = element.getAttribute('data-timestamp');
        const date = new Date(timestamp);
        element.textContent = date.toLocaleDateString();
    });
    
    // Update counters with real-time data
    const liveCounters = document.querySelectorAll('[data-live-counter]');
    liveCounters.forEach(counter => {
        const type = counter.getAttribute('data-live-counter');
        // Simulate real-time data updates
        const currentValue = parseInt(counter.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3);
        counter.textContent = newValue;
    });
}

// Update dynamic content every 30 seconds
setInterval(updateDynamicContent, 30000);

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Add smooth transition effect
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0.8';
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                    }, 300);
                }, 100);
            }
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', initPageTransitions);