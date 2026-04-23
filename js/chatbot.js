// ============================================================
// CHATBOT.JS - AI Chatbot với Gemini API – Trung 你好
// ============================================================

const SYSTEM_PROMPT = `Bạn là giáo viên tiếng Trung thân thiện tên là "Nhím Lão Sư".
Nhiệm vụ của bạn:
- Giải thích từ vựng, ngữ pháp tiếng Trung cho người Việt Nam
- Luôn cung cấp: Hán tự, Pinyin, nghĩa tiếng Việt và ví dụ khi giải thích từ
- Tạo bài tập, câu hỏi luyện tập khi được yêu cầu
- Hội thoại bằng tiếng Trung khi người dùng muốn luyện tập
- Trả lời ngắn gọn, dễ hiểu, thân thiện
- Dùng emoji phù hợp để bài học thêm vui vẻ
- Nếu người dùng hỏi bằng tiếng Việt, trả lời bằng tiếng Việt (nhưng luôn kèm ví dụ tiếng Trung)
- Khuyến khích người học, tạo động lực
- Xưng hô theo phong cách cổ trang

Định dạng khi giải thích từ:
 **[Hán tự]** - [Pinyin]
 Nghĩa: [Nghĩa tiếng Việt]
 Ví dụ: [Câu ví dụ tiếng Trung] - [Nghĩa tiếng Việt]`;

const DEFAULT_API_KEY = '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';
const API_KEY_STORAGE = 'nhim_gemini_api_key';

function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || DEFAULT_API_KEY;
}

function saveApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

function detectProvider(key) {
  if (key.startsWith('gsk_')) return 'groq';
  if (key.startsWith('AIza')) return 'gemini';
  return 'unknown';
}

class ChatbotModule {
  constructor() {
    this.conversationHistory = [];
    this.isLoading = false;
    this.container = null;
  }

  init() {
    this.container = document.getElementById('chatbot-view');
    if (!this.container) return;
    this.loadHistory(); // loads history first, then calls render()
    // If still no render happened (empty history), render now
    if (!document.getElementById('chat-messages')) {
      this.render();
    }
  }

  // ---- API KEY SETUP SCREEN ----
  renderApiSetup() {
    this.container.innerHTML = `
      <div class="chat-header">
        <h2 class="section-title">
          
          Trợ lý AI học tiếng Trung
        </h2>
      </div>
      <div class="chat-main">
        <div class="api-setup-wrapper">
          <div class="api-setup-card">
            <div class="api-setup-icon"></div>
            <h3 class="api-setup-title">Thiết lập Gemini API Key</h3>
            <p class="api-setup-desc">
              Để sử dụng AI Lão Sư, bạn cần nhập Gemini API Key của mình.<br>
              Key được lưu trên máy của bạn, không gửi đi đâu khác.
            </p>
            <div class="api-setup-steps">
              <div class="api-step">
                <span class="api-step-num">1</span>
                <span>Truy cập <a href="https://aistudio.google.com/apikey" target="_blank" class="api-link">aistudio.google.com/apikey</a></span>
              </div>
              <div class="api-step">
                <span class="api-step-num">2</span>
                <span>Đăng nhập Google và tạo API Key mới (miễn phí)</span>
              </div>
              <div class="api-step">
                <span class="api-step-num">3</span>
                <span>Dán key vào ô bên dưới và nhấn Lưu</span>
              </div>
            </div>
            <div class="api-input-group">
              <input type="password" id="api-key-input" class="api-key-input"
                placeholder="AIza..."
                onkeydown="if(event.key==='Enter') chatbotModule.saveKey()">
              <button class="api-key-toggle" onclick="chatbotModule.toggleKeyVisibility()" title="Hiện/ẩn key">️</button>
            </div>
            <button class="api-save-btn" onclick="chatbotModule.saveKey()">
               Lưu và bắt đầu chat
            </button>
            <p class="api-note"> Free tier của Gemini: ~1500 request/ngày, hoàn toàn miễn phí</p>
          </div>
        </div>
      </div>
    `;
  }

