// Create Starry Background
const starCount = 200;
const starsContainer = document.getElementById('stars');

if (starsContainer) {
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

// Create Floating Cosmic Particles
function createCosmicParticle() {
  const particle = document.createElement('div');
  particle.classList.add('cosmic-particle');
  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 10000);
}

// Generate particles periodically
setInterval(createCosmicParticle, 3000);

// Interactive Click Ripple Effect
document.addEventListener('click', function(e) {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  const size = 60;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.pageX - size / 2) + 'px';
  ripple.style.top = (e.pageY - size / 2) + 'px';
  ripple.style.opacity = '0.6';
  
  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 800);
});

// Enhanced Navigation Card Interactions
document.querySelectorAll('.nav-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.02)';
    this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  });
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Cosmic Cursor Trail Effect
let mouseX = 0, mouseY = 0;
let trail = [];

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createTrail() {
  if (trail.length > 5) {
    trail[0].remove();
    trail.shift();
  }
  
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(192, 165, 123, 0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    left: ${mouseX}px;
    top: ${mouseY}px;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(dot);
  trail.push(dot);
  
  setTimeout(() => {
    dot.style.opacity = '0';
  }, 100);
  
  setTimeout(() => {
    if (dot.parentNode) {
      dot.remove();
    }
  }, 600);
}

setInterval(createTrail, 50);

// Parallax Effect for Cosmic Orbs
document.addEventListener('mousemove', function(e) {
  const orbs = document.querySelectorAll('.cosmic-orb');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 50;
    const y = (mouseY - 0.5) * speed * 50;
    orb.style.transform += ` translate(${x}px, ${y}px)`;
  });
});
