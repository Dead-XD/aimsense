document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Magnetic Elements
  // ==========================================
  const magneticEls = document.querySelectorAll('.magnetic-el');

  if (window.matchMedia("(pointer: fine)").matches) {
    // Magnetic effect
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3; // magnetic pull strength
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        
        gsap.to(el, { x: x, y: y, duration: 0.3, ease: "power2.out" });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });
  }

  // ==========================================
  // 2. Navbar Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. GSAP Scroll Animations
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // Fade Up Elements
  const fadeUpEls = document.querySelectorAll('.fade-up');
  fadeUpEls.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Trigger when element is 85% down viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Number Counter Animation
  const counters = document.querySelectorAll('.stat-val.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 90%",
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          onUpdate: function() {
            counter.innerHTML = Math.ceil(this.targets()[0].innerHTML).toLocaleString();
          }
        });
      },
      once: true
    });
  });

  // Showcase 3D Parallax effect on mouse move
  const showcaseContainer = document.querySelector('.showcase-container');
  const mockupWindow = document.querySelector('.mockup-window');
  
  if (showcaseContainer && mockupWindow && window.matchMedia("(pointer: fine)").matches) {
    showcaseContainer.addEventListener('mousemove', (e) => {
      const rect = showcaseContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Tilt effect
      gsap.to(mockupWindow, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    showcaseContainer.addEventListener('mouseleave', () => {
      gsap.to(mockupWindow, {
        rotateY: 0,
        rotateX: 5, // return to default slight tilt
        duration: 1,
        ease: "power3.out"
      });
    });
  }

  // ==========================================
  // 4. Pricing Toggle Logic
  // ==========================================
  const toggleSwitch = document.querySelector('.toggle-switch');
  const amounts = document.querySelectorAll('.amount-val');
  const periods = document.querySelectorAll('.period');
  let isLifetime = false;

  if (toggleSwitch) {
    toggleSwitch.addEventListener('click', () => {
      isLifetime = !isLifetime;
      
      // Update UI
      const spans = document.querySelectorAll('.billing-toggle span:not(.discount-badge)');
      spans[0].classList.toggle('active', !isLifetime);
      spans[1].classList.toggle('active', isLifetime);
      
      gsap.to(toggleSwitch, {
        '--switch-left': isLifetime ? '28px' : '4px',
        duration: 0.3,
        onUpdate: function() {
          // Manually update the pseudo element via CSS variable (fallback to direct styling)
          toggleSwitch.style.setProperty('--switch-left', this.targets()[0].style.getPropertyValue('--switch-left'));
        }
      });
      // Fallback for pseudo-element animation
      const afterRule = document.createElement('style');
      afterRule.innerHTML = `.toggle-switch::after { left: ${isLifetime ? '28px' : '4px'} !important; }`;
      document.head.appendChild(afterRule);

      // Update Prices (Example logic)
      amounts.forEach((el, index) => {
        let basePrice = [5, 15, 25][index];
        let newPrice = isLifetime ? (basePrice * 12 * 0.8) : basePrice; // 20% discount for lifetime
        
        gsap.to(el, {
          innerHTML: newPrice,
          duration: 0.5,
          snap: { innerHTML: 1 },
          onUpdate: function() {
            el.innerHTML = Math.ceil(this.targets()[0].innerHTML);
          }
        });
      });

      periods.forEach(el => {
        el.innerText = isLifetime ? '/life' : '/mo';
      });
    });
  }

  // ==========================================
  // 5. Three.js Particle Background
  // ==========================================
  function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 400 : 900;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      // spread particles over a large area
      posArray[i] = (Math.random() - 0.5) * 150; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Use a custom shader material for soft glowing particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xa855f7, // Primary Purple
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction for particles
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Gentle rotation
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02;

      // Mouse interaction
      if (mouseX > 0) {
        particlesMesh.rotation.x += (mouseY * 0.00005 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX * 0.00005 - particlesMesh.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    }
    
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  // Initialize ThreeJS
  initThreeJS();

  // ==========================================
  // 6. Discord Modal Logic
  // ==========================================
  const discordModal = document.getElementById('discord-modal');
  const modalCancel = document.getElementById('modal-cancel');
  const modalConfirm = document.getElementById('modal-confirm');
  const discordLink = "https://discord.com/invite/hgK7rpBPvB";

  function openDiscordModal(e) {
    if(e) e.preventDefault();
    discordModal.classList.add('active');
  }

  function closeDiscordModal() {
    discordModal.classList.remove('active');
  }

  if(modalCancel) modalCancel.addEventListener('click', closeDiscordModal);
  if(modalConfirm) modalConfirm.addEventListener('click', () => {
    window.open(discordLink, '_blank');
    closeDiscordModal();
  });

  // Attach to all discord links
  document.querySelectorAll('.discord-link').forEach(btn => {
    btn.addEventListener('click', openDiscordModal);
  });

});
