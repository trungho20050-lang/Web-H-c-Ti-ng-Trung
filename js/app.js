// ============================================================
// APP.JS - Core logic, routing, dashboard – Trung 你好
// ============================================================

let currentView = null;

const VIEW_NAMES = ['dashboard', 'flashcard', 'quiz', 'vocabulary', 'video', 'chatbot'];

// ---- ROUTING ----
function showView(viewName) {
  currentView = viewName;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === viewName);
  });

  // Hide ALL views explicitly
  VIEW_NAMES.forEach(name => {
    const el = document.getElementById(`${name}-view`);
    if (el) {
      el.classList.remove('view-active', 'view-flex');
      el.style.display = 'none';
    }
  });

  // Show target view
  const target = document.getElementById(`${viewName}-view`);
  if (target) {
    if (viewName === 'chatbot') {
      target.classList.add('view-active', 'view-flex');
      target.style.display = 'flex';
      target.style.flexDirection = 'column';
      target.style.height = 'calc(100vh - 60px)';
      target.style.paddingBottom = '0';
    } else {
      target.classList.add('view-active');
      target.style.display = 'block';
    }
  }


  // Init modules
  if (viewName === 'flashcard') {
    flashcardModule.init('greetings');
  } else if (viewName === 'quiz') {
    quizModule.init('all', 'multiple');
  } else if (viewName === 'chatbot') {
    chatbotModule.init();
  } else if (viewName === 'dashboard') {
    renderDashboard();
  } else if (viewName === 'vocabulary') {
    renderVocabularyList();
  } else if (viewName === 'video') {
    renderVideoCourses();
  }

  // Close mobile sidebar
  closeSidebar();
}

function toggleSidebar() {
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('show');
  } else {
    const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('nhim_sidebar_collapsed', isCollapsed ? 'true' : 'false');
  }
}

function closeSidebar() {
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('show');
  }
}