  toggleKeyVisibility() {
    const inp = document.getElementById('api-key-input');
    if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
  }

  saveKey() {
    const inp = document.getElementById('api-key-input');
    if (!inp) return;
    const key = inp.value.trim();
    if (!key || !key.startsWith('AIza')) {
      inp.style.borderColor = 'var(--red)';
      inp.placeholder = 'Key không hợp lệ! Phải bắt đầu bằng AIza...';
      return;
    }
    saveApiKey(key);
    this.render();
    this.loadHistory();
  }

  // ---- MAIN CHAT UI ----
  render() {
    const hasKey = !!getApiKey();
    this.container.innerHTML = `
      <div class="chat-header">
        <h2 class="section-title">
          
          Trợ lý AI học tiếng Trung
        </h2>
        <div class="chat-header-actions">
          <div class="chat-status">
            <span class="status-dot ${hasKey ? '' : 'dot-offline'}"></span>
            <span>${hasKey ? 'Lão Sư AI đang online' : 'Chưa có API Key'}</span>
          </div>
          <button class="chat-key-btn" onclick="chatbotModule.showChangeKey()" title="Cài đặt API Key"></button>
          <button class="chat-clear-btn" onclick="chatbotModule.clearChat()" title="Xóa lịch sử">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      ${!hasKey ? `
      <div class="api-key-banner">
        <div class="api-key-banner-left">
          <span class="api-banner-icon"></span>
          <div>
            <div class="api-banner-title">Cần nhập Gemini API Key để sử dụng AI</div>
            <div class="api-banner-desc">Miễn phí tại <a href="https://aistudio.google.com/apikey" target="_blank" class="api-link">aistudio.google.com/apikey</a></div>
          </div>
        </div>
        <button class="api-banner-btn" onclick="chatbotModule.promptApiKey()">Nhập API Key →</button>
      </div>
      ` : ''}

      <div class="chat-main">
        <div class="chat-messages" id="chat-messages">
          ${this.renderWelcome()}
          ${this.conversationHistory.map(msg => this.renderMessage(msg)).join('')}
        </div>

        <div class="chat-quick-actions">
          <button class="quick-btn" onclick="chatbotModule.sendQuick('Hãy dạy tôi 5 từ mới về chủ đề hàng ngày')">
             Học từ mới
          </button>
          <button class="quick-btn" onclick="chatbotModule.sendQuick('Hãy tạo 3 câu hỏi trắc nghiệm tiếng Trung cho tôi')">
             Ra bài tập
          </button>
          <button class="quick-btn" onclick="chatbotModule.sendQuick('Hãy nói chuyện với tôi bằng tiếng Trung đơn giản')">
             Luyện hội thoại
          </button>
          <button class="quick-btn" onclick="chatbotModule.sendQuick('Giải thích ngữ pháp 把 (bǎ) cho tôi')">
             Hỏi ngữ pháp
          </button>
        </div>

        <div class="chat-input-area">
          <div class="chat-input-wrapper">
            <textarea
              id="chat-input"
              class="chat-input"
              placeholder="${hasKey ? 'Nhập câu hỏi về tiếng Trung... (Ví dụ: 你好 nghĩa là gì?)' : 'Vui lòng nhập API Key trước...'}"
              rows="1"
              onkeydown="chatbotModule.handleKeyDown(event)"
              oninput="chatbotModule.autoResize(this)"
              ${!hasKey ? 'readonly onclick="chatbotModule.promptApiKey()"' : ''}
            ></textarea>
            <button class="chat-send-btn" id="chat-send-btn" onclick="${hasKey ? 'chatbotModule.send()' : 'chatbotModule.promptApiKey()'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div class="chat-input-hint">Nhấn <kbd>Ctrl+Enter</kbd> để gửi • <kbd>Enter</kbd> xuống dòng</div>
        </div>
      </div>
    `;

    this.scrollToBottom();
  }

