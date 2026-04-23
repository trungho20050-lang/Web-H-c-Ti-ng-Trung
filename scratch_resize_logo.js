const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const files = ['index.html', 'login.html', 'admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html'];

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // index.html sidebar logo
    content = content.replace(
      /width:46px; height:46px;/g,
      'width:72px; height:72px;'
    );
    
    // topbar / other pages logo
    content = content.replace(
      /width:32px; height:32px;/g,
      'width:48px; height:48px;'
    );
    
    // login page logo
    content = content.replace(
      /width:72px; height:72px;/g,
      'width:120px; height:120px;'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated sizes in ${file}`);
  }
});
