/* ===== script.js ===== */
(function() {
  // ----- 20 Quiz Questions (knowledge check) -----
  const quizData = [
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

  const quizContainer = document.getElementById('quizContainer');
  const resultDiv = document.getElementById('quiz-result');
  const submitBtn = document.getElementById('submitQuiz');
  const resetBtn = document.getElementById('resetQuiz');

  /* ----- Render quiz (no feedback initially) ----- */
  function renderQuiz() {
    let html = '';
    quizData.forEach((item, index) => {
      html += `
        <div class="quiz-question" data-qindex="${index}">
          <p>${index + 1}. ${item.q}</p>
          <div class="quiz-options">
            ${item.options.map((opt, optIndex) => `
              <label>
                <input type="radio" name="q${index}" value="${optIndex}">
                ${opt}
              </label>
            `).join('')}
          </div>
          <div class="answer-feedback" id="feedback-${index}"></div>
        </div>
      `;
    });
    quizContainer.innerHTML = html;

    // Reattach event listeners if needed (none here, but if using dynamic, could)
    // Hide result
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
  }

  /* ----- Evaluate quiz and show feedback per question ----- */
  function evaluateQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let answeredAll = true;

    // First pass: check if all are answered
    for (let i = 0; i < questions.length; i++) {
      const radios = document.getElementsByName(`q${i}`);
      let selected = null;
      for (let r of radios) {
        if (r.checked) {
          selected = r.value;
          break;
        }
      }
      if (selected === null) {
        answeredAll = false;
        break;
      }
    }

    if (!answeredAll) {
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = `⚠️ Please answer all 20 questions before submitting.`;
      return;
    }

    // Second pass: score + per-question feedback
    for (let i = 0; i < questions.length; i++) {
      const qEl = questions[i];
      const radios = document.getElementsByName(`q${i}`);
      let selectedValue = null;
      for (let r of radios) {
        if (r.checked) {
          selectedValue = parseInt(r.value);
          break;
        }
      }

      const isCorrect = (selectedValue === quizData[i].correct);
      if (isCorrect) score++;

      // Visual highlight
      qEl.classList.remove('correct-highlight', 'incorrect-highlight');
      qEl.classList.add(isCorrect ? 'correct-highlight' : 'incorrect-highlight');

      // Build feedback message
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

    // Show overall score
    const percent = Math.round(score / 20 * 100);
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `✅ You scored ${score} out of 20 (${percent}%). ${
      score === 20 ? 'Perfect! You are a biodiversity expert!' :
      score >= 15 ? 'Great job! You have a strong understanding.' :
      'Good start — review the articles and try again!'
    }`;
  }

  /* ----- Reset quiz: clear selections, highlights, feedback ----- */
  function resetQuiz() {
    // Clear all radio selections
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);

    // Remove highlight classes and clear feedback
    document.querySelectorAll('.quiz-question').forEach(q => {
      q.classList.remove('correct-highlight', 'incorrect-highlight');
      const fb = q.querySelector('.answer-feedback');
      if (fb) fb.innerHTML = '';
    });

    // Hide result
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
  }

  // Initialize
  renderQuiz();

  // Event listeners
  submitBtn.addEventListener('click', evaluateQuiz);
  resetBtn.addEventListener('click', resetQuiz);

  // Smooth nav for internal links
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

  // Search dummy
  const searchBtn = document.querySelector('.search-box button');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const input = document.querySelector('.search-box input');
      alert(`Search for "${input.value}" would show relevant articles (demo).`);
    });
  }
})();