  promptApiKey() {
    const newKey = prompt(' Nhập API Key của bạn:\n\n• Groq (gsk_...): groq.com/keys  [FREE, nhanh]\n• Gemini (AIza...): aistudio.google.com/apikey  [FREE]');
    if (newKey === null) return;
    const key = newKey.trim();
    if ((key.startsWith('AIza') || key.startsWith('gsk_')) && key.length > 20) {
      saveApiKey(key);
      this.render();
      this.scrollToBottom();
    } else {
      alert(' API Key không hợp lệ!\nGroq key bắt đầu bằng: gsk_\nGemini key bắt đầu bằng: AIza');
    }
  }

  showChangeKey() {
    const current = getApiKey();
    const provider = detectProvider(current);
    const newKey = prompt(` Đổi API Key (hiện tại: ${provider.toUpperCase()})\n\n• Groq (gsk_...): groq.com/keys\n• Gemini (AIza...): aistudio.google.com/apikey`);
    if (newKey === null) return;
    const key = newKey.trim();
    if ((key.startsWith('AIza') || key.startsWith('gsk_')) && key.length > 20) {
      saveApiKey(key);
      this.render();
      alert(` Đã chuyển sang ${detectProvider(key).toUpperCase()}!`);
    } else if (key) {
      alert(' Key không hợp lệ! Cần bắt đầu bằng gsk_ hoặc AIza...');
    }
  }

  renderWelcome() {
    if (this.conversationHistory.length > 0) return '';
    return `
      <div class="chat-welcome">
        <div class="welcome-avatar">‍</div>
        <div class="welcome-bubble">
          <div class="welcome-title">Chào mừng! 你好！</div>
          <div class="welcome-text">
            Tôi là <strong>Lão Sư AI</strong>, trợ lý học tiếng Trung của bạn.
            Tôi có thể giúp bạn:
          </div>
          <ul class="welcome-list">
            <li> Giải thích từ vựng & ngữ pháp</li>
            <li>️ Luyện viết và đọc Hán tự</li>
            <li> Hội thoại bằng tiếng Trung</li>
            <li> Ra bài tập luyện tập</li>
          </ul>
          <div class="welcome-cta">Bắt đầu nào! 开始学习吧！</div>
        </div>
      </div>
    `;
  }

  renderMessage(msg) {
    const isUser = msg.role === 'user';
    const time = new Date(msg.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="chat-message ${isUser ? 'msg-user' : 'msg-bot'}">
        ${!isUser ? `<div class="msg-avatar">‍</div>` : ''}
        <div class="msg-content-wrapper">
          <div class="msg-bubble">
            ${this.formatContent(msg.content)}
          </div>
          <div class="msg-time">${time}</div>
        </div>
        ${isUser ? `<div class="msg-avatar user-avatar"></div>` : ''}
      </div>
    `;
  }

  formatContent(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  renderTyping() {
    return `
      <div class="chat-message msg-bot" id="typing-indicator">
        <div class="msg-avatar">‍</div>
        <div class="msg-content-wrapper">
          <div class="msg-bubble typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;
  }

  async send() {
    const input = document.getElementById('chat-input');
    if (!input || this.isLoading) return;

    const text = input.value.trim();
    if (!text) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      this.renderApiSetup();
      return;
    }

    input.value = '';
    input.style.height = 'auto';
    this.isLoading = true;

    const userMsg = { role: 'user', content: text, timestamp: Date.now() };
    this.conversationHistory.push(userMsg);

    const messagesEl = document.getElementById('chat-messages');
    if (messagesEl) {
      messagesEl.insertAdjacentHTML('beforeend', this.renderMessage(userMsg));
      messagesEl.insertAdjacentHTML('beforeend', this.renderTyping());
    }

    this.scrollToBottom();
    const sendBtn = document.getElementById('chat-send-btn');
    if (sendBtn) sendBtn.disabled = true;

    try {
      const response = await this.callAI(text, apiKey);
      const botMsg = { role: 'model', content: response, timestamp: Date.now() };
      this.conversationHistory.push(botMsg);

      const typing = document.getElementById('typing-indicator');
      if (typing) typing.remove();
      if (messagesEl) {
        messagesEl.insertAdjacentHTML('beforeend', this.renderMessage(botMsg));
      }

      if (response.length < 200) this.speakChinese(response);
      this.saveHistory();
    } catch (err) {
      const typing = document.getElementById('typing-indicator');
      if (typing) typing.remove();

      // Parse friendly error message
      let errMsg = err.message || 'Lỗi không xác định';
      let hint = 'Vui lòng thử lại sau.';

      if (errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429')) {
        errMsg = 'API Key đã hết quota hôm nay';
        hint = 'Free tier giới hạn ~1500 request/ngày. Thử lại vào ngày mai hoặc <button onclick="chatbotModule.showChangeKey()" class="inline-btn">đổi API Key khác </button>';
      } else if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('403')) {
        errMsg = 'API Key không hợp lệ';
        hint = '<button onclick="chatbotModule.showChangeKey()" class="inline-btn">Nhập lại API Key </button>';
      } else if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError')) {
        errMsg = 'Không có kết nối mạng';
        hint = 'Kiểm tra kết nối internet và thử lại.';
      }

