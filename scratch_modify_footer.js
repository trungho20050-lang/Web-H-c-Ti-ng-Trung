const fs = require('fs');
const path = require('path');

const newCSS = `/* ============================================================
   FOOTER
   ============================================================ */
.app-footer {
  margin-top: 40px;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 20px 24px;
  width: 100%;
}
.footer-container {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.footer-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}
.footer-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--t2);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: var(--tr);
}
.footer-link svg {
  color: var(--purple);
}
.footer-link:hover {
  color: var(--purple);
  transform: translateY(-2px);
}
.footer-bottom {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--t3);
  max-width: 980px;
  margin: 0 auto;
}
`;

const newHTML = `<footer class="app-footer">
      <div class="footer-container">
        <div class="footer-links">
          <a href="mailto:Trungho20050@gmail.com" class="footer-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email: Trungho20050@gmail.com
          </a>
          <a href="tel:0345822179" class="footer-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            SĐT: 0345822179
          </a>
          <a href="https://www.facebook.com/trungthanhho2005" target="_blank" rel="noopener" class="footer-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            Facebook
          </a>
          <a href="https://www.youtube.com/@trungh.t95" target="_blank" rel="noopener" class="footer-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            Youtube
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Trung 你好. Nền tảng học tiếng Trung.
      </div>
    </footer>`;

const targetDir = __dirname;

// Replace CSS
const cssPath = path.join(targetDir, 'css', 'style.css');
if (fs.existsSync(cssPath)) {
  let styleContent = fs.readFileSync(cssPath, 'utf8');
  const cssRegex = /\/\* ============================================================\s*FOOTER\s*============================================================ \*\/[\s\S]*?(?=(?:\Z|\n\s*$))/;
  if (cssRegex.test(styleContent)) {
    styleContent = styleContent.replace(cssRegex, newCSS);
    fs.writeFileSync(cssPath, styleContent, 'utf8');
    console.log('Updated CSS in style.css');
  }
}

// Replace HTML
const files = ['index.html', 'hsk1.html', 'hsk2.html', 'pinyin.html', 'admin.html'];
files.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const htmlRegex = /<footer class="app-footer">[\s\S]*?<\/footer>/;
    if (htmlRegex.test(content)) {
      content = content.replace(htmlRegex, newHTML);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log("Updated HTML in " + file);
    }
  }
});
