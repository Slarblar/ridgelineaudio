// ===== PORTFOLIO FILTERING =====
class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    this.init();
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        this.filterItems(filter);
        this.updateActiveButton(e.target);
      });
    });
  }

  filterItems(filter) {
    this.portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category');
      const shouldShow = filter === 'all' || categories.includes(filter);

      if (shouldShow) {
        item.classList.remove('hidden');
        item.classList.add('filter-in');
        // Remove animation class after animation completes
        setTimeout(() => {
          item.classList.remove('filter-in');
        }, 500);
      } else {
        item.classList.add('hidden');
        item.classList.remove('filter-in');
      }
    });
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
}

// ===== PORTFOLIO LIGHTBOX =====
class PortfolioLightbox {
  constructor() {
    this.lightbox = null;
    this.createLightbox();
    this.init();
  }

  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(this.lightbox);
  }

  init() {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    const closeButton = this.lightbox.querySelector('.lightbox-close');
    const lightboxImg = this.lightbox.querySelector('img');

    portfolioImages.forEach(img => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        const src = img.getAttribute('data-src') || img.src;
        const alt = img.getAttribute('alt');
        
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        this.openLightbox();
      });
    });

    closeButton.addEventListener('click', () => {
      this.closeLightbox();
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });
  }

  openLightbox() {
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== PORTFOLIO STATS ANIMATION =====
class PortfolioStats {
  constructor() {
    this.statsNumbers = document.querySelectorAll('.stat-number');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateNumber(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });

      this.statsNumbers.forEach(number => {
        observer.observe(number);
      });
    }
  }

  animateNumber(element) {
    const finalNumber = element.textContent;
    const isPercentage = finalNumber.includes('%');
    const isPlus = finalNumber.includes('+');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50; // Animation duration control
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current);
      if (isPlus) displayValue += '+';
      if (isPercentage) displayValue += '%';
      
      element.textContent = displayValue;
    }, 30);
  }
}

// ===== PORTFOLIO MASONRY LAYOUT =====
class PortfolioMasonry {
  constructor() {
    this.grid = document.querySelector('.gallery-grid');
    this.items = document.querySelectorAll('.portfolio-item');
    this.init();
  }

  init() {
    // Only apply masonry on larger screens
    if (window.innerWidth > 768) {
      this.setupMasonry();
      window.addEventListener('resize', this.debounce(() => {
        this.setupMasonry();
      }, 250));
    }
  }

  setupMasonry() {
    // Reset any existing styles
    this.items.forEach(item => {
      item.style.position = '';
      item.style.top = '';
      item.style.left = '';
    });

    if (window.innerWidth <= 768) return;

    // Simple masonry logic
    const columns = this.getColumnCount();
    const columnHeights = new Array(columns).fill(0);
    const itemWidth = this.grid.offsetWidth / columns;

    this.items.forEach((item, index) => {
      if (item.classList.contains('hidden')) return;

      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const x = shortestColumn * itemWidth;
      const y = columnHeights[shortestColumn];

      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.width = `${itemWidth - 20}px`; // Account for gap

      columnHeights[shortestColumn] += item.offsetHeight + 20; // Add gap
    });

    // Set container height
    this.grid.style.height = `${Math.max(...columnHeights)}px`;
  }

  getColumnCount() {
    const containerWidth = this.grid.offsetWidth;
    if (containerWidth > 1200) return 3;
    if (containerWidth > 800) return 2;
    return 1;
  }

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
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioFilter();
  new PortfolioLightbox();
  new PortfolioStats();
  
  // Initialize masonry after images load
  const images = document.querySelectorAll('.portfolio-image img');
  let loadedImages = 0;
  
  const checkAllImagesLoaded = () => {
    loadedImages++;
    if (loadedImages === images.length) {
      new PortfolioMasonry();
    }
  };

  images.forEach(img => {
    if (img.complete) {
      checkAllImagesLoaded();
    } else {
      img.addEventListener('load', checkAllImagesLoaded);
      img.addEventListener('error', checkAllImagesLoaded);
    }
  });

  // Fallback if no images
  if (images.length === 0) {
    new PortfolioMasonry();
  }
});

// Export for use in other modules
export { PortfolioFilter, PortfolioLightbox, PortfolioStats, PortfolioMasonry }; 