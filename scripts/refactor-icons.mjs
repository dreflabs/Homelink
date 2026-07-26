import fs from 'fs';
import path from 'path';

// Define the mapping
const iconMap = {
  'Verified': 'ShieldCheck',
  'Ghost': 'ScanSearch',
  'Search': 'Search',
  'Valuation': 'ChartCandlestick',
  'AiSearch': 'Sparkles',
  'Legal': 'FileCheck',
  'Mortgage': 'Wallet',
  'Agent': 'BadgeCheck',
  'Owner': 'UserRound', // 'HouseUser' doesn't exist in our lucide version
  'Property': 'Building',
  'Favorite': 'Heart',
  'Location': 'MapPin',
  'Chat': 'MessageCircle',
  'Phone': 'Phone',
  'Email': 'Mail',
  'Security': 'Shield',
  'Payment': 'CreditCard',
  'Dashboard': 'LayoutDashboard',
  'Analytics': 'ChartArea',
  'Notification': 'Bell',
  'Profile': 'UserRound',
  'Settings': 'Settings',
  
  // Specific old generic icons to replace
  'CheckCircle2': 'ShieldCheck',
  'CheckCircle': 'ShieldCheck',
  'AlertCircle': 'ShieldAlert',
  'AlertTriangle': 'ShieldAlert',
  'FileText': 'FileCheck',
  'TrendingUp': 'ChartCandlestick',
  'LineChart': 'ChartCandlestick',
  'BarChart': 'ChartArea',
  'BarChart2': 'ChartArea',
  'Users': 'UserRound',
  'User': 'UserRound',
  'Home': 'Building',
  'Building2': 'Building',
  'MessageSquare': 'MessageCircle',
  'MailCheck': 'Mail',
  'DollarSign': 'Wallet',
  'Receipt': 'Wallet',
  'Clock': 'Clock',
  'Eye': 'Eye',
};

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

  // 1. Remove strokeWidth overrides to enforce default 2px
  content = content.replace(/strokeWidth=\{[0-9.]+\}/g, '');
  content = content.replace(/strokeWidth="[0-9.]+"/g, '');

  // 3. Replace Icon Imports
  const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  if (importMatch) {
    let importedIcons = importMatch[1].split(',').map(i => i.trim()).filter(Boolean);
    let newImportedIcons = new Set();
    
    // Replace names in the import
    for (const icon of importedIcons) {
      if (iconMap[icon]) {
        newImportedIcons.add(iconMap[icon]);
        // Replace in the body as well
        const regex = new RegExp(`\\b${icon}\\b`, 'g');
        content = content.replace(regex, iconMap[icon]);
      } else {
        newImportedIcons.add(icon);
      }
    }
    
    const newImportStr = `import { ${Array.from(newImportedIcons).join(', ')} } from "lucide-react"`;
    content = content.replace(importMatch[0], newImportStr);
  }

  // 4. Remove text-colors from within <Icon className="..." />
  const iconTags = Array.from(new Set(Object.values(iconMap)));
  for (const tag of iconTags) {
    const tagRegex = new RegExp(`<${tag}[^>]*className=["'][^"']*["'][^>]*>`, 'g');
    content = content.replace(tagRegex, (match) => {
      return match.replace(/\btext-[a-z]+-\d+\b/g, '').replace(/\btext-muted-foreground\b/g, ''); 
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFilesCount++;
  }
}

console.log(`Updated ${updatedFilesCount} files.`);
