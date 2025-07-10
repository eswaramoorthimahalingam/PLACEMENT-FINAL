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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
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
    const cards = document.querySelectorAll('.session-card, .team-card, .blog-card');
    
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

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const titleLines = heroTitle.querySelectorAll('.title-line');
            titleLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }, 2500);
});

// Dynamic Background Colors
const sections = document.querySelectorAll('section');
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '#f9fafb',
    '#ffffff',
    '#f9fafb',
    '#ffffff',
    '#f9fafb'
];

// Smooth section transitions
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - windowHeight / 2 && 
            scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
            
            // Add active class to current section
            sections.forEach(s => s.classList.remove('active-section'));
            section.classList.add('active-section');
        }
    });
});

// Add smooth reveal animations
const revealElements = document.querySelectorAll('.session-card, .team-card, .blog-card, .info-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// Add click handlers for session cards
document.querySelectorAll('.session-card .play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your video/modal logic here
        console.log('Play button clicked');
        
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
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

// Add click handlers for team social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
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

// Particle System for Hero Background
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
        }
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// Advanced scroll animations
const advancedScrollAnimations = () => {
    const elements = document.querySelectorAll('.session-card, .team-card, .about-card');
    
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