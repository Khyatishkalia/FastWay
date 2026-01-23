/**
 * HealthCare Solutions - Main JavaScript
 * Interactive functionality for the healthcare website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initTestimonialsSlider();
  initCounterAnimation();
  initSmoothScroll();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile dropdown toggle
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
}

/**
 * Scroll effects (Back to top, animations)
 */
function initScrollEffects() {
  const backToTop = document.getElementById('backToTop');

  // Back to top button visibility
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll animations using Intersection Observer
  const animatedElements = document.querySelectorAll(
    '.service-card, .specialty-card, .process-step, .about-feature, .stat-card, .contact-item'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Testimonials slider
 */
function initTestimonialsSlider() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let currentIndex = 0;
  let autoSlideInterval;

  if (testimonialCards.length === 0) return;

  function showTestimonial(index) {
    // Remove active class from all
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
  }

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
      resetAutoSlide();
    });
  });

  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();

  // Pause on hover
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
  }
}

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }
}


/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Parallax effect for hero section (subtle)
 */
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-content');

    // Only apply subtle parallax for first 300px of scroll to prevent overlap with white section
    if (heroContent && scrolled < 300) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = 1 - (scrolled / 600) * 0.3;
    }
  }
});

/**
 * Lazy loading for images
 */
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

/**
 * Form input animations
 */
document.addEventListener('DOMContentLoaded', function() {
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

  formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Check if already has value
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
});

/**
 * Service card hover effects
 */
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card:not(.featured)');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--primary-color)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.borderColor = 'var(--border-color)';
    });
  });
});
