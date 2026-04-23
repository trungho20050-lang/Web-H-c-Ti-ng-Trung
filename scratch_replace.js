const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const filesToProcess = [
  'index.html', 'login.html', 'admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html',
  'js/app.js', 'js/auth.js', 'js/chatbot.js', 'init_db.js'
];

// We shouldn't replace localStorage keys like `nhim_user` because it will break existing users' sessions
// We will only replace display text like "Nhim study", "Nhím study", "Nhim học viên"
const replacements = [
  { regex: /Nhim Study/gi, replace: "Trung 你好" },
  { regex: /Nhím study/gi, replace: "Trung 你好" },
  { regex: /Nhim học viên/gi, replace: "Học viên" },
  { regex: /admin@nhimstudy\.com/g, replace: "admin@trungnihao.com" }
];

filesToProcess.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.regex, r.replace);
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
