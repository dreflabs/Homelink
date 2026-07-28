const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertySearch.SavedSearch": {
    "pageTitle": ["Saved Searches", "Pencarian Tersimpan"],
    "pageDesc": ["Manage your search criteria and get notifications for new properties.", "Kelola kriteria pencarian Anda dan dapatkan notifikasi properti baru."],
    "newProperties": ["New Properties", "Properti Baru"],
    "savedOn": ["Saved on {date}", "Disimpan pada {date}"],
    "emailNotification": ["Email Notification", "Notifikasi Email"],
    "viewResults": ["View Results", "Lihat Hasil"]
  }
};

for (const [namespace, keys] of Object.entries(translations)) {
  const parts = namespace.split('.');
  
  let currEn = en;
  let currId = id;
  
  for (const part of parts) {
    if (!currEn[part]) currEn[part] = {};
    if (!currId[part]) currId[part] = {};
    currEn = currEn[part];
    currId = currId[part];
  }
  
  for (const [key, [enStr, idStr]] of Object.entries(keys)) {
    currEn[key] = enStr;
    currId[key] = idStr;
  }
}

fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
fs.writeFileSync(idFile, JSON.stringify(id, null, 2));
console.log("Updated SavedSearch translations");
