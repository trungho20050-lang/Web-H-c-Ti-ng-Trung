const fs = require('fs');

// ── HSK1: accent = pink/purple (giống index.html) ──
let h1 = fs.readFileSync('hsk1.html','utf8');
h1 = h1.replace(/<style>[\s\S]*?<\/style>/m, `<style>
  body {
    background-image:
      radial-gradient(ellipse 60% 50% at 10% 0%,rgba(236,72,153,0.09),transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%,rgba(251,113,133,0.06),transparent 60%);
  }
</style>`);
fs.writeFileSync('hsk1.html', h1, 'utf8');
console.log('hsk1 done');

// ── HSK2: accent = blue trên nền hồng ──
let h2 = fs.readFileSync('hsk2.html','utf8');
h2 = h2.replace(/<style>[\s\S]*?<\/style>/m, `<style>
  body {
    background-image:
      radial-gradient(ellipse 60% 50% at 10% 0%,rgba(59,130,246,0.07),transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%,rgba(236,72,153,0.05),transparent 60%);
  }
  /* HSK2: override tab active với blue */
  .tab-btn.active {
    background: linear-gradient(135deg,#2563eb,rgba(251,113,133,0.8));
  }
  .filter-btn.active {
    background: linear-gradient(135deg,#2563eb,rgba(251,113,133,0.7));
  }
  .fc-pgfill { background: linear-gradient(90deg,#3b82f6,#fb7185); }
  .card-hanzi {
    background: linear-gradient(120deg,#2563eb,#fb7185);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    filter: drop-shadow(0 0 20px rgba(59,130,246,0.2));
  }
  .card-back { border-color: rgba(59,130,246,0.2); }
  .card-type { color:#2563eb; background:rgba(59,130,246,0.08); }
  .q-opt:hover { border-color:#3b82f6; background:rgba(59,130,246,0.06); }
  .q-hanzi { background:linear-gradient(120deg,#2563eb,#fb7185); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .quiz-score-pill { border-color:rgba(59,130,246,0.2); color:#2563eb; background:rgba(59,130,246,0.06); }
  .qpfill { background:linear-gradient(90deg,#3b82f6,#fb7185); }
  .result-pct-text { background:linear-gradient(120deg,#2563eb,#fb7185); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .rbtn-fc { background:linear-gradient(135deg,#2563eb,#fb7185); }
  .btn-primary { background:linear-gradient(135deg,#2563eb,#fb7185); }
  .vocab-hanzi-sm { color:#2563eb; }
  .hstat-purple { color:#2563eb; }
</style>`);
fs.writeFileSync('hsk2.html', h2, 'utf8');
console.log('hsk2 done');

// ── PINYIN: accent = emerald/green trên nền hồng ──
let py = fs.readFileSync('pinyin.html','utf8');
py = py.replace(/<style>[\s\S]*?<\/style>/m, `<style>
  body {
    background-image:
      radial-gradient(ellipse 60% 50% at 10% 0%,rgba(16,185,129,0.08),transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%,rgba(236,72,153,0.05),transparent 60%);
  }
  .brand-name { background:linear-gradient(120deg,#059669,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .header-badge { color:#059669; }
  .tab-btn.active { background:linear-gradient(135deg,#059669,rgba(236,72,153,0.8)); }
  .hero-badge { background:rgba(16,185,129,0.08); border-color:rgba(16,185,129,0.2); color:#059669; }
  .hero-title span { background:linear-gradient(120deg,#059669,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .main-content { max-width:1200px; }
  /* Pinyin cards */
  .section-title{font-size:18px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:8px;color:var(--t1)}
  .section-desc{font-size:13px;color:var(--t2);margin-bottom:18px}
  .group-label{font-size:13px;font-weight:600;color:#059669;margin:18px 0 10px;padding:4px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.15);border-radius:20px;display:inline-block}
  .py-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:28px}
  .py-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r2);padding:14px;cursor:pointer;transition:var(--tr);text-align:center;position:relative;box-shadow:var(--sh1)}
  .py-card:hover{border-color:#10b981;background:var(--bg3);transform:translateY(-3px);box-shadow:var(--sh2)}
  .py-card.active{border-color:#10b981;background:rgba(16,185,129,0.05);box-shadow:0 0 0 2px rgba(16,185,129,0.15)}
  .py-letter{font-size:36px;font-weight:800;background:linear-gradient(120deg,#059669,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2}
  .py-ipa{font-size:11px;color:var(--t3);margin:4px 0 2px}
  .py-vn{font-size:12px;color:var(--t2);font-weight:500}
  .py-example{font-size:10.5px;color:var(--t3);margin-top:4px}
  .py-speak{position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;font-size:16px;opacity:0.35;transition:var(--tr)}
  .py-speak:hover{opacity:1;transform:scale(1.2)}
  .detail-panel{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r3);padding:24px;margin-bottom:28px;display:none;animation:fadeUp .3s ease;box-shadow:var(--sh2)}
  .detail-panel.show{display:flex;gap:28px;align-items:center;flex-wrap:wrap}
  .detail-big{font-size:72px;font-weight:900;background:linear-gradient(120deg,#059669,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;min-width:120px;text-align:center}
  .detail-info{flex:1;min-width:200px}
  .detail-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:14px}
  .detail-label{color:var(--t3);min-width:80px;font-size:12px}
  .detail-val{color:var(--t1);font-weight:500}
  .detail-speak-btn{padding:10px 22px;border-radius:40px;border:none;background:linear-gradient(135deg,#059669,rgba(236,72,153,0.7));color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:var(--tr);margin-top:8px}
  .detail-speak-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(16,185,129,0.3)}
  .tone-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-bottom:28px}
  .tone-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r3);padding:20px;cursor:pointer;transition:var(--tr);box-shadow:var(--sh1)}
  .tone-card:hover{transform:translateY(-3px);box-shadow:var(--sh2)}
  .tone-header{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .tone-mark{font-size:42px;font-weight:900;line-height:1}
  .tone-name{font-size:14px;font-weight:700;color:var(--t1)}
  .tone-desc{font-size:12.5px;color:var(--t2);line-height:1.5;margin-bottom:8px}
  .tone-vn{font-size:12px;color:var(--t3);font-style:italic;margin-bottom:6px}
  .tone-example{font-size:12px;background:var(--bg3);border:1px solid var(--border);padding:4px 10px;border-radius:8px;color:var(--t2);display:inline-block}
  .tone-svg{width:60px;height:36px;flex-shrink:0}
  .combo-wrapper{overflow-x:auto;margin-bottom:28px;border:1px solid var(--border);border-radius:var(--r2);box-shadow:var(--sh1)}
  .combo-table{border-collapse:collapse;width:100%;min-width:900px;font-size:12px}
  .combo-table th{background:var(--bg3);color:#059669;padding:8px 6px;border:1px solid var(--border);font-weight:700;position:sticky;top:0;z-index:1}
  .combo-table td{padding:6px;border:1px solid var(--border);text-align:center;cursor:pointer;transition:var(--tr);color:var(--t2)}
  .combo-table td:first-child{background:var(--bg3);color:#059669;font-weight:700;position:sticky;left:0;z-index:1}
  .combo-table td:hover{background:rgba(16,185,129,0.08);color:var(--t1)}
  .combo-table td.empty{color:var(--t3);opacity:0.4;cursor:default}
  .combo-table td.has-val{color:var(--t1)}
</style>`);
fs.writeFileSync('pinyin.html', py, 'utf8');
console.log('pinyin done');
