const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "AI.Valuation": {
    "pageTitle": ["AI Property Valuation", "AI Property Valuation"],
    "pageDesc": ["Instantly know your property's estimated market price with our machine learning algorithm that analyzes thousands of property data.", "Ketahui estimasi harga pasar properti Anda secara instan dengan algoritma machine learning kami yang menganalisis ribuan data properti."],
    "propertyDetails": ["Property Details", "Detail Properti"],
    "propertyLocation": ["Property Location", "Lokasi Properti"],
    "propertyLocationPlaceholder": ["Example: South Jakarta, Kemang", "Contoh: Jakarta Selatan, Kemang"],
    "landArea": ["Land Area (m²)", "Luas Tanah (m²)"],
    "landAreaPlaceholder": ["Example: 120", "Misal: 120"],
    "buildingArea": ["Building Area (m²)", "Luas Bangunan (m²)"],
    "buildingAreaPlaceholder": ["Example: 100", "Misal: 100"],
    "bedrooms": ["Bedrooms", "Kamar Tidur"],
    "bathrooms": ["Bathrooms", "Kamar Mandi"],
    "rooms": ["{count} Rooms", "{count} Kamar"],
    "baths": ["{count} Baths", "{count} Kamar Mandi"],
    "analyzingMarket": ["Analyzing Market...", "Menganalisis Pasar..."],
    "calculateEstimate": ["Calculate Price Estimate", "Hitung Estimasi Harga"],
    "connectingDb": ["Connecting to AI Database...", "Menghubungkan ke Database AI..."],
    "analyzingValue": ["Analyzing current market value", "Menganalisis nilai pasar terkini"],
    "aiAnalysisResult": ["AI Analysis Result", "Hasil Analisis AI"],
    "estimatedPrice": ["Estimated Property Price", "Estimasi Harga Properti"],
    "confidenceScore": ["Confidence Score", "Confidence Score"],
    "highAccuracy": ["94% — High Accuracy", "94% — Akurasi Tinggi"],
    "priceUp": ["Price up 8% from last year", "Harga naik 8% dari tahun lalu"],
    "dataFrom": ["Data from 50,000+ transactions", "Data dari 50.000+ transaksi"],
    "viewInDepth": ["View In-Depth Analysis", "Lihat Analisis Mendalam"],
    "noDataYet": ["No Data Yet", "Belum Ada Data"],
    "noDataDesc": ["Fill out the form to see your property's price estimate.", "Isi form di samping untuk melihat estimasi harga properti Anda."]
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
console.log("Updated AIValuation translations");
