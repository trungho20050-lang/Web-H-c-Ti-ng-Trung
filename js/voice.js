// ============================================================
// VOICE.JS – Multi-character TTS Engine for Nhim Study
// Nhân vật giọng nói theo ngữ cảnh
// ============================================================

const VoiceManager = (() => {

  // ---- Danh sách nhân vật giọng nói ----
  const CHARACTERS = {
    teacher: {
      name: 'Thầy Minh',
      lang: 'zh-CN',
      rate: 0.65,   // Chậm rãi, rõ ràng
      pitch: 0.9,   // Giọng trầm
      volume: 1.0,
      voiceHint: ['male', 'zh', 'CN'],
      label: '‍ Thầy Minh đọc cho bạn nghe'
    },
    girl: {
      name: 'Tiểu Mei',
      lang: 'zh-CN',
      rate: 0.85,   // Nhanh hơn, tự nhiên
      pitch: 1.3,   // Giọng cao, vui tươi
      volume: 1.0,
      voiceHint: ['female', 'zh', 'CN'],
      label: ' Tiểu Mei phát âm mẫu'
    },
    master: {
      name: 'Lão Sư',
      lang: 'zh-CN',
      rate: 0.55,   // Rất chậm, trang nghiêm
      pitch: 0.75,  // Giọng rất trầm
      volume: 0.95,
      voiceHint: ['male', 'zh'],
      label: ' Lão Sư giải nghĩa'
    },
    announcer: {
      name: 'Phát thanh viên',
      lang: 'zh-CN',
      rate: 0.9,    // Chuẩn mực, rõ ràng
      pitch: 1.0,
      volume: 1.0,
      voiceHint: ['zh', 'CN'],
      label: ' Phát âm chuẩn'
    },
    viet: {
      name: 'Giáo viên',
      lang: 'vi-VN',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
      voiceHint: ['vi', 'VN'],
      label: ' Nghĩa tiếng Việt'
    }
  };

  // ---- Ánh xạ ngữ cảnh → nhân vật ----
  const CONTEXT_MAP = {
    flashcard_front: 'teacher',    // Xem mặt trước → Thầy Minh đọc
    flashcard_back:  'girl',       // Lật mặt sau → Tiểu Mei đọc luôn
    flashcard_btn:   'announcer',  // Bấm nút Nghe → Phát thanh viên
    quiz_question:   'teacher',    // Câu hỏi quiz → Thầy Minh
    quiz_correct:    'girl',       // Trả lời đúng → Tiểu Mei
    quiz_wrong:      'master',     // Trả lời sai → Lão Sư nhắc lại
    vocabulary:      'announcer',  // Từ điển → Phát thanh viên chuẩn
    chatbot:         'master',     // AI chat → Lão Sư huyền bí
    meaning_vi:      'viet',       // Đọc nghĩa tiếng Việt
  };

  let voices = [];
  let isLoaded = false;
  let currentUtterance = null;

  // ---- Load voices ----
  function loadVoices() {
    voices = speechSynthesis.getVoices();
    isLoaded = voices.length > 0;
  }

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();

  // ---- Tìm voice phù hợp với nhân vật ----
  function findVoice(character) {
    if (!isLoaded) loadVoices();
    const char = CHARACTERS[character];
    if (!char) return null;

    // Thử tìm theo ngôn ngữ và giới tính
    const langVoices = voices.filter(v => v.lang.startsWith(char.lang.split('-')[0]));

    if (char.voiceHint.includes('female')) {
      const femaleVoice = langVoices.find(v =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('woman') ||
        v.name.includes('Tian') ||
        v.name.includes('Mei') ||
        v.name.includes('Ting') ||
        v.name.includes('xiaoyi') ||
        v.name.includes('xiaoxiao')
      );
      if (femaleVoice) return femaleVoice;
    }

    if (char.voiceHint.includes('male')) {
      const maleVoice = langVoices.find(v =>
        v.name.toLowerCase().includes('male') ||
        v.name.includes('Yunxi') ||
        v.name.includes('yunfeng') ||
        v.name.includes('Wang')
      );
      if (maleVoice) return maleVoice;
    }

    // Fallback: lấy voice đầu tiên của ngôn ngữ đó
    return langVoices[0] || null;
  }

  // ---- Hàm phát âm chính ----
  function speak(text, context = 'flashcard_btn', options = {}) {
    if (!text || !text.trim()) return;

    // Dừng giọng đang phát
    speechSynthesis.cancel();

    const characterKey = CONTEXT_MAP[context] || 'announcer';
    const char = CHARACTERS[characterKey];

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang   = options.lang  ?? char.lang;
    utter.rate   = options.rate  ?? char.rate;
    utter.pitch  = options.pitch ?? char.pitch;
    utter.volume = options.volume ?? char.volume;

    const voice = findVoice(characterKey);
    if (voice) utter.voice = voice;

    // Hiện toast thông báo nhân vật đang nói
    showVoiceToast(char.label, characterKey);

    currentUtterance = utter;
    speechSynthesis.speak(utter);

    return utter;
  }

  // ---- Phát âm kép: Hán tự + Pinyin + Nghĩa ----
  function speakFull(word, context = 'flashcard_back') {
    if (!word) return;

    speechSynthesis.cancel();
    const queue = [];

    // 1. Đọc chữ Hán (Thầy Minh hoặc nhân vật context)
    const hanziUtter = new SpeechSynthesisUtterance(word.hanzi);
    hanziUtter.lang  = 'zh-CN';
    hanziUtter.rate  = CHARACTERS[CONTEXT_MAP[context]].rate;
    hanziUtter.pitch = CHARACTERS[CONTEXT_MAP[context]].pitch;
    const zhVoice = findVoice(CONTEXT_MAP[context]);
    if (zhVoice) hanziUtter.voice = zhVoice;
    queue.push(hanziUtter);

    // 2. Đọc nghĩa tiếng Việt (giáo viên Việt)
    if (word.meaning) {
      const meaningUtter = new SpeechSynthesisUtterance(word.meaning);
      meaningUtter.lang  = 'vi-VN';
      meaningUtter.rate  = 0.9;
      meaningUtter.pitch = 1.0;
      const viVoice = findVoice('viet');
      if (viVoice) meaningUtter.voice = viVoice;
      queue.push(meaningUtter);
    }

    // Phát lần lượt
    function playNext(i) {
      if (i >= queue.length) return;
      queue[i].onend = () => playNext(i + 1);
      speechSynthesis.speak(queue[i]);
    }

    showVoiceToast(` Đang phát âm: ${word.hanzi} – ${word.meaning || ''}`, CONTEXT_MAP[context]);
    playNext(0);
  }

  // ---- Toast thông báo nhân vật ----
  function showVoiceToast(label, characterKey) {
    // Xoá toast cũ
    const old = document.getElementById('voice-toast');
    if (old) old.remove();

    const colors = {
      teacher:   'linear-gradient(135deg,#7c3aed,#6d28d9)',
      girl:      'linear-gradient(135deg,#db2777,#9d174d)',
      master:    'linear-gradient(135deg,#059669,#065f46)',
      announcer: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
      viet:      'linear-gradient(135deg,#d97706,#92400e)',
    };

    const toast = document.createElement('div');
    toast.id = 'voice-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${colors[characterKey] || colors.announcer};
      color: #fff;
      padding: 10px 18px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: toastIn 0.3s ease;
      pointer-events: none;
    `;

    // Thêm sóng âm animated
    toast.innerHTML = `
      <span style="display:flex;gap:3px;align-items:center">
        <span class="voice-wave" style="width:3px;height:14px;background:rgba(255,255,255,0.9);border-radius:2px;animation:waveBar 0.6s ease infinite;animation-delay:0s"></span>
        <span class="voice-wave" style="width:3px;height:20px;background:rgba(255,255,255,0.9);border-radius:2px;animation:waveBar 0.6s ease infinite;animation-delay:0.15s"></span>
        <span class="voice-wave" style="width:3px;height:12px;background:rgba(255,255,255,0.9);border-radius:2px;animation:waveBar 0.6s ease infinite;animation-delay:0.3s"></span>
      </span>
      ${label}
    `;

    // CSS animations
    if (!document.getElementById('voice-toast-css')) {
      const style = document.createElement('style');
      style.id = 'voice-toast-css';
      style.textContent = `
        @keyframes toastIn {
          from { opacity:0; transform: translateY(20px) scale(0.9); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes waveBar {
          0%,100% { transform: scaleY(0.4); }
          50%      { transform: scaleY(1.2); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Tự xoá sau 2.5 giây
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 2500);
  }

  // ---- API công khai ----
  return {
    speak,
    speakFull,
    showVoiceToast,
    CHARACTERS,
    CONTEXT_MAP,

    // Shorthand helpers
    speakFlashcardFront: (text) => speak(text, 'flashcard_front'),
    speakFlashcardBack:  (word) => speakFull(word, 'flashcard_back'),
    speakFlashcardBtn:   (text) => speak(text, 'flashcard_btn'),
    speakQuizQuestion:   (text) => speak(text, 'quiz_question'),
    speakQuizCorrect:    (text) => speak(text, 'quiz_correct'),
    speakQuizWrong:      (text) => speak(text, 'quiz_wrong'),
    speakVocabulary:     (text) => speak(text, 'vocabulary'),
    speakChatbot:        (text) => speak(text, 'chatbot'),
    stop: ()  => speechSynthesis.cancel(),
  };
})();
