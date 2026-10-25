  (function() {
    'use strict';

    const baseQuizData = [
      { q: "What is biodiversity?", options: ["Variety of life on Earth", "Number of humans", "Only animal species", "Weather patterns"], correct: 0 },
      { q: "Which is a major driver of biodiversity loss?", options: ["Habitat destruction", "Planting trees", "Recycling", "Solar energy"], correct: 0 },
      { q: "How does biodiversity loss affect human health?", options: ["Increases pandemic risk", "Improves air quality", "No effect", "Increases food security"], correct: 0 },
      { q: "What is zoonotic spillover?", options: ["Virus jumping from animals to humans", "Ocean acidification", "Plant pollination", "Deforestation method"], correct: 0 },
      { q: "Which ecosystem is most threatened by blast fishing?", options: ["Coral reefs", "Deserts", "Grasslands", "Tundras"], correct: 0 },
      { q: "The Living Planet Report 2024 showed an average decline in monitored wildlife populations (1970–2020) of about:", options: ["73%", "10%", "25%", "90%"], correct: 0 },
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
      { q: "Which of the following is a case study in our paper?", options: ["Kalimantan & Sumatra deforestation", "Urban gardening", "Renewable energy", "Space exploration"], correct: 0 },
      { q: "What is the primary goal of the BioSphere website?", options: ["Educate about biodiversity & health links", "Sell products", "Entertainment", "Political campaign"], correct: 0 }
    ];

    let quizData = [];

    const quizContainer = document.getElementById('quizContainer');
    const resultDiv = document.getElementById('quiz-result');
    const submitBtn = document.getElementById('submitQuiz');
    const resetBtn = document.getElementById('resetQuiz');
    const answeredCounter = document.getElementById('quizAnswered');
    const percentLabel = document.getElementById('quizPercent');
    const progressFill = document.getElementById('quizProgressFill');

    let closeMenu = function() {};

    /* ---------- helpers ---------- */
    function shuffleArray(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    function prepareQuiz() {
      const shuffledQuestions = shuffleArray([...baseQuizData]);
      quizData = shuffledQuestions.map(item => {
        const withFlag = item.options.map((opt, index) => ({ text: opt, isCorrect: index === item.correct }));
        const shuffled = shuffleArray([...withFlag]);
        return {
          q: item.q,
          options: shuffled.map(o => o.text),
          correct: shuffled.findIndex(o => o.isCorrect)
        };
      });
    }

    function refreshLucide() {
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try { lucide.createIcons(); } catch (e) {}
      }
    }

    // Lucide replaces <i> with <svg>, so we rebuild the icon instead of editing it
    function setIcon(btn, name) {
      if (!btn) return;
      btn.innerHTML = '<i data-lucide="' + name + '"></i>';
      refreshLucide();
    }

    function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

    /* ---------- theme ---------- */
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      setIcon(document.getElementById('themeToggle'), theme === 'dark' ? 'sun' : 'moon');
    }

    function initThemeToggle() {
      const toggle = document.getElementById('themeToggle');
      if (!toggle) return;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(safeGet('biosphere-theme') || (prefersDark ? 'dark' : 'light'));
      toggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        safeSet('biosphere-theme', next);
      });
    }

    /* ---------- mobile menu ---------- */
    function initMobileMenu() {
      const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      if (!menuToggle || !navLinks) return;
      const setMenu = (open) => {
        navLinks.classList.toggle('open', open);
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        setIcon(menuToggle, open ? 'x' : 'menu');
      };
      closeMenu = () => setMenu(false);
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenu(!navLinks.classList.contains('open'));
      });
    }

    /* ---------- modals ---------- */
    function initModals() {
      let lastFocus = null;
      window.openModal = function(id) {
        const m = document.getElementById(id);
        if (!m) return;
        lastFocus = document.activeElement;
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
        const c = m.querySelector('.modal-close');
        if (c) c.focus();
      };
      window.closeModal = function(id) {
        const m = document.getElementById(id);
        if (m) m.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      };
      document.querySelectorAll('.modal-overlay').forEach(o => {
        o.setAttribute('role', 'dialog');
        o.setAttribute('aria-modal', 'true');
        o.addEventListener('click', (e) => { if (e.target === o) window.closeModal(o.id); });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const a = document.querySelector('.modal-overlay.active');
        if (a) window.closeModal(a.id);
      });
    }

    /* ---------- search ---------- */
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
        if (!query) { document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); return; }
        let visibleCount = 0;
        let firstMatch = null;
        items.forEach(el => {
          if (el.textContent.toLowerCase().includes(query)) {
            el.style.display = '';
            visibleCount++;
            if (!firstMatch) firstMatch = el;
          } else {
            el.style.display = 'none';
          }
        });
        status.classList.add('visible');
        if (visibleCount === 0) {
          status.innerHTML = '<i data-lucide="search"></i> No results found. <button class="clear-search" type="button">Clear search</button>';
        } else {
          status.innerHTML = '<i data-lucide="check-circle-2"></i> Found <strong>' + visibleCount + '</strong> results. <button class="clear-search" type="button">Clear search</button>';
          if (firstMatch) setTimeout(() => { firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
        }
        const clearBtn = status.querySelector('.clear-search');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => { input.value = ''; runSearch(); input.focus(); });
        }
        refreshLucide();
      }

      let debounceTimer;
      input.addEventListener('input', () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(runSearch, 200); });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(debounceTimer); runSearch(); } });
      if (btn) btn.addEventListener('click', () => { clearTimeout(debounceTimer); runSearch(); });
    }

    /* ---------- quiz ---------- */
    function renderQuiz() {
      if (!quizContainer) return;
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
          </div>`;
      });
      quizContainer.innerHTML = html;
      if (resultDiv) { resultDiv.classList.remove('visible'); resultDiv.innerHTML = ''; }
      updateProgress();
      quizContainer.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener('change', updateProgress));

      // one-time reveal (no flicker when scrolling back)
      const quizObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      quizContainer.querySelectorAll('.quiz-question').forEach(q => quizObserver.observe(q));
      setTimeout(refreshLucide, 100);
    }

    function updateProgress() {
      let answered = 0;
      quizData.forEach((_, i) => {
        const radios = document.getElementsByName('q' + i);
        for (let r of radios) { if (r.checked) { answered++; break; } }
      });
      const percent = Math.round(answered / quizData.length * 100);
      if (answeredCounter) answeredCounter.textContent = answered;
      if (percentLabel) percentLabel.textContent = percent + '%';
      if (progressFill) progressFill.style.width = percent + '%';
    }

    function evaluateQuiz() {
      const questions = document.querySelectorAll('.quiz-question');
      if (questions.length === 0) return;
      let score = 0;
      let firstUnanswered = null;

      for (let i = 0; i < questions.length; i++) {
        const radios = document.getElementsByName('q' + i);
        let selected = false;
        for (let r of radios) { if (r.checked) { selected = true; break; } }
        if (!selected && !firstUnanswered) firstUnanswered = questions[i];
      }

      if (firstUnanswered) {
        if (resultDiv) {
          resultDiv.classList.add('visible');
          resultDiv.innerHTML = '<div class="quiz-warning"><i data-lucide="alert-triangle"></i><span>Please answer all 20 questions before submitting.</span></div>';
        }
        refreshLucide();
        firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      for (let i = 0; i < questions.length; i++) {
        const qEl = questions[i];
        const radios = document.getElementsByName('q' + i);
        let selectedValue = null;
        for (let r of radios) { if (r.checked) { selectedValue = parseInt(r.value, 10); break; } }
        const isCorrect = selectedValue === quizData[i].correct;
        if (isCorrect) score++;
        qEl.classList.remove('correct-highlight', 'incorrect-highlight');
        qEl.classList.add(isCorrect ? 'correct-highlight' : 'incorrect-highlight');
        const feedbackDiv = document.getElementById('feedback-' + i);
        if (feedbackDiv) {
          if (isCorrect) {
            feedbackDiv.innerHTML = '<span class="correct-icon"><i data-lucide="check-circle-2"></i></span><span>Correct!</span>';
          } else {
            feedbackDiv.innerHTML = '<span class="incorrect-icon"><i data-lucide="x-circle"></i></span><span>Incorrect. Your answer: <strong>' + quizData[i].options[selectedValue] + '</strong></span><span class="correct-answer-text">Correct: ' + quizData[i].options[quizData[i].correct] + '</span>';
          }
        }
      }
      // lock answers after submit
      quizContainer.querySelectorAll('input').forEach(inp => { inp.disabled = true; });
      refreshLucide();
      showResultCard(score);
      if (score === 20 && typeof confetti === 'function') fireConfetti();
    }

    function showResultCard(score) {
      if (!resultDiv) return;
      const percent = Math.round(score / 20 * 100);
      let icon, message;
      if (score === 20) { icon = '🏆'; message = 'Perfect! You are a biodiversity expert!'; }
      else if (score >= 15) { icon = '🌟'; message = 'Great job! You have a strong understanding.'; }
      else if (score >= 10) { icon = '👍'; message = 'Good work! Review the articles to sharpen your knowledge.'; }
      else { icon = '📚'; message = 'Keep learning! Review the articles and try again.'; }

      resultDiv.classList.add('visible');
      resultDiv.innerHTML = `
        <div class="quiz-result-card">
          <span class="quiz-result-icon">${icon}</span>
          <div class="quiz-result-score"><span id="scoreNumber">0</span><span class="score-total">/ 20</span></div>
          <div class="quiz-result-percent">${percent}%</div>
          <p class="quiz-result-message">${message}</p>
          <button class="quiz-result-retake" id="retakeBtn" type="button"><i data-lucide="rotate-ccw"></i> Retake Quiz</button>
        </div>`;
      refreshLucide();
      animateCountUp(document.getElementById('scoreNumber'), score);
      setTimeout(() => { resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
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
      const duration = 1200, steps = 40, increment = target / steps, interval = duration / steps;
      let current = 0;
      el.textContent = '0';
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.round(current);
      }, interval);
    }

    function fireConfetti() {
      const colors = ['#0f4c5c', '#2a6f7a', '#3c6e47', '#e3b448', '#6fb87f'];
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: colors });
    }

    function resetQuiz() { renderQuiz(); }

    /* ---------- scroll stuff ---------- */
    function initScrollProgress() {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + '%';
      }, { passive: true });
    }

    function initScrollReveal() {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-title');
      if (!targets.length) return;
      // remember each element's stagger delay so it can replay on every scroll
      targets.forEach(el => { el.dataset.delay = el.style.transitionDelay || '0s'; });
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          clearTimeout(el._delayTimer);
          if (entry.isIntersecting) {
            el.style.transitionDelay = el.dataset.delay;
            el.classList.add('visible');
            // drop the delay once it has played so hover effects aren't delayed
            el._delayTimer = setTimeout(() => { el.style.transitionDelay = '0s'; }, (parseFloat(el.dataset.delay) + 1) * 1000);
          } else {
            el.style.transitionDelay = '0s';
            el.classList.remove('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      targets.forEach(el => observer.observe(el));
    }

    function initBackToTop() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;
      window.addEventListener('scroll', () => { btn.classList.toggle('show', window.scrollY > 400); }, { passive: true });
      btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function initScrollSpy() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-menu a');
      if (!sections.length || !navLinks.length) return;
      const updateActiveLink = (id) => {
        navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === '#' + id); });
      };
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) updateActiveLink(entry.target.id); });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(s => spy.observe(s));
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            closeMenu();
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
          if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => observer.observe(c));
    }

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      const duration = 1200, steps = 50, increment = target / steps, interval = duration / steps;
      let current = 0;
      el.textContent = '0%';
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.round(current) + '%';
      }, interval);
    }

    /* ---------- map ---------- */
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
        { coords: [-1.5, 110.0], location: 'Kalimantan & Sumatra, Indonesia', title: 'Devastating Deforestation', description: 'Peatland forest cleared for paper and pulp. 2015 fires peaked in 2016, with smoke hiding the loss.', stat: '2015–16 peatland fires' },
        { coords: [28.0, 84.0], location: 'Eastern Himalayas', title: 'Himalayan Habitat Loss', description: 'Over 75% of original habitat destroyed, threatening snow leopards, red pandas, and 300+ bird species.', stat: '75% habitat destroyed' },
        { coords: [38.0, -97.0], location: 'United States (NOAA)', title: 'Restoring Polluted Waters', description: 'NOAA allocated $28M in 2022 to restore marine resources damaged by oil spills and hazardous waste.', stat: '$28M restoration fund' }
      ];

      function createIcon() {
        return L.divIcon({
          className: 'custom-marker',
          html: '<div class="marker-wrap"><div class="marker-pulse"></div><div class="marker-pin"></div></div>',
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
          </div>`, { autoPanPadding: [20, 20] });
        if (index === 0) setTimeout(() => marker.openPopup(), 800);
      });

      map.on('popupopen', refreshLucide);
      map.on('focus click', () => map.scrollWheelZoom.enable());
      map.on('blur mouseout', () => map.scrollWheelZoom.disable());
      setTimeout(() => map.invalidateSize(), 400);
    }

    /* ---------- background parallax (stops when idle, off on touch/reduced motion) ---------- */
    function initGlobalMouseParallax() {
      const shapes = document.querySelectorAll('.bg-shape');
      if (!shapes.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
      let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
      let targetX = mouseX, targetY = mouseY, running = false;

      function update() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        const xOffset = (targetX - window.innerWidth / 2) * 0.05;
        const yOffset = (targetY - window.innerHeight / 2) * 0.05;
        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.8;
          shape.style.transform = 'translate3d(' + (xOffset * speed) + 'px, ' + (yOffset * speed) + 'px, 0)';
        });
        if (Math.abs(mouseX - targetX) > 0.5 || Math.abs(mouseY - targetY) > 0.5) requestAnimationFrame(update);
        else running = false;
      }

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!running) { running = true; requestAnimationFrame(update); }
      }, { passive: true });
    }

    /* ---------- staff: auto team colors + legend filter ---------- */
    function initStaffTeams() {
      const members = document.querySelectorAll('.staff-member');
      members.forEach(m => {
        const roleEl = m.querySelector('.role');
        const role = (roleEl ? roleEl.textContent : '').toLowerCase();
        m.dataset.team = /developer/.test(role) ? 'dev'
          : /visual|media/.test(role) ? 'visual'
          : /document/.test(role) ? 'docs'
          : 'research';
      });

      const grid = document.querySelector('.staff-grid');
      if (!grid || document.querySelector('.staff-legend')) return;
      const teams = [['research', 'Research & Writing'], ['dev', 'Development'], ['docs', 'Documentation'], ['visual', 'Visual & Media']];
      const legend = document.createElement('div');
      legend.className = 'staff-legend';
      legend.setAttribute('role', 'group');
      legend.setAttribute('aria-label', 'Highlight members by team');
      legend.innerHTML = teams.map(t => '<button type="button" class="legend-chip" data-team="' + t[0] + '" aria-pressed="false"><span class="dot"></span>' + t[1] + '</button>').join('');
      grid.parentNode.insertBefore(legend, grid);

      let active = null;
      legend.addEventListener('click', (e) => {
        const chip = e.target.closest('.legend-chip');
        if (!chip) return;
        active = active === chip.dataset.team ? null : chip.dataset.team;
        legend.querySelectorAll('.legend-chip').forEach(c => {
          const on = c.dataset.team === active;
          c.classList.toggle('active', on);
          c.setAttribute('aria-pressed', String(on));
        });
        members.forEach(m => m.classList.toggle('dimmed', !!active && m.dataset.team !== active));
      });
    }

    
    function init() {
      initThemeToggle();
      initMobileMenu();
      initModals();
      initStaffTeams();
      initSearch();
      renderQuiz();
      initScrollReveal();
      initBackToTop();
      initScrollSpy();
      initCounters();
      initCaseMap();
      initScrollProgress();
      initGlobalMouseParallax();

      if (submitBtn) submitBtn.addEventListener('click', evaluateQuiz);
      if (resetBtn) resetBtn.addEventListener('click', resetQuiz);

      setTimeout(refreshLucide, 200);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

    window.addEventListener('load', refreshLucide);

  })();