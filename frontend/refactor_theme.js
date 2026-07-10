const fs = require('fs');
const path = require('path');

const replacements = {
  '"rgba(8,14,26,0.7)"': '"var(--bg-panel)"',
  '"#04080F"': '"var(--bg-base)"',
  '"rgba(255,255,255,0.06)"': '"var(--border-subtle)"',
  '"rgba(255,255,255,0.05)"': '"var(--divider)"',
  '"rgba(255,255,255,0.08)"': '"var(--border-input)"',
  '"rgba(255,255,255,0.04)"': '"var(--bg-input)"',
  '"rgba(255,255,255,0.03)"': '"var(--bg-panel-hover)"',
  '"#f0f6ff"': '"var(--text-primary)"',
  '"#94a3b8"': '"var(--text-secondary)"',
  '"#475569"': '"var(--text-muted)"',
  'rgba(8,14,26,0.7)': 'var(--bg-panel)',
  '#04080F': 'var(--bg-base)',
  'rgba(255,255,255,0.06)': 'var(--border-subtle)',
  'rgba(255,255,255,0.05)': 'var(--divider)',
  'rgba(255,255,255,0.08)': 'var(--border-input)',
  'rgba(255,255,255,0.04)': 'var(--bg-input)',
  'rgba(255,255,255,0.03)': 'var(--bg-panel-hover)',
  '#f0f6ff': 'var(--text-primary)',
  '#94a3b8': 'var(--text-secondary)',
  '#475569': 'var(--text-muted)',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [search, replace] of Object.entries(replacements)) {
        content = content.split(search).join(replace);
      }
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src/app/dashboard'));
processDirectory(path.join(__dirname, 'src/components'));
