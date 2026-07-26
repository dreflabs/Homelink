import fs from 'fs';

const files = [
  './src/app/(12_super_admin)/super-admin/layout.tsx',
  './src/app/(16_ai)/ai/valuation/page.tsx',
  './src/app/(07_partner_agent)/agent/documents/page.tsx',
  './src/app/(02_authentication)/forgot-password/page.tsx',
  './src/app/(12_super_admin)/super-admin/security/page.tsx',
  './src/app/(01_public_website)/page.tsx',
  './src/app/(09_surveyor)/surveyor/tasks/[propertyId]/form/page.tsx',
  './src/app/(07_partner_agent)/agent/commission/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Extract lucide-react import
  const match = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  if (match) {
    const icons = match[1].split(',').map(i => i.trim()).filter(Boolean);
    const uniqueIcons = Array.from(new Set(icons));
    
    const newImport = `import { ${uniqueIcons.join(', ')} } from "lucide-react"`;
    content = content.replace(match[0], newImport);
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log('Fixed duplicates in imports.');
