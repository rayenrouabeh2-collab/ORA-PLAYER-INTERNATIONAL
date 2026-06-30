(function() {
  // ========== PARTICLE CANVAS BACKGROUND ==========
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 130, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles(count = 90) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(90);
  });

  resizeCanvas();
  createParticles(90);
  animateParticles();

  // ========== DYNAMIC PRICING INSERTION ==========
  const pricingData = [
    {
      name: '⚡ V12 ULTRA STABLE',
      plans: [
        { duration: '3 Months', price: '€15' },
        { duration: '6 Months', price: '€22' },
        { duration: '12 Months', price: '€35', extra: '+FREE ORA Player' },
        { duration: '24 Months', price: '€60' }
      ],
      whatsappMsg: 'Hello%20ORA%20HUB%20INTERNATIONAL%2C%20I%20would%20like%20to%20order%20the%20V12%20Ultra%20Stable%2012-Month%20Plan.'
    },
    {
      name: '🚀 ULTRA 4K LINE (NÉO 4K)',
      plans: [
        { duration: '3 Months', price: '€15' },
        { duration: '6 Months', price: '€22' },
        { duration: '12 Months', price: '€35', extra: '+FREE ORA Player' },
        { duration: '24 Months', price: '€60' }
      ],
      whatsappMsg: 'Hello%20ORA%20HUB%20INTERNATIONAL%2C%20I%20would%20like%20to%20order%20the%20Ultra%204K%2012-Month%20Plan.'
    },
    {
      name: '🥇 PREMIUM SPORTS (TREXX)',
      plans: [
        { duration: '3 Months', price: '€18' },
        { duration: '6 Months', price: '€28' },
        { duration: '12 Months', price: '€45', extra: '+FREE ORA Player' },
        { duration: '24 Months', price: '€80' }
      ],
      whatsappMsg: 'Hello%20ORA%20HUB%20INTERNATIONAL%2C%20I%20would%20like%20to%20order%20the%20Premium%20Sports%2024-Month%20Plan.'
    },
    {
      name: '💎 STRONG 8K (STRONG 8K)',
      plans: [
        { duration: '3 Months', price: '€18' },
        { duration: '6 Months', price: '€28' },
        { duration: '12 Months', price: '€45', extra: '+FREE ORA Player' },
        { duration: '24 Months', price: '€80' }
      ],
      whatsappMsg: 'Hello%20ORA%20HUB%20INTERNATIONAL%2C%20I%20would%20like%20to%20order%20the%20Strong%208K%2012-Month%20Plan.'
    },
    {
      name: '👑 ULTIMATE VIP (KING 365)',
      plans: [
        { duration: '3 Months', price: '€22' },
        { duration: '6 Months', price: '€35' },
        { duration: '12 Months', price: '€55', extra: '+FREE ORA Player' },
        { duration: '24 Months', price: '€95' }
      ],
      whatsappMsg: 'Hello%20ORA%20HUB%20INTERNATIONAL%2C%20I%20would%20like%20to%20order%20the%20Ultimate%20VIP%2012-Month%20Plan.',
      isPopular: true
    }
  ];

  const container = document.getElementById('pricingContainer');
  if (container) {
    container.innerHTML = '';
    pricingData.forEach(item => {
      const card = document.createElement('div');
      card.className = `plan-card glass-card ${item.isPopular ? 'most-popular' : ''}`;
      
      let plansHtml = '';
      item.plans.forEach(p => {
        plansHtml += `
          <div style="margin:6px 0;">
            <span class="price">${p.price}</span>
            <span class="duration"> /${p.duration}</span>
            ${p.extra ? `<span class="badge" style="margin-left:6px;">${p.extra}</span>` : ''}
          </div>
        `;
      });

      card.innerHTML = `
        <h3 style="font-size:1.5rem; margin-bottom:8px;">
          ${item.name} 
          ${item.isPopular ? '<span class="badge" style="background:#ff9f43;">Most Popular</span>' : ''}
        </h3>
        ${plansHtml}
        <a href="https://wa.me/21655426574?text=${item.whatsappMsg}" target="_blank" class="btn whatsapp-order" style="margin-top:18px;">
          <i class="fab fa-whatsapp"></i> Order via WhatsApp
        </a>
      `;
      container.appendChild(card);
    });
  }

  // ========== INTERACTIVE TIMELINE ANIMATION ==========
  const steps = document.querySelectorAll('.step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  steps.forEach((step, idx) => {
    step.style.transitionDelay = `${idx * 0.15}s`;
    observer.observe(step);
  });

  // Trigger visibility on load for visible steps
  setTimeout(() => {
    steps.forEach(s => {
      if (s.getBoundingClientRect().top < window.innerHeight) {
        s.style.opacity = 1;
        s.style.transform = 'translateY(0)';
      }
    });
  }, 200);

  // ========== FLOATING BUTTONS PULSE EFFECT ==========
  const trialBtn = document.getElementById('trialBtn');
  const waBtn = document.getElementById('whatsappBtn');
  
  if (trialBtn) {
    trialBtn.addEventListener('mouseenter', () => trialBtn.style.transform = 'scale(1.15)');
    trialBtn.addEventListener('mouseleave', () => trialBtn.style.transform = 'scale(1)');
  }
  
  if (waBtn) {
    waBtn.addEventListener('mouseenter', () => waBtn.style.transform = 'scale(1.15)');
    waBtn.addEventListener('mouseleave', () => waBtn.style.transform = 'scale(1)');
  }

  console.log('✨ ORA HUB INTERNATIONAL | Premium experience activated.');
})();