// ============================================================
// QUIZ.JS - Module bài kiểm tra
// ============================================================

class QuizModule {
  constructor() {
    this.questions = [];
    this.currentQ = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.quizType = 'multiple'; // 'multiple' | 'fill'
    this.topic = 'all';
  }

  init(topic = 'all', type = 'multiple') {
    this.topic = topic;
    this.quizType = type;
    this.currentQ = 0;
    this.score = 0;
    this.selectedAnswer = null;

    const allWords = topic === 'all' ? getAllWords() :
      (VOCABULARY_DATA[topic]?.words.map((w, i) => ({ ...w, topic, wordIndex: i })) || []);

    // Shuffle và lấy tối đa 10 câu
    const shuffled = [...allWords].sort(() => Math.random() - 0.5).slice(0, 10);
    this.questions = shuffled.map(word => this.buildQuestion(word, allWords));

    this.render();
  }

  buildQuestion(word, pool) {
    if (this.quizType === 'fill') {
      return { type: 'fill', word, answer: word.meaning };
    }

    // Trắc nghiệm 4 đáp án
    const wrongPool = pool.filter(w => w.hanzi !== word.hanzi);
    const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.meaning);
    const options = [word.meaning, ...wrongs].sort(() => Math.random() - 0.5);
    return { type: 'multiple', word, options, answer: word.meaning };
  }

  get currentQuestion() {
    return this.questions[this.currentQ];
  }

  render() {
    const container = document.getElementById('quiz-view');
    if (!container) return;

    if (this.questions.length === 0) {
      container.innerHTML = `
        <div class="quiz-page">
          <div class="quiz-header">
            <h2 class="section-title"> Bài kiểm tra</h2>
          </div>
          <div class="quiz-empty">Không có từ vựng. Hãy chọn chủ đề!</div>
        </div>
      `;
      return;
    }

    if (this.currentQ >= this.questions.length) {
      this.renderResult();
      return;
    }

    const q = this.currentQuestion;
    const progress = ((this.currentQ) / this.questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-page">
        <div class="quiz-header">
          <h2 class="section-title"> Bài kiểm tra</h2>
          <div class="quiz-controls">
            <div class="quiz-type-toggle">
              <button class="toggle-btn ${this.quizType === 'multiple' ? 'active' : ''}"
                      onclick="quizModule.init('${this.topic}', 'multiple')">Trắc nghiệm</button>
              <button class="toggle-btn ${this.quizType === 'fill' ? 'active' : ''}"
                      onclick="quizModule.init('${this.topic}', 'fill')">Điền từ</button>
            </div>
            <div class="quiz-topic-select">
              <select id="quiz-topic-sel" onchange="quizModule.init(this.value, '${this.quizType}')">
                <option value="all" ${this.topic === 'all' ? 'selected' : ''}> Tất cả</option>
                ${Object.entries(VOCABULARY_DATA).map(([k, v]) =>
      `<option value="${k}" ${this.topic === k ? 'selected' : ''}>${v.name}</option>`
    ).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="quiz-progress-area">
          <div class="quiz-progress-text">
            Câu <strong>${this.currentQ + 1}</strong> / ${this.questions.length} &nbsp;|&nbsp;
            Điểm: <strong class="score-highlight">${this.score}</strong>
          </div>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${progress}%"></div>
          </div>
        </div>

        <div class="quiz-card">
          <div class="quiz-question-meta">Chọn nghĩa đúng của từ sau:</div>
          <div class="quiz-hanzi">${q.word.hanzi}</div>
          <div class="quiz-pinyin">${q.word.pinyin}</div>
          ${q.type === 'multiple' ? this.renderMultiple(q) : this.renderFill(q)}
        </div>
      </div>
    `;


    if (q.type === 'fill') {
      const inp = document.getElementById('fill-input');
      if (inp) inp.focus();
    }
  }

  renderMultiple(q) {
    return `
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" id="opt-${i}" onclick="quizModule.selectAnswer('${opt.replace(/'/g, "\\'")}', ${i})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  }

  renderFill(q) {
    return `
      <div class="fill-area">
        <input type="text" id="fill-input" class="fill-input" 
               placeholder="Nhập nghĩa tiếng Việt..." 
               onkeydown="if(event.key==='Enter') quizModule.checkFill()">
        <button class="fill-submit-btn" onclick="quizModule.checkFill()">
          Kiểm tra
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;
  }

  selectAnswer(answer, btnIndex) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = answer;

    const q = this.currentQuestion;
    const isCorrect = answer === q.answer;
    if (isCorrect) this.score++;

    // Highlight answers
    q.options.forEach((opt, i) => {
      const btn = document.getElementById(`opt-${i}`);
      if (!btn) return;
      if (opt === q.answer) {
        btn.classList.add('correct');
      } else if (i === btnIndex && !isCorrect) {
        btn.classList.add('wrong');
      }
      btn.disabled = true;
    });

    this.showFeedback(isCorrect, q.answer);
    setTimeout(() => this.nextQuestion(), 1500);
  }

  checkFill() {
    if (this.selectedAnswer !== null) return;
    const input = document.getElementById('fill-input');
    if (!input) return;

    const userAnswer = input.value.trim().toLowerCase();
    const q = this.currentQuestion;
    const correctAnswer = q.answer.toLowerCase();

    // Kiểm tra gần đúng
    const isCorrect = userAnswer === correctAnswer ||
      correctAnswer.includes(userAnswer) ||
      userAnswer.includes(correctAnswer.split('/')[0].trim());

    this.selectedAnswer = userAnswer;
    if (isCorrect) this.score++;

    input.disabled = true;
    input.classList.add(isCorrect ? 'correct' : 'wrong');
    this.showFeedback(isCorrect, q.answer);
    setTimeout(() => this.nextQuestion(), 1800);
  }

  showFeedback(isCorrect, correctAnswer) {
    const card = document.querySelector('.quiz-card');
    if (!card) return;

    const div = document.createElement('div');
    div.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
    div.innerHTML = isCorrect
      ? `<span> Chính xác!</span>`
      : `<span> Sai rồi! Đáp án: <strong>${correctAnswer}</strong></span>`;
    card.appendChild(div);
  }

  nextQuestion() {
    this.currentQ++;
    this.selectedAnswer = null;
    this.render();
  }

  renderResult() {
    const container = document.getElementById('quiz-view');
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);
    let msg, emoji;
    if (pct >= 90) { msg = "Xuất sắc! Bạn là thiên tài tiếng Trung! "; emoji = ""; }
    else if (pct >= 70) { msg = "Rất tốt! Tiếp tục cố gắng nhé! "; emoji = ""; }
    else if (pct >= 50) { msg = "Khá ổn! Hãy ôn lại nhé! "; emoji = ""; }
    else { msg = "Cần cố gắng thêm! Đừng nản lòng! "; emoji = ""; }

    container.innerHTML = `
      <div class="quiz-page">
        <div class="quiz-header">
          <h2 class="section-title"> Kết quả</h2>
        </div>
        <div class="quiz-result">
          <div class="result-emoji">${emoji}</div>
          <div class="result-score-ring">
            <svg class="result-ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" stroke-width="10"
                stroke-dasharray="${2 * Math.PI * 50}"
                stroke-dashoffset="${2 * Math.PI * 50 * (1 - pct / 100)}"
                stroke-linecap="round" transform="rotate(-90 60 60)"/>
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#a78bfa"/>
                  <stop offset="100%" stop-color="#34d399"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="result-score-text">
              <div class="result-pct">${pct}%</div>
              <div class="result-fraction">${this.score}/${total}</div>
            </div>
          </div>
          <div class="result-message">${msg}</div>
          <div class="result-actions">
            <button class="result-btn result-retry" onclick="quizModule.init('${this.topic}', '${this.quizType}')">
               Làm lại
            </button>
            <button class="result-btn result-study" onclick="showView('flashcard')">
               Ôn flashcard
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

const quizModule = new QuizModule();
