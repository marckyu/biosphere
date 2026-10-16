/* ===== script.js ===== */
(function() {
  // ----- 20 Quiz Questions (with correct answer indices varied) -----
  const quizData = [
    { q: "What is biodiversity?", options: ["Variety of life on Earth", "Number of humans", "Only animal species", "Weather patterns"], correct: 0 },
    { q: "Which is a major driver of biodiversity loss?", options: ["Planting trees", "Habitat destruction", "Recycling", "Solar energy"], correct: 1 },
    { q: "How does biodiversity loss affect human health?", options: ["Improves air quality", "No effect", "Increases pandemic risk", "Increases food security"], correct: 2 },
    { q: "What is zoonotic spillover?", options: ["Ocean acidification", "Plant pollination", "Deforestation method", "Virus jumping from animals to humans"], correct: 3 },
    { q: "Which ecosystem is most threatened by blast fishing?", options: ["Deserts", "Coral reefs", "Grasslands", "Tundras"], correct: 1 },
    { q: "The Living Planet Report 2022 showed average decline in monitored wildlife populations of about:", options: ["10%", "25%", "68%", "90%"], correct: 2 },
    { q: "What is an ethical concern of gene drives for conservation?", options: ["They are too cheap", "Unintended ecological effects", "They increase biodiversity instantly", "No concerns"], correct: 1 },
    { q: "Which of these is an ecosystem service?", options: ["Deforestation", "Mining", "Overfishing", "Pollination"], correct: 3 },
    { q: "How does deforestation influence malaria?", options: ["Kills all mosquitoes", "Increases mosquito breeding sites", "No link", "Reduces malaria"], correct: 1 },
    { q: "What does agrobiodiversity refer to?", options: ["Urban farms", "GMO only", "Variety of crops and livestock", "Factory farming"], correct: 2 },
    { q: "Which international agreement targets biodiversity loss?", options: ["Paris Agreement only", "Kyoto Protocol", "Montreal Protocol", "Kunming-Montreal Global Biodiversity Framework"], correct: 3 },
    { q: "What is a key social issue related to biodiversity?", options: ["Stock market", "Environmental justice", "Space travel", "Cryptocurrency"], correct: 1 },
    { q: "How do coral reefs contribute to medicine?", options: ["No medical use", "Only tourism", "Provide compounds for drugs", "Used as fuel"], correct: 2 },
    { q: "Which is a direct human health benefit of biodiversity?", options: ["Increased pollution", "Spread of monocultures", "Loss of medicinal plants", "Access to diverse nutritious food"], correct: 3 },
    { q: "What percentage of emerging infectious diseases originate from animals?", options: ["~60%", "10%", "5%", "90%"], correct: 0 },
    { q: "Which is an example of an ethical perspective on biodiversity?", options: ["Only economic value matters", "Intrinsic value of species", "Humans own nature", "No moral duty"], correct: 1 },
    { q: "What is a pollinator?", options: ["Pesticide", "Fertilizer", "Bee, butterfly, etc.", "Tractor"], correct: 2 },
    { q: "How does climate change threaten biodiversity?", options: ["Increases all populations", "No effect", "Stops evolution", "Shifts species ranges"], correct: 3 },
    { q: "Which of the following is a case study in our article?", options: ["Urban gardening", "Renewable energy", "Amazon deforestation & malaria", "Space exploration"], correct: 2 },
    { q: "What is the primary goal of the BioSphere website?", options: ["Sell products", "Entertainment", "Political campaign", "Educate about biodiversity & health links"], correct: 3 }
  ];

  const quizContainer = document.getElementById('quizContainer');
  const resultDiv = document.getElementById('quiz-result');
  const submitBtn = document.getElementById('submitQuiz');
  const resetBtn = document.getElementById('resetQuiz');

  /* ===== THEME TOGGLE ===== */
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('biosphere-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('biosphere-theme', next);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('biosphere-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /* ===== WORKING SEARCH FILTER ===== */
  function initSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    const status = document.getElementById('searchStatus');
    if (!input || !status) return;

    const searchableSelectors = '.card, .case-card, .ethics-item, .visual-item, .staff-member';

    function runSearch() {
      const query = input.value.toLowerCase().trim();
      const items = document.querySelectorAll(searchableSelectors);

      status.classList.remove('visible');
      status.innerHTML = '';

      if (!query) {
        items.forEach(el => { el.style.display = ''; });
        return;
      }

      let visibleCount = 0;
      items.forEach(el => {
        const text = el.textContent.toLowerCase();
        const match = text.includes(query);
        el.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      status.classList.add('visible');
      if (visibleCount === 0) {
        status.innerHTML = `<i class="fas fa-search"></i> No results found for "<strong>${escapeHtml(query)}</strong>". <button class="clear-search" type="button">Clear search</button>`;
      } else {
        status.innerHTML = `<i class="fas fa-check-circle"></i> Found <strong>${visibleCount}</strong> result${visibleCount !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>". <button class="clear-search" type="button">Clear search</button>`;
      }

      const clearBtn = status.querySelector('.clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          runSearch();
          input.focus();
        });
      }
    }

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[c]);
    }

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runSearch, 200);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        runSearch();
      }
    });

    if (btn) {
      btn.addEventListener('click', () => {
        clearTimeout(debounceTimer);
        runSearch();
      });
    }
  }

  /* ----- Render quiz ----- */
  function renderQuiz() {
    let html = '';
    quizData.forEach((item, index) => {
      html += `
        <div class="quiz-question" data-qindex="${index}">
          <p>${index + 1}. ${item.q}</p>
          <div class="quiz-options">
            ${item.options.map((opt, optIndex) => `
              <label for="q${index}o${optIndex}">
                <input type="radio" id="q${index}o${optIndex}" name="q${index}" value="${optIndex}">
                ${opt}
              </label>
            `).join('')}
          </div>
          <div class="answer-feedback" id="feedback-${index}"></div>
        </div>
      `;
    });
    quizContainer.innerHTML = html;
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
  }

  /* ----- Evaluate quiz ----- */
  function evaluateQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let answeredAll = true;

    for (let i = 0; i < questions.length; i++) {
      const radios = document.getElementsByName(`q${i}`);
      let selected = null;
      for (let r of radios) {
        if (r.checked) { selected = r.value; break; }
      }
      if (selected === null) { answeredAll = false; break; }
    }

    if (!answeredAll) {
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = `⚠️ Please answer all 20 questions before submitting.`;
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const qEl = questions[i];
      const radios = document.getElementsByName(`q${i}`);
      let selectedValue = null;
      for (let r of radios) {
        if (r.checked) { selectedValue = parseInt(r.value); break; }
      }

      const isCorrect = (selectedValue === quizData[i].correct);
      if (isCorrect) score++;

      qEl.classList.remove('correct-highlight', 'incorrect-highlight');
      qEl.classList.add(isCorrect ? 'correct-highlight' : 'incorrect-highlight');

      const feedbackDiv = document.getElementById(`feedback-${i}`);
      if (feedbackDiv) {
        if (isCorrect) {
          feedbackDiv.innerHTML = `
            <span class="correct-icon"><i class="fas fa-check-circle"></i></span>
            <span>Correct!</span>
          `;
        } else {
          const correctAnswerText = quizData[i].options[quizData[i].correct];
          const userAnswerText = quizData[i].options[selectedValue];
          feedbackDiv.innerHTML = `
            <span class="incorrect-icon"><i class="fas fa-times-circle"></i></span>
            <span>Incorrect. Your answer: <strong>${userAnswerText}</strong></span>
            <span class="correct-answer-text">Correct: ${correctAnswerText}</span>
          `;
        }
      }
    }

    const percent = Math.round(score / 20 * 100);
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `✅ You scored ${score} out of 20 (${percent}%). ${
      score === 20 ? 'Perfect! You are a biodiversity expert!' :
      score >= 15 ? 'Great job! You have a strong understanding.' :
      'Good start — review the articles and try again!'
    }`;

    if (score === 20 && typeof confetti === 'function') {
      fireConfetti();
    }
  }

  /* ===== CONFETTI FOR PERFECT SCORE ===== */
  function fireConfetti() {
    const colors = ['#0f4c5c', '#2a6f7a', '#3c6e47', '#e3b448', '#6fb87f'];

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: colors
      });
    }, 600);
  }

  /* ----- Reset quiz ----- */
  function resetQuiz() {
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    document.querySelectorAll('.quiz-question').forEach(q => {
      q.classList.remove('correct-highlight', 'incorrect-highlight');
      const fb = q.querySelector('.answer-feedback');
      if (fb) fb.innerHTML = '';
    });
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
  }

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
      '.card, .case-card, .ethics-item, .visual-item, .staff-member'
    );

    revealTargets.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .section-title').forEach(el => observer.observe(el));
  }

  /* ===== STAGGER DELAYS ===== */
  function applyStagger() {
    const grids = document.querySelectorAll(
      '.article-grid, .case-grid, .ethics-list, .visual-grid, .staff-grid'
    );

    grids.forEach(grid => {
      [...grid.children].forEach((child, i) => {
        child.style.setProperty('--delay', `${i * 0.08}s`);
      });
    });
  }

  /* ===== BACK TO TOP ===== */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== SCROLL SPY ===== */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => spy.observe(s));
  }

  /* ===== ANIMATED COUNTERS ===== */
  function initCounters() {
    const counters = document.querySelectorAll('.bar-value[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;

    el.textContent = '0%';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current) + '%';
    }, interval);
  }

  /* ===== INTERACTIVE CASE STUDY MAP ===== */
  function initCaseMap() {
    const mapEl = document.getElementById('caseMap');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('caseMap', {
      scrollWheelZoom: false,
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true
    }).setView([15, 20], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    const caseStudies = [
      {
        coords: [-3.4653, -62.2159],
        location: 'Amazon Basin, Brazil',
        title: 'Deforestation & Malaria',
        description: 'Clearing for cattle ranches increased mosquito breeding sites and human exposure.',
        stat: '48% rise in malaria cases'
      },
      {
        coords: [8.8496, 119.9153],
        location: 'Tubbataha Reefs, Philippines',
        title: 'Blast Fishing & Food Security',
        description: 'Destructive fishing decimated reefs, reducing fish catch in coastal villages.',
        stat: '60% drop in fish catch'
      },
      {
        coords: [9.9456, -9.6966],
        location: 'Guinea, West Africa',
        title: 'Ebola & Bushmeat',
        description: 'Fruit bat habitat disruption linked to Ebola spillover near forest edges.',
        stat: '70% outbreaks near forest edges'
      }
    ];

    function createIcon() {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-wrap">
            <div class="marker-pulse"></div>
            <div class="marker-pin"></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -34]
      });
    }

    caseStudies.forEach((study, index) => {
      const marker = L.marker(study.coords, { icon: createIcon() }).addTo(map);

      marker.bindPopup(`
        <div class="map-popup">
          <div class="popup-location">
            <i class="fas fa-map-marker-alt"></i> ${study.location}
          </div>
          <h4>${study.title}</h4>
          <p>${study.description}</p>
          <span class="popup-stat">${study.stat}</span>
        </div>
      `);

      if (index === 0) {
        setTimeout(() => marker.openPopup(), 800);
      }
    });

    map.on('focus click', () => map.scrollWheelZoom.enable());
    map.on('blur mouseout', () => map.scrollWheelZoom.disable());

    setTimeout(() => map.invalidateSize(), 500);
  }

  /* ----- INIT ----- */
  initThemeToggle();
  initSearch();
  renderQuiz();
  initScrollReveal();
  applyStagger();
  initBackToTop();
  initScrollSpy();
  initCounters();
  initCaseMap();

  /* ----- EVENT LISTENERS ----- */
  submitBtn.addEventListener('click', evaluateQuiz);
  resetBtn.addEventListener('click', resetQuiz);

  /* ----- Smooth nav ----- */
  document.querySelectorAll('.nav-links a, .btn-read').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else if (link.classList.contains('btn-read')) {
        e.preventDefault();
        alert('This is a prototype article. In the full version, it opens a detailed page.');
      }
    });
  });
})();