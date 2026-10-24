(function() {
  'use strict';

  // Base Quiz Data (Nakabase sa research niyo)
  const baseQuizData = [
    { q: "What is biodiversity?", options: ["Variety of life on Earth", "Number of humans", "Only animal species", "Weather patterns"], correct: 0 },
    { q: "Which is a major driver of biodiversity loss?", options: ["Habitat destruction", "Planting trees", "Recycling", "Solar energy"], correct: 0 },
    { q: "How does biodiversity loss affect human health?", options: ["Increases pandemic risk", "Improves air quality", "No effect", "Increases food security"], correct: 0 },
    { q: "What is zoonotic spillover?", options: ["Virus jumping from animals to humans", "Ocean acidification", "Plant pollination", "Deforestation method"], correct: 0 },
    { q: "Which ecosystem is most threatened by blast fishing?", options: ["Coral reefs", "Deserts", "Grasslands", "Tundras"], correct: 0 },
    { q: "The Living Planet Report 2022 showed average decline in monitored wildlife populations of about:", options: ["68%", "10%", "25%", "90%"], correct: 0 },
    { q: "What is an ethical concern of gene drives for conservation?", options: ["Unintended ecological effects", "They are too cheap", "They increase biodiversity instantly", "No concerns"], correct: 0 },
    { q: "Which of these is an ecosystem service?", options: ["Pollination", "Deforestation", "Mining", "Overfishing"], correct: 0 },
    { q: "How does deforestation influence malaria?", options: ["Increases mosquito breeding sites", "Kills all mosquitoes", "No link", "Reduces malaria"], correct: 0 },
    { q: "What does agrobiodiversity refer to?", options: ["Variety of crops and livestock", "Urban farms", "GMO only", "Factory farming"], correct: 0 },
    { q: "Which international agreement targets biodiversity loss?", options: ["Kunming-Montreal Global Biodiversity Framework", "Paris Agreement only", "Kyoto Protocol", "Montreal Protocol"], correct: 0 },
    { q: "What is a key social issue related to biodiversity?", options: ["Environmental justice", "Stock market", "Space travel", "Cryptocurrency"], correct: 0 },
    { q: "How do coral reefs contribute to medicine?", options: ["Provide compounds for drugs", "No medical use", "Only tourism", "Used as fuel"], correct: 0 },
    { q: "Which is a direct human health benefit of biodiversity?", options: ["Access to diverse nutritious food", "Increased pollution", "Spread of monocultures", "Loss of medicinal plants"], correct: 0 },
    { q: "What percentage of emerging infectious diseases originate from animals?", options: ["~60%", "10%", "5%", "90%"], correct: 0 },
    { q: "Which is an example of an ethical perspective on biodiversity?", options: ["Intrinsic value of species", "Only economic value matters", "Humans own nature", "No moral duty"], correct: 0 },
    { q: "What is a pollinator?", options: ["Bee, butterfly, etc.", "Pesticide", "Fertilizer", "Tractor"], correct: 0 },
    { q: "How does climate change threaten biodiversity?", options: ["Shifts species ranges", "Increases all populations", "No effect", "Stops evolution"], correct: 0 },
    { q: "Which of the following is a case study in our article?", options: ["Amazon deforestation & malaria", "Urban gardening", "Renewable energy", "Space exploration"], correct: 0 },
    { q: "What is the primary goal of the BioSphere website?", options: ["Educate about biodiversity & health links", "Sell products", "Entertainment", "Political campaign"], correct: 0 }
  ];

  let quizData = []; // Ito ang magiging dynamic array

  const quizContainer = document.getElementById('quizContainer');
  const resultDiv = document.getElementById('quiz-result');
  const submitBtn = document.getElementById('submitQuiz');
  const resetBtn = document.getElementById('resetQuiz');
  const answeredCounter = document.getElementById('quizAnswered');
  const percentLabel = document.getElementById('quizPercent');
  const progressFill = document.getElementById('quizProgressFill');

  // Helper function para mag-shuffle ng array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // Function para i-prepare ang randomized quiz
  function prepareQuiz() {
    // 1. Shuffle ang mga tanong
    let shuffledQuestions = shuffleArray([...baseQuizData]);

    // 2. I-shuffle din ang mga options sa bawat tanong
    quizData = shuffledQuestions.map(item => {
      // Gumawa ng bagong array na may options at tamang index
      let optionsWithCorrect = item.options.map((opt, index) => ({
        text: opt,
        isCorrect: index === item.correct
      }));

      // I-shuffle ang options
      let shuffledOptions = shuffleArray([...optionsWithCorrect]);

      // Hanapin kung saan napunta ang tamang sagot
      let newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

      return {
        q: item.q,
        options: shuffledOptions.map(opt => opt.text),
        correct: newCorrectIndex
      };
    });
  }

  function refreshLucide() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      try {
        lucide.createIcons();
      } catch (e) {
        console.warn("Lucide render error:", e);
      }
    }
  }

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
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      refreshLucide();
    }
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        refreshLucide();
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            refreshLucide();
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          !navLinks.contains(e.target) &&
          !menuToggle.contains(e.target) &&
          navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          refreshLucide();
        }
      }
    });
  }

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
      items.forEach(el => { el.style.display = ''; });

      if (!query) {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        return;
      }

      let visibleCount = 0;
      let firstMatch = null;

      items.forEach(el => {
        const text = el.textContent.toLowerCase();
        const match = text.includes(query);
        if (match) {
          el.style.display = '';
          visibleCount++;
          if (!firstMatch) firstMatch = el;
        } else {
          el.style.display = 'none';
        }
      });

      status.classList.add('visible');
      if (visibleCount === 0) {
        status.innerHTML = `<i data-lucide="search"></i> No results found for "<strong>${escapeHtml(query)}</strong>". <button class="clear-search" type="button">Clear search</button>`;
      } else {
        status.innerHTML = `<i data-lucide="check-circle-2"></i> Found <strong>${visibleCount}</strong> result${visibleCount !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>". <button class="clear-search" type="button">Clear search</button>`;
        if (firstMatch) {
          setTimeout(() => {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      }

      const clearBtn = status.querySelector('.clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          runSearch();
          input.focus();
        });
      }
      refreshLucide();
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

  function renderQuiz() {
    if (!quizContainer) return;
    
    // I-prepare ang randomized quiz bago i-render
    prepareQuiz();
    
    let html = '';
    quizData.forEach((item, index) => {
      html += `
        <div class="quiz-question" data-qindex="${index}">
          <p>${index + 1}. ${item.q}</p>
          <div class="quiz-options">
            ${item.options.map((opt, optIndex) => `
              <label for="q${index}o${optIndex}" class="quiz-option">
                <input type="radio" id="q${index}o${optIndex}" name="q${index}" value="${optIndex}">
                <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                <span class="option-text">${opt}</span>
              </label>
            `).join('')}
          </div>
          <div class="answer-feedback" id="feedback-${index}"></div>
        </div>
      `;
    });
    
    quizContainer.innerHTML = html;
    
    if (resultDiv) {
      resultDiv.classList.remove('visible');
      resultDiv.innerHTML = '';
    }
    
    updateProgress();
    
    quizContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', updateProgress);
    });

    const questions = quizContainer.querySelectorAll('.quiz-question');
    const quizObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    questions.forEach(q => quizObserver.observe(q));

    setTimeout(refreshLucide, 100);
  }

  function updateProgress() {
    let answered = 0;
    quizData.forEach((_, i) => {
      const radios = document.getElementsByName(`q${i}`);
      for (let r of radios) {
        if (r.checked) { answered++; break; }
      }
    });

    const total = quizData.length;
    const percent = Math.round(answered / total * 100);

    if (answeredCounter) answeredCounter.textContent = answered;
    if (percentLabel) percentLabel.textContent = percent + '%';
    if (progressFill) progressFill.style.width = percent + '%';
  }

  function evaluateQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    if (questions.length === 0) return;

    let score = 0;
    let answeredAll = true;
    let firstUnanswered = null;

    for (let i = 0; i < questions.length; i++) {
      const radios = document.getElementsByName(`q${i}`);
      let selected = null;
      for (let r of radios) {
        if (r.checked) { selected = r.value; break; }
      }
      if (selected === null) {
        answeredAll = false;
        if (!firstUnanswered) firstUnanswered = questions[i];
      }
    }

    if (!answeredAll) {
      if (resultDiv) {
        resultDiv.classList.add('visible');
        resultDiv.innerHTML = `
          <div class="quiz-warning">
            <i data-lucide="alert-triangle"></i>
            <span>Please answer all 20 questions before submitting. You still have <strong>${20 - countAnswered()}</strong> unanswered.</span>
          </div>
        `;
      }
      refreshLucide();
      if (firstUnanswered) {
        firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const qEl = questions[i];
      const radios = document.getElementsByName(`q${i}`);
      let selectedValue = null;
      for (let r of radios) {
        if (r.checked) { selectedValue = parseInt(r.value); break; }
      }

      // Dito natin ginagamit ang dynamic correct index mula sa shuffled quizData
      const isCorrect = (selectedValue === quizData[i].correct);
      if (isCorrect) score++;

      qEl.classList.remove('correct-highlight', 'incorrect-highlight');
      qEl.classList.add(isCorrect ? 'correct-highlight' : 'incorrect-highlight');

      const feedbackDiv = document.getElementById(`feedback-${i}`);
      if (feedbackDiv) {
        if (isCorrect) {
          feedbackDiv.innerHTML = `
            <span class="correct-icon"><i data-lucide="check-circle-2"></i></span>
            <span>Correct!</span>
          `;
        } else {
          const correctAnswerText = quizData[i].options[quizData[i].correct];
          const userAnswerText = quizData[i].options[selectedValue];
          feedbackDiv.innerHTML = `
            <span class="incorrect-icon"><i data-lucide="x-circle"></i></span>
            <span>Incorrect. Your answer: <strong>${userAnswerText}</strong></span>
            <span class="correct-answer-text">Correct: ${correctAnswerText}</span>
          `;
        }
      }
    }

    refreshLucide();
    showResultCard(score);

    if (score === 20 && typeof confetti === 'function') {
      fireConfetti();
    }
  }

  function countAnswered() {
    let count = 0;
    quizData.forEach((_, i) => {
      const radios = document.getElementsByName(`q${i}`);
      for (let r of radios) {
        if (r.checked) { count++; break; }
      }
    });
    return count;
  }

  function showResultCard(score) {
    if (!resultDiv) return;
    
    const percent = Math.round(score / 20 * 100);
    let icon, message;

    if (score === 20) {
      icon = '🏆';
      message = 'Perfect! You are a biodiversity expert!';
    } else if (score >= 15) {
      icon = '🌟';
      message = 'Great job! You have a strong understanding.';
    } else if (score >= 10) {
      icon = '👍';
      message = 'Good work! Review the articles to sharpen your knowledge.';
    } else {
      icon = '📚';
      message = 'Keep learning! Review the articles and try again.';
    }

    resultDiv.classList.add('visible');
    resultDiv.innerHTML = `
      <div class="quiz-result-card">
        <span class="quiz-result-icon">${icon}</span>
        <div class="quiz-result-score">
          <span id="scoreNumber">0</span>
          <span class="score-total">/ 20</span>
        </div>
        <div class="quiz-result-percent">${percent}%</div>
        <p class="quiz-result-message">${message}</p>
        <button class="quiz-result-retake" id="retakeBtn" type="button">
          <i data-lucide="rotate-ccw"></i> Retake Quiz
        </button>
      </div>
    `;

    refreshLucide();
    animateCountUp(document.getElementById('scoreNumber'), score);

    setTimeout(() => {
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    const retakeBtn = document.getElementById('retakeBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        resetQuiz();
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function animateCountUp(el, target) {
    if (!el) return;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    el.textContent = '0';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current);
    }, interval);
  }

  function fireConfetti() {
    const colors = ['#0f4c5c', '#2a6f7a', '#3c6e47', '#e3b448', '#6fb87f'];
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
    }, 250);
    setTimeout(() => {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 }, colors });
    }, 600);
  }

  function resetQuiz() {
    // Dito natin tinatawag ulit ang renderQuiz() para mag-generate ng BAGONG random set
    renderQuiz();
  }

  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      bar.style.width = scrolled + '%';
    }, { passive: true });
  }

  function initParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        elements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax'));
          const yPos = -(scrollY * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
    }, { passive: true });
  }

  function initGlobalMouseParallax() {
    const shapes = document.querySelectorAll('.bg-shape');
    if (!shapes.length) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateParallax() {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      const xOffset = (targetX - window.innerWidth / 2) * 0.05;
      const yOffset = (targetY - window.innerHeight / 2) * 0.05;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.8;
        shape.style.transform = `translate3d(${xOffset * speed}px, ${yOffset * speed}px, 0)`;
      });

      requestAnimationFrame(updateParallax);
    }
    requestAnimationFrame(updateParallax);
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-title');
    if (!targets.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach(el => observer.observe(el));
  }

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

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (!sections.length || !navLinks.length) return;

    const updateActiveLink = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => spy.observe(s));

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, null, href);
            updateActiveLink(href.substring(1));
          }
        }
      });
    });
  }

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
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 1200;
    const steps = 50;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;

    el.textContent = '0%';
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.round(current) + '%';
    }, interval);
  }

  function initCaseMap() {
    const mapEl = document.getElementById('caseMap');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('caseMap', {
      scrollWheelZoom: false,
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true,
      fadeAnimation: true,
      zoomAnimation: true
    }).setView([15, 20], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      updateWhenIdle: true
    }).addTo(map);

    const caseStudies = [
      { coords: [-3.4653, -62.2159], location: 'Amazon Basin, Brazil', title: 'Deforestation & Malaria', description: 'Clearing for cattle ranches increased mosquito breeding sites and human exposure.', stat: '48% rise in malaria cases' },
      { coords: [8.8496, 119.9153], location: 'Tubbataha Reefs, Philippines', title: 'Blast Fishing & Food Security', description: 'Destructive fishing decimated reefs, reducing fish catch in coastal villages.', stat: '60% drop in fish catch' },
      { coords: [9.9456, -9.6966], location: 'Guinea, West Africa', title: 'Ebola & Bushmeat', description: 'Fruit bat habitat disruption linked to Ebola spillover near forest edges.', stat: '70% outbreaks near forest edges' }
    ];

    function createIcon() {
      return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-wrap"><div class="marker-pulse"></div><div class="marker-pin"></div></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -34]
      });
    }

    caseStudies.forEach((study, index) => {
      const marker = L.marker(study.coords, { icon: createIcon() }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup">
          <div class="popup-location"><i data-lucide="map-pin"></i> ${study.location}</div>
          <h4>${study.title}</h4>
          <p>${study.description}</p>
          <span class="popup-stat">${study.stat}</span>
        </div>
      `, { autoPanPadding: [20, 20] });
      
      if (index === 0) setTimeout(() => marker.openPopup(), 800);
    });

    map.on('popupopen', refreshLucide);
    map.on('focus click', () => map.scrollWheelZoom.enable());
    map.on('blur mouseout', () => map.scrollWheelZoom.disable());
    setTimeout(() => map.invalidateSize(), 400);
  }

  function init() {
    initThemeToggle();
    initMobileMenu();
    initSearch();
    renderQuiz();
    initScrollReveal();
    initBackToTop();
    initScrollSpy();
    initCounters();
    initCaseMap();
    initScrollProgress();
    initParallax();
    initGlobalMouseParallax();

    if (submitBtn) submitBtn.addEventListener('click', evaluateQuiz);
    if (resetBtn) resetBtn.addEventListener('click', resetQuiz);

    document.querySelectorAll('.btn-read').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('btn-read')) {
          e.preventDefault();
          alert('This is a prototype article. In the full version, it opens a detailed page.');
        }
      });
    });

    setTimeout(refreshLucide, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', refreshLucide);

})();