      if (messagesEl) {
        messagesEl.insertAdjacentHTML('beforeend', `
          <div class="chat-message msg-bot">
            <div class="msg-avatar">‍</div>
            <div class="msg-content-wrapper">
              <div class="msg-bubble error-bubble">
                <div class="error-title"> ${errMsg}</div>
                <div class="error-hint">${hint}</div>
              </div>
            </div>
          </div>
        `);
      }
    } finally {
      this.isLoading = false;
      if (sendBtn) sendBtn.disabled = false;
      this.scrollToBottom();
    }
  }

  async callAI(userMessage, apiKey) {
    const provider = detectProvider(apiKey);
    if (provider === 'groq') return this.callGroq(userMessage, apiKey);
    if (provider === 'gemini') return this.callGemini(userMessage, apiKey);
    throw new Error('API Key không hợp lệ. Cần key bắt đầu bằng gsk_ (Groq) hoặc AIza (Gemini).');
  }

  async callGroq(userMessage, apiKey) {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add conversation history (max 10)
    const history = this.conversationHistory.slice(-11, -1);
    for (const msg of history) {
      messages.push({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.content
      });
    }
    messages.push({ role: 'user', content: userMessage });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.8,
        max_tokens: 1024,
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'Không có phản hồi.';
  }

  async callGemini(userMessage, apiKey) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const contents = [];
    const history = this.conversationHistory.slice(-11, -1);
    for (const msg of history) {
      contents.push({ role: msg.role, parts: [{ text: msg.content }] });
    }
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 1024, topP: 0.9 }
    };

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';
  }


  sendQuick(text) {
    const input = document.getElementById('chat-input');
    if (input) { input.value = text; this.send(); }
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); this.send(); }
  }

  autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  scrollToBottom() {
    setTimeout(() => {
      const msgs = document.getElementById('chat-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 50);
  }

  speakChinese(text) {
    const chineseRegex = /[\u4e00-\u9fff]+/g;
    const chinese = text.match(chineseRegex);
    if (chinese && chinese[0]) {
      const utter = new SpeechSynthesisUtterance(chinese[0]);
      utter.lang = 'zh-CN'; utter.rate = 0.8;
      speechSynthesis.speak(utter);
    }
  }

  clearChat() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện?')) {
      this.conversationHistory = [];
      localStorage.removeItem('chat_history');
      this.render();
    }
  }

  saveHistory() {
    localStorage.setItem('chat_history', JSON.stringify(this.conversationHistory.slice(-50)));
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('chat_history');
      if (saved) {
        this.conversationHistory = JSON.parse(saved);
        this.render();
      }
    } catch (e) {
      this.conversationHistory = [];
    }
  }
}

const chatbotModule = new ChatbotModule();
