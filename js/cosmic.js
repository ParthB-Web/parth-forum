// Enhanced performance with requestAnimationFrame
let isStarsCreated = false;

function createStars() {
  if (isStarsCreated) return;
  
  const starCount = 200;
  const starsContainer = document.getElementById('stars');
  
  if (!starsContainer) return;
  
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 4 + 2}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    fragment.appendChild(star);
  }
  
  starsContainer.appendChild(fragment);
  isStarsCreated = true;
}

// Throttled ripple effect
let rippleTimeout;
function createRippleEffect() {
  document.addEventListener('click', function(e) {
    if (rippleTimeout) return;
    
    rippleTimeout = setTimeout(() => {
      rippleTimeout = null;
    }, 100);
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    const size = 60;
    
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.pageX - size / 2}px;
      top: ${e.pageY - size / 2}px;
      opacity: 0.6;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 800);
  });
}

// Smooth scroll initialization
function initSmoothEffects() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Optimized initialization
document.addEventListener('DOMContentLoaded', function() {
  requestAnimationFrame(() => {
    createStars();
    createRippleEffect();
    initSmoothEffects();
  });
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
