// ============================================================
// FLASHCARD.JS - Module quản lý flashcard
// ============================================================

class FlashcardModule {
  constructor() {
    this.currentTopic = null;
    this.currentIndex = 0;
    this.isFlipped = false;
    this.words = [];
  }

  init(topicKey) {
    this.currentTopic = topicKey;
    this.currentIndex = 0;
    this.isFlipped = false;
    this.words = topicKey === 'all'
      ? getAllWords()
      : VOCABULARY_DATA[topicKey].words.map((w, i) => ({ ...w, topic: topicKey, wordIndex: i }));

    // Shuffle
    this.words = this.shuffleArray([...this.words]);
    this.render();
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  get currentWord() {
    return this.words[this.currentIndex];
  }

  render() {
    const container = document.getElementById('flashcard-view');
    if (!container) return;

    const total = this.words.length;
    const current = this.currentIndex + 1;
    const word = this.currentWord;

    container.innerHTML = `
      <div class="fc-wrapper">
        <div class="fc-header">
          <h2 class="section-title">
            <span class="section-icon">️</span>
            Flashcard học từ vựng
          </h2>
          <div class="fc-topic-selector">
            ${this.renderTopicButtons()}
          </div>
        </div>

        <div class="fc-progress-bar-wrapper">
          <div class="fc-progress-text">${current} / ${total}</div>
          <div class="fc-progress-bar">
            <div class="fc-progress-fill" style="width: ${(current / total) * 100}%"></div>
          </div>
        </div>

        <div class="fc-card-area">
          <button class="fc-nav-btn fc-prev" id="fc-prev" onclick="flashcardModule.prev()" ${this.currentIndex === 0 ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div class="fc-card-container">
            <div class="fc-card ${this.isFlipped ? 'flipped' : ''}" id="fc-card" onclick="flashcardModule.flip()">
              <div class="fc-face fc-front">
                <div class="fc-topic-badge">${VOCABULARY_DATA[word.topic]?.name || word.topicName || ''}</div>
                <div class="fc-hanzi">${word.hanzi}</div>
                <div class="fc-hint">Nhấn để xem nghĩa</div>
                <div class="fc-flip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                </div>
              </div>
              <div class="fc-face fc-back">
                <div class="fc-pinyin">${word.pinyin}</div>
                <div class="fc-meaning">${word.meaning}</div>
                <div class="fc-example">${word.example}</div>
              </div>
            </div>
          </div>

          <button class="fc-nav-btn fc-next" id="fc-next" onclick="flashcardModule.next()" ${this.currentIndex === total - 1 ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div class="fc-actions">
          <button class="fc-btn fc-btn-unknown" onclick="flashcardModule.markCurrent(false)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Chưa nhớ
          </button>
          <button class="fc-btn fc-btn-tts" onclick="flashcardModule.speak()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            Nghe
          </button>
          <button class="fc-btn fc-btn-known" onclick="flashcardModule.markCurrent(true)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Nhớ rồi
          </button>
        </div>
      </div>
    `;
  }

  renderTopicButtons() {
    const topics = [{ key: 'all', name: 'Tất cả', icon: '' }, ...Object.entries(VOCABULARY_DATA).map(([k, v]) => ({ key: k, name: v.name, icon: v.icon }))];
    return topics.map(t => `
      <button class="topic-btn ${this.currentTopic === t.key ? 'active' : ''}" 
              onclick="flashcardModule.init('${t.key}')">
        ${t.name}
      </button>
    `).join('');
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    const card = document.getElementById('fc-card');
    if (card) card.classList.toggle('flipped', this.isFlipped);

    // Speak on flip to back
    if (this.isFlipped) this.speak();
  }

  next() {
    if (this.currentIndex < this.words.length - 1) {
      this.currentIndex++;
      this.isFlipped = false;
      this.render();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false;
      this.render();
    }
  }

  markCurrent(known) {
    const word = this.currentWord;
    const wordIndex = VOCABULARY_DATA[word.topic]?.words.findIndex(w => w.hanzi === word.hanzi) ?? 0;
    markWordKnown(word.topic, wordIndex, known);

    // Visual feedback
    const card = document.getElementById('fc-card');
    if (card) {
      card.classList.add(known ? 'card-known' : 'card-unknown');
      setTimeout(() => {
        card.classList.remove('card-known', 'card-unknown');
        this.next();
      }, 400);
    } else {
      this.next();
    }
  }

  speak() {
    const word = this.currentWord;
    if (!word) return;
    const utter = new SpeechSynthesisUtterance(word.hanzi);
    utter.lang = 'zh-CN';
    utter.rate = 0.8;
    speechSynthesis.speak(utter);
  }
}

const flashcardModule = new FlashcardModule();
