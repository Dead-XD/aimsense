// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX - 10 + 'px';
  cursorGlow.style.top = e.clientY - 10 + 'px';
  cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
});

// Smooth scrolling for navigation links
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

// View Features button functionality
const viewFeaturesBtn = document.getElementById('viewFeaturesBtn');
if (viewFeaturesBtn) {
  viewFeaturesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .support-card, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Enhanced floating particles animation
function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = Math.random() * 6 + 3 + 'px';
  particle.style.height = particle.style.width;
  
  // Random particle colors
  const colors = ['#00d4ff', '#7c3aed', '#ff6b35'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = '100%';
  particle.style.pointerEvents = 'none';
  particle.style.filter = 'blur(1px)';
  particle.style.animation = `particleFloat ${Math.random() * 15 + 15}s linear infinite`;
  
  document.querySelector('.floating-particles').appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 30000);
}

// Create particles periodically
setInterval(createParticle, 1500);

// Add enhanced particle float animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(0) rotate(0deg) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
      transform: scale(1);
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Modal functionality
const modal = document.getElementById('downloadModal');
const downloadBtns = document.querySelectorAll('.download-btn, .btn-primary, .nav-cta, .pricing-btn');
const closeModal = document.querySelector('.modal-close');

// Show modal when download buttons are clicked
downloadBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeDownloadModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeDownloadModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeDownloadModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeDownloadModal();
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Enhanced typing effect for hero title
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

// Enhanced glitch effect for logo
const logo = document.querySelector('.logo-text');
logo.addEventListener('mouseenter', () => {
  logo.style.animation = 'glitch 0.5s ease-in-out, gradientShift 4s ease-in-out infinite';
});

logo.addEventListener('animationend', () => {
  logo.style.animation = 'gradientShift 4s ease-in-out infinite';
});

// Add enhanced glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
  }
`;
document.head.appendChild(glitchStyle);

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  
  updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      const text = statNumber.textContent;
      
      if (text.includes('75K+')) {
        animateCounter(statNumber, 75000);
        setTimeout(() => {
          statNumber.textContent = '75K+';
        }, 2000);
      } else if (text.includes('99.9%')) {
        let count = 0;
        const interval = setInterval(() => {
          count += 0.1;
          statNumber.textContent = count.toFixed(1) + '%';
          if (count >= 99.9) {
            clearInterval(interval);
            statNumber.textContent = '99.9%';
          }
        }, 20);
      }
      
      statsObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// Enhanced parallax effect for hero shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.2);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add smooth reveal animations for sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section-header, .download-content, .support-card').forEach(el => {
  revealObserver.observe(el);
});

// Add reveal animation styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .section-header,
  .download-content,
  .support-card {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .section-header.revealed,
  .download-content.revealed,
  .support-card.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

// Enhanced button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-btn, .download-btn, .support-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});

// Add dynamic background gradient animation
const backgroundEffects = document.querySelector('.background-effects');
let gradientAngle = 0;

function animateBackground() {
  gradientAngle += 0.5;
  backgroundEffects.style.filter = `hue-rotate(${gradientAngle}deg)`;
  requestAnimationFrame(animateBackground);
}

animateBackground();

console.log('🎯 AimSense v2.0 loaded successfully! Enhanced with premium features and design.');
