const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const files = ['index.html', 'admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html'];

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the img tag that corresponds to the top bar logo
    content = content.replace(/<img src="assets\/logo\.png" alt="Logo" class="brand-icon-img" style="width:48px; height:48px; object-fit:cover; border-radius:50%; border:1px solid white;">\s*/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed topbar logo from ${file}`);
  }
});