// ---- DASHBOARD ----
function renderDashboard() {
  const stats = getTotalStats();
  const pct = stats.total > 0 ? Math.round((stats.known / stats.total) * 100) : 0;
  const streak = getStreak();
  const today = getTodayStudied();
  const xp = getXP();

  const container = document.getElementById('dashboard-view');
  if (!container) return;

  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - pct / 100);

  container.innerHTML = `
    <div class="dashboard">
      <!-- Greeting Banner -->
      <div class="dash-greeting">
        <div class="dash-greeting-left">
          <div class="dash-mascot"></div>
          <div>
            <div class="dash-hello">Chào mừng trở lại! 你好 </div>
            <div class="dash-subtitle">Tiếp tục hành trình học tiếng Trung của bạn cùng Trung 你好</div>
          </div>
        </div>
        <div class="dash-date-badge">
          <div class="dash-date-day">${new Date().toLocaleDateString('vi-VN', { weekday: 'long' })}</div>
          <div class="dash-date-full">${new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="dash-stats-grid">
        <div class="stat-card stat-purple">
          <div class="stat-glow"></div>
          
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Tổng từ vựng</div>
        </div>
        <div class="stat-card stat-green">
          <div class="stat-glow"></div>
          
          <div class="stat-value">${stats.known}</div>
          <div class="stat-label">Từ đã thuộc</div>
        </div>
        <div class="stat-card stat-orange">
          <div class="stat-glow"></div>
          
          <div class="stat-value">${streak}</div>
          <div class="stat-label">Ngày liên tiếp</div>
        </div>
        <div class="stat-card stat-blue">
          <div class="stat-glow"></div>
          
          <div class="stat-value">${xp}</div>
          <div class="stat-label">Kinh nghiệm XP</div>
        </div>
      </div>

      <!-- Progress + Actions -->
      <div class="dash-main-row">
        <!-- Overall Progress Ring -->
        <div class="dash-progress-card">
          <h3 class="dash-card-title"> Tiến trình học</h3>
          <div class="progress-ring-area">
            <svg class="ring-svg" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#a78bfa"/>
                  <stop offset="100%" stop-color="#34d399"/>
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="50" cy="50" r="45" fill="none"
                stroke="url(#ringGrad)" stroke-width="8"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashOffset}"
                stroke-linecap="round"
                transform="rotate(-90 50 50)"
                class="ring-arc"/>
            </svg>
            <div class="ring-center">
              <div class="ring-pct">${pct}%</div>
              <div class="ring-sub">Hoàn thành</div>
            </div>
          </div>
          <div class="topic-bars">
            ${Object.entries(VOCABULARY_DATA).map(([key, topic]) => {
              const s = getTopicStats(key);
              const p = s.total > 0 ? Math.round((s.known / s.total) * 100) : 0;
              return `
                <div class="topic-bar-item">
                  <div class="topic-bar-header">
                    <span>${topic.icon} ${topic.name}</span>
                    <span class="topic-bar-count">${s.known}/${s.total}</span>
                  </div>
                  <div class="topic-bar-track">
                    <div class="topic-bar-fill" style="width:${p}%;background:${topic.color}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="dash-actions-col">
          <h3 class="dash-card-title"> Bắt đầu học</h3>
          <div class="action-grid">
            <button class="action-btn action-btn-purple" onclick="showView('flashcard')">
              <div class="action-btn-icon">️</div>
              <div class="action-btn-text">
                <div class="action-btn-title">Flashcard</div>
                <div class="action-btn-desc">Học từ với thẻ 3D</div>
              </div>
              <svg class="action-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="action-btn action-btn-pink" onclick="showView('quiz')">
              <div class="action-btn-icon"></div>
              <div class="action-btn-text">
                <div class="action-btn-title">Kiểm tra</div>
                <div class="action-btn-desc">Trắc nghiệm & Điền từ</div>
              </div>
              <svg class="action-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="action-btn action-btn-teal" onclick="showView('chatbot')">
              <div class="action-btn-icon"></div>
              <div class="action-btn-text">
                <div class="action-btn-title">AI Lão Sư</div>
                <div class="action-btn-desc">Hỏi đáp Gemini AI</div>
              </div>
              <svg class="action-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="action-btn action-btn-amber" onclick="showView('vocabulary')">
              <div class="action-btn-icon"></div>
              <div class="action-btn-text">
                <div class="action-btn-title">Từ điển</div>
                <div class="action-btn-desc">Tra cứu từ vựng</div>
              </div>
              <svg class="action-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <!-- HSK Section -->
          <div class="hsk-banner" onclick="window.location.href='hsk1.html'" style="
            display:flex;align-items:center;justify-content:space-between;gap:12px;
            background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.06));
            border:1px solid rgba(251,191,36,0.25);
            border-radius:14px;padding:14px 18px;cursor:pointer;
            transition:all 0.25s ease;margin-bottom:0;
          " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px rgba(251,191,36,0.2)'"
             onmouseout="this.style.transform='';this.style.boxShadow=''">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:26px"></div>
              <div>
                <div style="font-size:15px;font-weight:800;color:#000">Giáo trình HSK 1</div>
                <div style="font-size:12px;color:#333;margin-top:2px">150 từ vựng cơ bản • Flashcard + Quiz</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px">Học ngay →</span>
            </div>
          </div>

          <!-- Today's Activity -->

          <div class="today-card">
            <div class="today-title">️ Hôm nay học được</div>
            <div class="today-stats">
              <div class="today-stat">
                <div class="today-stat-val">${today}</div>
                <div class="today-stat-lbl">Từ mới</div>
              </div>
              <div class="today-divider"></div>
              <div class="today-stat">
                <div class="today-stat-val">${streak}</div>
                <div class="today-stat-lbl">Ngày streak</div>
              </div>
              <div class="today-divider"></div>
              <div class="today-stat">
                <div class="today-stat-val">${xp}</div>
                <div class="today-stat-lbl">XP tích lũy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Video do Admin quản lý qua trang admin.html → lưu vào localStorage 'nhim_videos'
