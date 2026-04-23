const fs = require('fs');
const path = require('path');

const cssCode = `
/* ============================================================
   FOOTER
   ============================================================ */
.app-footer {
  margin-top: 40px;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 40px 24px 20px;
  width: 100%;
}
.footer-container {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: var(--sh1);
}
.footer-brand-text {
  font-size: 22px;
  font-weight: 800;
  color: var(--t1);
}
.footer-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--t2);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: var(--tr);
}
.footer-link svg {
  color: var(--purple);
}
.footer-link:hover {
  color: var(--purple);
  transform: translateX(4px);
}
.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--t3);
  max-width: 980px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .footer-container {
    flex-direction: column;
  }
}
`;

const htmlFooter = `
    <!-- ========== FOOTER ========== -->
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img src="assets/logo.png" alt="Logo" class="footer-logo">
          <div class="footer-brand-text">Trung 你好</div>
        </div>
        <div class="footer-contact">
          <h4 class="footer-title">Liên hệ với tôi</h4>
          <div class="footer-links">
            <a href="mailto:Trungho20050@gmail.com" class="footer-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email: Trungho20050@gmail.com
            </a>
            <a href="tel:0345822179" class="footer-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              SĐT: 0345822179
            </a>
            <a href="https://www.facebook.com/trungthanhho2005" target="_blank" rel="noopener" class="footer-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              Facebook: trungthanhho2005
            </a>
            <a href="https://www.youtube.com/@trungh.t95" target="_blank" rel="noopener" class="footer-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              Youtube: @trungh.t95
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Trung 你好. Nền tảng học tiếng Trung.
      </div>
    </footer>
`;

const targetDir = __dirname;

// Append CSS to style.css
const cssPath = path.join(targetDir, 'css', 'style.css');
if (fs.existsSync(cssPath)) {
  let styleContent = fs.readFileSync(cssPath, 'utf8');
  if (!styleContent.includes('.app-footer')) {
    fs.writeFileSync(cssPath, styleContent + cssCode, 'utf8');
    console.log('Appended footer CSS to style.css');
  }
}

// Inject HTML into all files before </div><!-- /main-content -->
const files = ['index.html', 'hsk1.html', 'hsk2.html', 'pinyin.html', 'admin.html'];

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('class="app-footer"')) {
      // Find the main-content closing div
      // It can be </div><!-- /main-content -->
      const regex = /(<\/div>\s*<!-- \/main-content -->)/;
      if (regex.test(content)) {
        content = content.replace(regex, htmlFooter + '\n$1');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Injected footer into " + file);
      } else {
        // Fallback for files that don't have exactly that comment
        // Try to insert before </div></div></body>
        // or just append before </body> if all else fails
        const fallbackRegex = /(<\/body>)/;
        if (fallbackRegex.test(content)) {
          content = content.replace(fallbackRegex, htmlFooter + '\n$1');
          fs.writeFileSync(filePath, content, 'utf8');
          console.log("Injected footer into " + file + " (fallback)");
        }
      }
    }
  }
});
