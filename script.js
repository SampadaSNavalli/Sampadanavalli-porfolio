/**
 * Sampada Navalli - UI/UX Designer & Product Designer Portfolio
 * Typing Effect, Stepline Interaction, Scroll Animations & Nav Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavbarScrollAndActive();
  initReadingProgressBar();
  initScrollAnimations();
  initBackToTop();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initMobileNav();
  initHeroTilt();
});

/* --------------------------------------------------------------------------
   Typing Effect for Hero Role Title
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typedTarget = document.getElementById('typedRole');
  if (!typedTarget) return;

  const roles = [
    "UI/UX Designer",
    "Product Designer",
    "Design System Specialist",
    "Enterprise UX Architect"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const holdDelay = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
   Reading Progress Bar at Top
   -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (docHeight || 1)) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        if (delay > 0) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
        } else {
          entry.target.classList.add('is-visible');
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Navbar Active Highlighting on Click and on Scroll
   -------------------------------------------------------------------------- */
function initNavbarScrollAndActive() {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('header[id], section[id]');

  // Scroll shrink effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // Instant Active Highlight on Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Dynamic Highlight on Scroll
  function highlightCurrentSection() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

function initMobileNav() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Hero Card Subtle Interactive Tilt
   -------------------------------------------------------------------------- */
function initHeroTilt() {
  const heroContainer = document.querySelector('.hero-preview-container');
  if (!heroContainer) return;

  heroContainer.addEventListener('mousemove', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * -8;
    const tiltY = (x / rect.width) * 8;
    heroContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });

  heroContainer.addEventListener('mouseleave', () => {
    heroContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/* --------------------------------------------------------------------------
   Back to Top Floating Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   Project Filtering Logic (Solid Active Button State)
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Project Case Studies Modal Data & Controller
   -------------------------------------------------------------------------- */
const caseStudiesData = {
  remittance: {
    title: "Remittance Processing & SAP Reconciliation Platform",
    client: "Aveenya Solutions (Jan 2024 - Present)",
    role: "UI/UX Designer & Product Designer",
    category: "Enterprise Fintech & Automation",
    image: "assets/images/project-remittance.svg",
    problem: "Customer Accounting teams struggled with manual multi-source payment data ingestion, slow invoice matching, and tedious manual posting into SAP, leading to reconciliation backlogs and high human error rates.",
    solution: "Designed an intelligent, end-to-end reconciliation platform that automates payment extraction, suggests confidence-scored matches, and triggers SAP-ready postings with 1-click batch approvals.",
    responsibilities: [
      "Conducted contextual inquiry interviews with enterprise accountants to map out complex matching heuristics.",
      "Engineered high-fidelity interactive Figma prototypes with auto-layout and responsive design systems.",
      "Designed real-time exception-handling interfaces allowing accountants to split, combine, and resolve unmatched transactions in seconds.",
      "Collaborated closely with front-end and SAP integration engineers using Swagger and Postman."
    ],
    impact: "Cut manual accounting effort by 65%, achieved 98.4% automated matching accuracy, and saved an estimated 20+ hours per week per team.",
    techStack: ["Figma", "HTML5/CSS3", "Bootstrap", "JavaScript", "Swagger", "Postman", "SAP API Workflows"]
  },
  bpm: {
    title: "Enterprise Business Process Management (BPM) Platform",
    client: "Aveenya Solutions (Jan 2024 - Present)",
    role: "UI/UX Designer & Product Designer",
    category: "Workflow Automation & Enterprise SaaS",
    image: "assets/images/project-bpm.svg",
    problem: "Cross-departmental approvals and service tickets were scattered across unmonitored email chains and spreadsheets, resulting in missed SLAs and lack of executive operational visibility.",
    solution: "Crafted a unified workflow automation suite featuring multi-tiered actioner/approver pipelines, visual status timelines, and real-time SLA countdown monitors.",
    responsibilities: [
      "Created wireframes and user journeys covering both frontline actioner submissions and executive approval gates.",
      "Built interactive dashboards featuring SLA compliance heatmaps and bottleneck detection alerts.",
      "Standardized form components, status badges, and data tables across 10+ internal enterprise modules.",
      "Participated in developer handoff and conducted User Acceptance Testing (UAT) sessions."
    ],
    impact: "Standardized 50+ business workflows, improved SLA adherence to 99.4%, and centralized multi-department audit logs.",
    techStack: ["Figma", "Design Systems", "HTML5", "CSS3", "Bootstrap", "JavaScript", "Jira", "Git"]
  },
  lowcode: {
    title: "Low-Code / No-Code Enterprise Application Builder",
    client: "Aveenya Solutions (Jan 2024 - Present)",
    role: "UI/UX Designer & Product Designer",
    category: "Low-Code / Developer Tools",
    image: "assets/images/project-lowcode.svg",
    problem: "Non-technical business teams relied heavily on IT backlogs to create simple internal tools, approval forms, and custom workflow dashboards.",
    solution: "Designed an intuitive drag-and-drop platform allowing non-technical domain experts to construct responsive web applications and data schemas with minimal code.",
    responsibilities: [
      "Designed an ergonomic canvas interface with draggable form controls, live preview modes, and property inspector panels.",
      "Defined interaction guidelines for complex drag-and-drop operations, nesting containers, and modal configuration flows.",
      "Created micro-interactions and visual states (hover, drag-over, error, success) for 25+ UI primitives.",
      "Validated usability with internal non-technical stakeholders to optimize cognitive load."
    ],
    impact: "Accelerated internal tool delivery cycles from weeks to hours, enabling business teams to self-serve custom tools.",
    techStack: ["Figma", "Adobe XD", "Wireframing", "Interaction Design", "Bootstrap", "JavaScript", "Bitbucket"]
  },
  vavve: {
    title: "Vavve Multi-Merchant Business Solution Platform",
    client: "Vavve Technologies (Apr 2022 - Jul 2023)",
    role: "Associate UI Engineer & Designer",
    category: "Multi-Merchant Commerce & Payments",
    image: "assets/images/project-vavve.svg",
    problem: "Merchants needed a cohesive, unified dashboard to manage diverse product catalogs, issue promotional gift cards/coupons, and track multi-channel VT payment settlements.",
    solution: "Created an all-in-one business management interface that unifies merchant onboarding, inventory, coupon lifecycle, invoice tracking, and payment telemetry.",
    responsibilities: [
      "Designed merchant management workflows covering registration, product listings, and digital coupon issuance.",
      "Built responsive, mobile-ready UI layouts using HTML5, CSS3, and Bootstrap.",
      "Implemented invoice tracking tables with quick filtering, date range pickers, and export utilities.",
      "Collaborated with backend engineers using Postman to verify API responses and data formats."
    ],
    impact: "Empowered 1,200+ merchants to manage over $8.9M in transactions with streamlined invoice reconciliation.",
    techStack: ["Figma", "HTML5", "CSS3", "Bootstrap", "JavaScript", "Postman", "Git"]
  },
  quiz: {
    title: "Employee Learning & Assessment Quiz Application",
    client: "Vraio Software Solutions (Jul 2021 - Mar 2022)",
    role: "Web Designer & UI Specialist",
    category: "EdTech & Corporate Training",
    image: "assets/images/project-quiz.svg",
    problem: "Employee corporate training lacked engagement, feedback loops, and objective performance metrics, leading to low completion rates.",
    solution: "Designed a gamified internal assessment portal featuring interactive quizzes, instant answer feedback, performance analytics, and milestone badges.",
    responsibilities: [
      "Designed clean, focused quiz interfaces that minimize test anxiety and cognitive strain.",
      "Created interactive progress bars, countdown timers, and immediate feedback states.",
      "Developed responsive layouts with Bootstrap ensuring seamless accessibility across tablets and desktops.",
      "Designed administrative reporting dashboards for HR and team leads to evaluate training ROI."
    ],
    impact: "Boosted training module completion rates by 45% and improved employee knowledge retention across departments.",
    techStack: ["HTML5", "CSS3", "Bootstrap", "Photoshop", "Canva", "JavaScript"]
  }
};

function initProjectModals() {
  const modalEl = document.getElementById('projectDetailModal');
  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  const triggerBtns = document.querySelectorAll('[data-case-study]');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyKey = btn.getAttribute('data-case-study');
      const data = caseStudiesData[studyKey];

      if (data) {
        document.getElementById('modalProjectTitle').textContent = data.title;
        document.getElementById('modalProjectCategory').textContent = data.category;
        document.getElementById('modalProjectClient').textContent = data.client;
        document.getElementById('modalProjectRole').textContent = data.role;
        document.getElementById('modalProjectImage').src = data.image;
        document.getElementById('modalProjectImage').alt = data.title;
        document.getElementById('modalProjectProblem').textContent = data.problem;
        document.getElementById('modalProjectSolution').textContent = data.solution;
        document.getElementById('modalProjectImpact').textContent = data.impact;

        // Populate Responsibilities
        const respList = document.getElementById('modalProjectResponsibilities');
        respList.innerHTML = '';
        data.responsibilities.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          respList.appendChild(li);
        });

        // Populate Tech Stack Tags
        const stackList = document.getElementById('modalProjectTechStack');
        stackList.innerHTML = '';
        data.techStack.forEach(tech => {
          const span = document.createElement('span');
          span.className = 'tag-badge';
          span.textContent = tech;
          stackList.appendChild(span);
        });

        modal.show();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Contact Form Validation & Submission Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showAlert('Please fill in all required fields.', 'warning');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showAlert('Please provide a valid email address.', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showAlert(`Thank you, ${name}! Your message has been sent successfully. I will get back to you promptly at ${email}.`, 'success');
      form.reset();
    }, 1200);
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.className = `alert alert-${type} glass-panel border-${type} mb-3`;
    alertBox.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i> ${msg}`;
    alertBox.classList.remove('d-none');
    
    setTimeout(() => {
      alertBox.classList.add('d-none');
    }, 6000);
  }
}
