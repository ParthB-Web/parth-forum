// Create Starry Background
function createStars() {
  const starCount = 200;
  const starsContainer = document.getElementById('stars');
  
  if (!starsContainer) return;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 4 + 2}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

// Interactive Click Ripple Effect
function createRippleEffect() {
  document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(192, 165, 123, 0.3), transparent);
      transform: scale(0);
      animation: ripple-animation 0.8s linear;
      pointer-events: none;
      width: 60px;
      height: 60px;
      left: ${e.pageX - 30}px;
      top: ${e.pageY - 30}px;
      z-index: 1000;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);
  });
}

// Initialize cosmic effects
document.addEventListener('DOMContentLoaded', function() {
  createStars();
  createRippleEffect();
  
  // Add CSS animation for ripples
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