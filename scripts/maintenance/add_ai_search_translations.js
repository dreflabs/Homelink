const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "AI.Search": {
    "pageTitle": ["AI Semantic Search", "AI Semantic Search"],
    "pageDesc": ["Find exactly what you're looking for by describing it naturally. Our AI understands context, amenities, and lifestyle preferences.", "Temukan dengan tepat apa yang Anda cari dengan mendeskripsikannya secara alami. AI kami memahami konteks, fasilitas, dan preferensi gaya hidup."],
    "searchPlaceholder": ["e.g. 'A quiet apartment near a park with a balcony for my cat'", "Misal: 'Apartemen tenang dekat taman yang ada balkon untuk kucing saya'"],
    "search": ["Search", "Cari"],
    "searching": ["Searching...", "Mencari..."],
    "noResults": ["No matching results", "Tidak ada hasil yang cocok"],
    "noResultsDesc": ["Try describing the property you are looking for in another way.", "Coba deskripsikan properti yang Anda cari dengan cara lain."],
    "trySpecific": ["Try searching for something specific", "Coba cari sesuatu yang spesifik"],
    "trySpecificDesc": ["Results will appear here based on semantic relevance.", "Hasil pencarian akan muncul di sini berdasarkan relevansi semantik."]
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
console.log("Updated AISearch translations");
