/* ============================================
   ASHISH KUMAR - Projects Page JavaScript
   Slider, Read More, Scroll Reveal, Navbar,
   Category Filters, Image Zoom Modal
   ============================================ */

// --- Page Loader ---
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.classList.add('loaded');
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

// --- Navbar Hamburger ---
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
})();

// --- Category Filters ---
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.project-category');

  if (!filterBtns.length || !categories.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      categories.forEach(section => {
        if (filter === 'all' || section.dataset.category === filter) {
          section.classList.remove('hidden');
          // Re-trigger reveal animations
          section.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('visible'));
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });
})();

// --- Image Sliders with Dot Indicators ---
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider-container');

  sliders.forEach(container => {
    const slider = container.querySelector('.image-slider');
    const leftBtn = container.querySelector('.left-btn');
    const rightBtn = container.querySelector('.right-btn');
    const dotsContainer = container.querySelector('.slider-dots');
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;

    // Create dots
    if (dotsContainer && images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
      updateDots();
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        goToSlide(currentIndex);
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
      });
    }
  });
});

// --- Read More Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const desc = btn.previousElementSibling;
      if (!desc) return;
      desc.classList.toggle('expanded');
      btn.textContent = desc.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });
});

// --- Scroll Reveal ---
(function() {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// --- 3D Tilt Effect on Project Cards ---
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// --- Image Zoom Modal (for slider images) ---
(function() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal || !modalImg) return;

  // Make slider images zoomable
  document.querySelectorAll('.image-slider img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.classList.add('open');
      modalImg.src = img.src;
      if (modalCaption) modalCaption.textContent = img.alt;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
