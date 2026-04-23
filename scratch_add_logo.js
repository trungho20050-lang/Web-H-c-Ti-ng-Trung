const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

const logoImgLarge = `<img src="assets/logo.png" alt="Logo" class="brand-icon-img" style="width:46px; height:46px; object-fit:cover; border-radius:50%; box-shadow:0 4px 12px rgba(236,72,153,0.3); border:2px solid white; flex-shrink:0;">`;
const logoImgSmall = `<img src="assets/logo.png" alt="Logo" class="brand-icon-img" style="width:32px; height:32px; object-fit:cover; border-radius:50%; border:1px solid white;">`;
const logoImgLogin = `<img src="assets/logo.png" alt="Logo" style="width:72px; height:72px; object-fit:cover; border-radius:50%; border:2px solid white; box-shadow:0 8px 24px rgba(236,72,153,0.25); margin-bottom:12px;">`;

// index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(
  /<div class="brand-logo">\s*<div>\s*<div class="brand-text">/g,
  `<div class="brand-logo">\n        ${logoImgLarge}\n        <div>\n          <div class="brand-text">`
);
indexContent = indexContent.replace(
  /<svg[^>]*><path[^>]*><path[^>]*><path[^>]*><\/svg>\s*<span class="topbar-title">/g,
  `${logoImgSmall}\n          <span class="topbar-title">`
);
fs.writeFileSync('index.html', indexContent, 'utf8');

// login.html
let loginContent = fs.readFileSync('login.html', 'utf8');
loginContent = loginContent.replace(
  /<h1 class="auth-title">Trung 你好<\/h1>/g,
  `${logoImgLogin}\n        <h1 class="auth-title">Trung 你好</h1>`
);
fs.writeFileSync('login.html', loginContent, 'utf8');

// Other HTML files
['admin.html', 'hsk1.html', 'hsk2.html', 'pinyin.html'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(
      /<span class="brand-name">Trung 你好<\/span>/g,
      `${logoImgSmall}\n    <span class="brand-name">Trung 你好</span>`
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Done!');
