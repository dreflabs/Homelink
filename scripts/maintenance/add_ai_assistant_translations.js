const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "AI.Assistant": {
    "welcomeMessage": ["Hello! I am the HOMELINK AI Assistant. How can I help you today regarding properties, investments, or market analysis?\n\nTry asking:\n- `How are house price trends in South Jakarta?`\n- `Calculate mortgage estimation for a 1.5 M house`\n- `What are the determining factors of property value?`", "Halo! Saya adalah AI Assistant HOMELINK. Ada yang bisa saya bantu terkait properti, investasi, atau analisis pasar hari ini?\n\nCoba tanyakan:\n- `Bagaimana tren harga rumah di Jakarta Selatan?`\n- `Hitung estimasi KPR untuk rumah 1.5 M`\n- `Apa saja faktor penentu nilai properti?`"],
    "smartAssistant": ["Smart Assistant", "Smart Assistant"],
    "onlineReady": ["Online & Ready", "Online & Ready"],
    "askSomething": ["Ask the AI something...", "Tanyakan sesuatu pada AI..."],
    "aiDisclaimer": ["AI can make mistakes. Please verify important information.", "AI dapat membuat kesalahan. Harap verifikasi informasi penting."],
    "analysisComplete": ["**Quick Analysis Complete!** 🚀\n\nBased on your question, here are the main points:\n\n1. **Market Trend:** Currently showing a positive trend with stable increase.\n2. **Recommendation:** Highly recommended to monitor mortgage interest rates.\n\nSimple calculation example:\n```javascript\nconst housePrice = 1500000000;\nconst downPayment = housePrice * 0.2;\nconsole.log(\"Down payment needed:\", downPayment);\n```\n\nIs there anything specific you would like to explore?", "**Analisis Cepat Selesai!** 🚀\n\nBerdasarkan pertanyaan Anda, berikut adalah poin-poin utamanya:\n\n1. **Tren Pasar:** Saat ini menunjukkan tren positif dengan kenaikan stabil.\n2. **Rekomendasi:** Sangat disarankan untuk memantau suku bunga KPR.\n\nContoh perhitungan sederhana:\n```javascript\nconst hargaRumah = 1500000000;\nconst dp = hargaRumah * 0.2;\nconsole.log(\"DP yang disiapkan:\", dp);\n```\n\nAda hal spesifik lain yang ingin dieksplorasi?"]
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
console.log("Updated AIAssistant translations");
