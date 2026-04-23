const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const filesToProcess = [
  'index.html', 'login.html', 'admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html',
  'js/app.js', 'js/auth.js', 'js/chatbot.js', 'js/data.js', 'js/flashcard.js', 'js/quiz.js', 'js/voice.js', 'init_db.js', 'server.js'
];

filesToProcess.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove the replacement character ''
    content = content.replace(/\uFFFD/g, '');
    
    // Also remove any remaining isolated surrogates just in case (though readFileSync as utf8 might have converted them to U+FFFD)
    content = content.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|([^\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '$1');

    // Remove all remaining emojis and pictographs
    content = content.replace(/\p{Extended_Pictographic}/gu, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned up ${file}`);
    }
  }
});
