// ===== SMOOTH SCROLL NAVIGATION =====
class SmoothNavigation {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupScrollToTop();
    this.handleActiveStates();
  }

  setupNavigation() {
    // Handle all anchor links for smooth scrolling
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          this.closeMobileMenu();
          
          // Update URL without scroll
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  }

  setupScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      });

      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  handleActiveStates() {
    // Update active navigation states on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    }
  }
}

// ===== LAZY LOADING =====
class LazyLoader {
  constructor() {
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.remove('lazy');
    img.classList.add('loaded');
  }

  loadAllImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.loadImage(img);
    });
  }
}

// ===== CONTACT FORM =====
class ContactForm {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const formData = new FormData(this.form);
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // For Netlify Forms (will be configured in HTML)
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        this.showSuccess();
        this.form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      this.showError();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccess() {
    this.showMessage('Thank you! Your message has been sent successfully.', 'success');
  }

  showError() {
    this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
  }

  showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and show new message
    const message = document.createElement('div');
    message.className = `form-message form-message-${type} glass-light`;
    message.textContent = text;
    message.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: var(--radius-md);
      text-align: center;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    `;

    this.form.appendChild(message);

    // Animate in
    requestAnimationFrame(() => {
      message.style.opacity = '1';
      message.style.transform = 'translateY(0)';
    });

    // Remove after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
        setTimeout(() => message.remove(), 300);
      }
    }, 5000);
  }
}

// ===== ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupScrollAnimations();
    }
  }

  setupScrollAnimations() {
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animateObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animateObserver.observe(el);
    });
  }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.preconnectToFonts();
    this.optimizeImages();
  }

  preconnectToFonts() {
    // Add preconnect for Google Fonts if used
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = '';
    document.head.appendChild(link2);
  }

  optimizeImages() {
    // Add loading="lazy" to images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
      // Don't lazy load images in the first viewport
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy';
      }
    });
  }
}

// ===== UTILITIES =====
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new SmoothNavigation();
  new LazyLoader();
  new ContactForm('#contact-form');
  new ScrollAnimations();
  new PerformanceOptimizer();

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
});

// Export for use in other modules
export { SmoothNavigation, LazyLoader, ContactForm, ScrollAnimations, Utils }; 