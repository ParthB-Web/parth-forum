// Performance optimized JavaScript
let isStarsCreated = false;
let particleCount = 0;
const maxParticles = 8; // Reduced from unlimited

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimized star creation
function createStars() {
  if (isStarsCreated) return;
  
  const starCount = window.innerWidth < 768 ? 100 : 150; // Reduced for mobile
  const starsContainer = document.getElementById('stars');
  
  if (!starsContainer) return;
  
  // Use document fragment for performance
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
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

// Optimized particle creation with limits
function createCosmicParticle() {
  if (particleCount >= maxParticles) return;
  
  const particle = document.createElement('div');
  particle.className = 'cosmic-particle';
  const size = Math.random() * 3 + 2; // Slightly smaller
  
  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 4 + 3}s;
    animation-delay: ${Math.random() * 1}s;
  `;
  
  document.body.appendChild(particle);
  particleCount++;
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
      particleCount--;
    }
  }, 7000); // Reduced lifetime
}

// Throttled particle generation
const throttledCreateParticle = throttle(createCosmicParticle, 4000); // Slower generation
setInterval(throttledCreateParticle, 5000);

// Optimized ripple effect with limits
let rippleCount = 0;
const maxRipples = 3;

const throttledRipple = throttle(function(e) {
  if (rippleCount >= maxRipples) return;
  
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  const size = 50; // Smaller ripples
  
  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${e.pageX - size / 2}px;
    top: ${e.pageY - size / 2}px;
    opacity: 0.4;
  `;
  
  document.body.appendChild(ripple);
  rippleCount++;
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
      rippleCount--;
    }
  }, 600);
}, 150);

document.addEventListener('click', throttledRipple);

// Simplified navigation card interactions
document.querySelectorAll('.nav-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px) translateZ(0)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) translateZ(0)';
  });
});

// Optimized scroll observer
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

// Simplified cursor trail (reduced frequency)
let mouseX = 0, mouseY = 0;
let trailCount = 0;
const maxTrails = 3;

const throttledMouseMove = throttle(function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, 50); // Reduced frequency

document.addEventListener('mousemove', throttledMouseMove);

function createTrail() {
  if (trailCount >= maxTrails) return;
  
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: 3px;
    height: 3px;
    background: rgba(192, 165, 123, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    left: ${mouseX}px;
    top: ${mouseY}px;
    transform: translate(-50%, -50%) translateZ(0);
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(dot);
  trailCount++;
  
  setTimeout(() => {
    dot.style.opacity = '0';
  }, 50);
  
  setTimeout(() => {
    if (dot.parentNode) {
      dot.remove();
      trailCount--;
    }
  }, 350);
}

setInterval(createTrail, 100); // Less frequent

// Simplified orb parallax (reduced intensity)
const throttledParallax = throttle(function(e) {
  const orbs = document.querySelectorAll('.cosmic-orb');
  const mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5; // Reduced intensity
  const mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.2; // Reduced speed
    const x = mouseX * speed * 20;
    const y = mouseY * speed * 20;
    orb.style.transform = `translate(${x}px, ${y}px) translateZ(0)`;
  });
}, 16); // 60fps throttling

document.addEventListener('mousemove', throttledParallax);

// Initialize everything efficiently
document.addEventListener('DOMContentLoaded', function() {
  // Use requestAnimationFrame for smooth initialization
  requestAnimationFrame(() => {
    createStars();
    
    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  });
});

// Reduce effects on mobile for better performance
if (window.innerWidth < 768) {
  maxParticles = 3;
  clearInterval(throttledCreateParticle);
  setInterval(throttledCreateParticle, 8000); // Much slower on mobile
}
