const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const filesToProcess = [
  'index.html', 'login.html', 'admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html',
  'js/app.js', 'js/auth.js', 'js/chatbot.js', 'js/data.js', 'js/flashcard.js', 'js/quiz.js', 'js/voice.js', 'init_db.js', 'server.js'
];

// Regex for the specific emojis the user mentioned or are present in the code
const emojiRegex = /[🦔📚📖📝🤖🗂✅🔥⚡👋🎉👍😊💪🌱]/g;

filesToProcess.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(emojiRegex, '');
    
    // Also clean up any empty brand-icon tags if they were just emojis
    content = content.replace(/<span class="brand-icon">\s*<\/span>/g, '');
    
    // Also clean up the svg icon in index.html if present
    content = content.replace(/<div class="brand-icon">[\s\S]*?<\/div>/g, '');
    
    // Fix `<span class="section-icon"></span>`
    content = content.replace(/<span class="section-icon">\s*<\/span>/g, '');
    
    // Fix `<div class="stat-icon-wrap"></div>`
    content = content.replace(/<div class="stat-icon-wrap">\s*<\/div>/g, '');

    // Replace the favicon emoji (🦔) with just empty string or a default letter
    content = content.replace(/<text y='\.9em' font-size='90'>🦔<\/text>/g, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Removed emojis from ${file}`);
    }
  }
});
