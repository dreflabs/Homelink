import fs from 'fs';
import path from 'path';

const iconNames = [
  'ShieldCheck', 'ScanSearch', 'Search', 'ChartCandlestick', 'Sparkles',
  'FileCheck', 'Wallet', 'BadgeCheck', 'UserRound', 'Building', 'Heart',
  'MapPin', 'MessageCircle', 'Phone', 'Mail', 'Shield', 'CreditCard',
  'LayoutDashboard', 'ChartArea', 'Bell', 'Settings', 'ShieldAlert',
  'Clock', 'Eye'
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(path.join(process.cwd(), 'src'), []);
let updatedFilesCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const tag of iconNames) {
    const tagRegex = new RegExp(`<${tag}[^>]*className=["'][^"']*["'][^>]*>`, 'g');
    content = content.replace(tagRegex, (match) => {
      // Replace w-4 h-4 with w-5 h-5 for baseline standard
      return match.replace(/\bw-4\b/g, 'w-5').replace(/\bh-4\b/g, 'h-5');
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFilesCount++;
  }
}

console.log(`Bumped w-4 h-4 to w-5 h-5 in ${updatedFilesCount} files.`);
