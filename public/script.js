// js/script.js - smooth scroll, navbar toggle, scroll animations (fade-in)

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Hamburger menu toggle ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ---------- Close mobile menu when a link is clicked ----------
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // only if it's a same-page anchor
      if (link.getAttribute('href').startsWith('#')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // ---------- Smooth scrolling for internal anchor links ----------
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // ignore empty hashes
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault(); // only prevent if element exists
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---------- Fade-in on scroll (Intersection Observer) ----------
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // optional: stop observing after appear
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // ---------- small extra: active nav highlight while scrolling (optional) ----------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset for fixed navbar
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active-nav');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active-nav');
      }
    });
  });

  // Add a tiny style for active nav (can be also in CSS)
  const style = document.createElement('style');
  style.innerHTML = `
    .nav-link.active-nav {
      color: #5f9ef0;
      font-weight: 600;
      border-bottom: 2px solid #5f9ef0;
    }
  `;
  document.head.appendChild(style);

  const typedName = document.getElementById('typed-name');
  const nameText = 'Vedant Ralekar';

  if (typedName) {
    let index = 0;
    let isDeleting = false;

    const animateName = () => {
      if (!isDeleting) {
        typedName.textContent = nameText.slice(0, index + 1);
        index += 1;

        if (index >= nameText.length) {
          isDeleting = true;
          setTimeout(animateName, 1200);
          return;
        }
      } else {
        typedName.textContent = nameText.slice(0, index - 1);
        index -= 1;

        if (index <= 0) {
          isDeleting = false;
          setTimeout(animateName, 300);
          return;
        }
      }

      setTimeout(animateName, isDeleting ? 75 : 120);
    };

    setTimeout(animateName, 350);
  }
});
// Live terminal code cycling
const terminalOutput = document.getElementById('terminal-output');
if (terminalOutput) {
  const messages = [
    { type: 'success', symbol: '>', text: 'backend systems ready' },
    { type: 'success', symbol: '>', text: 'connected to MongoDB Atlas' },
    { type: 'warn', symbol: '!', text: 'retrieving RAG context...' },
    { type: 'success', symbol: '>', text: 'deploying scalable APIs' },
    { type: 'success', symbol: '>', text: 'Redis cache hit ratio: 98%' },
    { type: 'warn', symbol: '>', text: 'processing DSA solutions...' }
  ];

  let index = 0;

  const addTerminalLine = (entry) => {
    const line = document.createElement('div');
    line.className = `output-line ${entry.type}`;
    line.innerHTML = `<span class="symbol">${entry.symbol}</span><span><strong>${entry.text}</strong></span>`;
    terminalOutput.prepend(line);

    while (terminalOutput.children.length > 5) {
      terminalOutput.removeChild(terminalOutput.lastChild);
    }
  };

  messages.forEach((message, i) => {
    setTimeout(() => addTerminalLine(message), i * 400);
  });

  setInterval(() => {
    index = (index + 1) % messages.length;
    addTerminalLine(messages[index]);
  }, 2200);
}

// Feedback form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // stop page reload
    // Here you would normally send data to a server
    // For demo, just show a success message
    alert('Thanks for your message! (This is a demo – your message was not actually sent.)');
    contactForm.reset(); // optional: clear form
  });
}

// Resume preview modal
const resumeBtn = document.querySelector('.resume-btn');
const resumeModal = document.getElementById('resume-modal');
const modalClose = document.querySelector('.modal-close');

if (resumeBtn && resumeModal && modalClose) {
  resumeBtn.addEventListener('click', () => {
    resumeModal.classList.add('show');
    resumeModal.setAttribute('aria-hidden', 'false');
  });

  modalClose.addEventListener('click', () => {
    resumeModal.classList.remove('show');
    resumeModal.setAttribute('aria-hidden', 'true');
  });

  resumeModal.addEventListener('click', (event) => {
    if (event.target === resumeModal) {
      resumeModal.classList.remove('show');
      resumeModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Theme toggle (dark/light mode)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Update icon
  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});