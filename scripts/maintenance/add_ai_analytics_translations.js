const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "AI.Analytics": {
    "pageTitle": ["AI Performance Analytics", "AI Performance Analytics"],
    "pageDesc": ["Monitor AI usage metrics, token costs, and model performance in real-time.", "Monitor metrik penggunaan, biaya token, dan performa model AI secara real-time."],
    "systemOptimal": ["System Optimal", "Sistem Optimal"],
    "totalTokens": ["Total Tokens Used", "Total Token Digunakan"],
    "avgResponseTime": ["Avg Response Time", "Rata-rata Waktu Respon"],
    "pricePredictionAccuracy": ["Price Prediction Accuracy", "Akurasi Prediksi Harga"],
    "aiServerLoad": ["AI Server Load", "Beban Server AI"],
    "fromLastMonth": ["from last month", "dari bulan lalu"],
    "tokenUsageChart": ["Token Usage Chart", "Grafik Penggunaan Token"],
    "tokenUsageDesc": ["Cost estimation based on models (GPT-4o & Claude 3.5)", "Estimasi biaya berdasarkan model (GPT-4o & Claude 3.5)"],
    "totalCostThisMonth": ["Total Cost This Month", "Total Biaya Bulan Ini"],
    "aiSystemHealth": ["AI System Health", "Kesehatan Sistem AI"],
    "aiSystemHealthDesc": ["Current status of core AI modules", "Status modul core AI saat ini"],
    "apiLatency": ["API Latency", "Latensi API"],
    "vectorDbCapacity": ["Vector DB Capacity", "Kapasitas Vector DB"],
    "rateLimitAssistant": ["Rate Limit Assistant", "Rate Limit Assistant"],
    "systemNotice": ["Price prediction traffic is currently high. The system has allocated 2 additional nodes to maintain stability.", "Traffic prediksi harga sedang tinggi. Sistem telah mengalokasikan 2 node tambahan untuk menjaga stabilitas."]
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
console.log("Updated AIAnalytics translations");
