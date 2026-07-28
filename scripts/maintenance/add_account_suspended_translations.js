const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.AccountSuspended": {
    "title": ["Account Suspended", "Akun Ditangguhkan"],
    "description": ["Your account has been temporarily suspended. Contact our support team for more information and appeal process.", "Akun Anda telah ditangguhkan sementara. Hubungi tim dukungan kami untuk informasi lebih lanjut dan proses banding."],
    "reasonLabel": ["Suspension Reason:", "Alasan Penangguhan:"],
    "defaultReason": ["Violation of terms of service", "Pelanggaran kebijakan layanan"],
    "contactSupport": ["Contact Support", "Hubungi Dukungan"],
    "logout": ["Logout", "Keluar"]
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
console.log("Updated AccountSuspended translations");