const VIDEO_COURSES = []; // Không dùng data cứng nữa

let activeVideoId = null;
let currentVideoData = [];

async function renderVideoCourses() {
  const container = document.getElementById('video-view');
  if (!container) return;

  container.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--t2)">Đang tải dữ liệu...</div>`;

  try {
    const res = await fetch('/api/videos');
    if (res.ok) {
        currentVideoData = await res.json();
    } else {
        currentVideoData = [];
    }
  } catch(e) {
    console.error('Failed to fetch videos', e);
    currentVideoData = [];
  }

  buildVideoHTML(container);
}

function buildVideoHTML(container) {
  // Nhóm theo category
  const grouped = {};
  currentVideoData.forEach(v => {
    if (!grouped[v.Category]) grouped[v.Category] = [];
    grouped[v.Category].push(v);
  });
  
  const categories = Object.entries(grouped).map(([category, videos]) => ({ category, videos }));

  if (!categories.length) {
    container.innerHTML = `<div class="video-page">
      <div class="video-page-header">
        <h2 class="section-title">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          Các Khóa Học Qua Video
        </h2>
      </div>
      <div style="text-align:center;padding:60px 20px;color:var(--t2)">
        Chưa có video nào. Quản trị viên chưa thêm video mới.
      </div>
    </div>`;
    return;
  }

  const CAT_COLORS = [
    'linear-gradient(135deg,#7c3aed,#6d28d9)',
    'linear-gradient(135deg,#2563eb,#1d4ed8)',
    'linear-gradient(135deg,#059669,#047857)',
    'linear-gradient(135deg,#d97706,#b45309)',
    'linear-gradient(135deg,#dc2626,#b91c1c)',
  ];

  container.innerHTML = `
    <div class="video-page">
      <div class="video-page-header">
        <h2 class="section-title">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          Các Khóa Học Qua Video
        </h2>
        <p class="video-page-sub">Học tiếng Trung qua video YouTube – Nhấn vào card để phát ngay</p>
      </div>

      ${activeVideoId ? `
        <div class="video-player-wrap" id="video-player-wrap">
          <div class="video-embed-container">
            <iframe
              src="https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <button class="video-close-btn" onclick="closeVideo()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Đóng video
          </button>
        </div>
      ` : ''}

      <div class="video-categories">
        ${categories.map((cat, ci) => `
          <div class="video-category">
            <div class="video-cat-header" style="background:${CAT_COLORS[ci % CAT_COLORS.length]}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ${cat.category}
              <span class="video-cat-count">${cat.videos.length} video</span>
            </div>
            <div class="video-grid">
              ${cat.videos.map(v => `
                <div class="video-card ${activeVideoId === v.YoutubeId ? 'video-card-active' : ''}" onclick="playVideo('${v.YoutubeId}')">
                  <div class="video-thumb">
                    <img src="https://img.youtube.com/vi/${v.YoutubeId}/mqdefault.jpg"
                         alt="${v.Title}" loading="lazy" onerror="this.style.display='none'">
                    <div class="video-play-overlay">
                      <div class="video-play-btn">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                      <span class="video-duration">${v.Duration || ''}</span>
                    </div>
                  </div>
                  <div class="video-info">
                    <div class="video-title">${v.Title}</div>
                    <div class="video-desc">${v.Description || ''}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  window.playVideo = function(youtubeId) {
    activeVideoId = youtubeId;
    buildVideoHTML(container);
    const playerWrap = document.getElementById('video-player-wrap');
    if (playerWrap) playerWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.closeVideo = function() {
    activeVideoId = null;
    buildVideoHTML(container);
  };
}

// ---- VOCABULARY LIST ----
function renderVocabularyList() {
  const container = document.getElementById('vocabulary-view');
  if (!container) return;

  let activeTopic = Object.keys(VOCABULARY_DATA)[0];

  function buildHTML() {
    const topic = VOCABULARY_DATA[activeTopic];
    return `
      <div class="vocab-page">
        <div class="vocab-page-header">
          <h2 class="section-title"> Từ điển tiếng Trung</h2>
          <div class="vocab-search-wrap">
            <span class="vocab-search-icon"></span>
            <input type="text" id="vocab-search" class="vocab-search" placeholder="Tìm kiếm từ vựng..." oninput="filterVocab(this.value)">
          </div>
        </div>
        <div class="vocab-layout">
          <div class="vocab-sidebar">
            ${Object.entries(VOCABULARY_DATA).map(([k, v]) => {
              const s = getTopicStats(k);
              return `
                <button class="vocab-topic-btn ${activeTopic === k ? 'active' : ''}"
                        onclick="setActiveTopic('${k}')">
                  <span class="vtb-icon">${v.icon}</span>
                  <span class="vtb-name">${v.name}</span>
                  <span class="vtb-count">${s.known}/${s.total}</span>
                </button>
              `;
            }).join('')}
          </div>
          <div class="vocab-words" id="vocab-words">
            ${renderWordCards(topic)}
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = buildHTML();

  window.setActiveTopic = function(key) {
    activeTopic = key;
    container.innerHTML = buildHTML();
  };
}

function renderWordCards(topic) {
  return topic.words.map((word, i) => {
    const known = isWordKnown(topic.name.toLowerCase(), i);
    return `
      <div class="word-card ${known ? 'word-known' : ''}" onclick="this.classList.toggle('expanded')">
        <div class="word-card-main">
          <div class="word-hanzi-sm">${word.hanzi}</div>
          <div class="word-info">
            <div class="word-pinyin-sm">${word.pinyin}</div>
            <div class="word-meaning-sm">${word.meaning}</div>
          </div>
          <button class="word-speak-btn" onclick="event.stopPropagation(); speakWord('${word.hanzi}')" title="Nghe phát âm">
            
          </button>
        </div>
        <div class="word-card-expanded">
          <div class="word-example-full"> ${word.example}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.filterVocab = function(query) {
  const cards = document.querySelectorAll('.word-card');
  const q = query.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
};

window.speakWord = function(hanzi) {
  const utter = new SpeechSynthesisUtterance(hanzi);
  utter.lang = 'zh-CN';
  utter.rate = 0.8;
  speechSynthesis.speak(utter);
};

// ---- STREAK & XP TRACKING ----
function getStreak() {
  return parseInt(localStorage.getItem('nhim_streak') || '0');
}

function getXP() {
  return parseInt(localStorage.getItem('nhim_xp') || '0');
}

function addXP(amount) {
  const current = getXP();
  localStorage.setItem('nhim_xp', current + amount);
  const el = document.getElementById('xp-count');
  if (el) el.textContent = current + amount;
}

function getTodayStudied() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('nhim_today') || '{"date":"","count":0}');
  return data.date === today ? data.count : 0;
}

function trackStudy() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('nhim_today') || '{"date":"","count":0}');
  if (data.date !== today) {
    data.date = today;
    data.count = 1;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDate = localStorage.getItem('nhim_last_study');
    let streak = parseInt(localStorage.getItem('nhim_streak') || '0');
    if (lastDate === yesterday) streak++;
    else if (lastDate !== today) streak = 1;
    localStorage.setItem('nhim_streak', streak);
    localStorage.setItem('nhim_last_study', today);
  } else {
    data.count++;
  }
  localStorage.setItem('nhim_today', JSON.stringify(data));
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  // Update topbar
  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = getStreak();
  const xpEl = document.getElementById('xp-count');
  if (xpEl) xpEl.textContent = getXP();

  // Khôi phục trạng thái sidebar trên desktop
  if (window.innerWidth > 768 && localStorage.getItem('nhim_sidebar_collapsed') === 'true') {
    document.body.classList.add('sidebar-collapsed');
  }

  trackStudy();

  // Show dashboard by default
  showView('dashboard');
});
