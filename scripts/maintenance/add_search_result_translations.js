const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertySearch.SearchResult": {
    "searchResultFor": ["Search results for \"{query}\"", "Hasil pencarian untuk \"{query}\""],
    "propertiesForSale": ["Properties for Sale", "Properti Dijual"],
    "verifiedProperties": ["{count} Verified Properties", "{count} Properti Terverifikasi"],
    "realTimeUpdates": ["Real-time Updates", "Pembaruan Real-time"],
    "list": ["List", "List"],
    "map": ["Map", "Map"],
    "sortBy": ["Sort by:", "Urutkan:"],
    "relevance": ["Relevance", "Relevansi"],
    "newest": ["Newest", "Terbaru"],
    "lowestPrice": ["Lowest Price", "Harga Terendah"],
    "highestPrice": ["Highest Price", "Harga Tertinggi"],
    "aiRecommendation": ["AI Recommendation", "AI Recommendation"],
    "noResultsFound": ["No results found", "Tidak menemukan hasil"],
    "noResultsDesc": ["We couldn't find properties matching your filters. Try one of these recommendations:", "Kami tidak dapat menemukan properti yang sesuai dengan filter Anda. Coba salah satu rekomendasi berikut:"],
    "rec1": ["House in Bandung under Rp2 Billion", "Rumah di Bandung di bawah Rp2 Miliar"],
    "rec2": ["Apartment near MRT station", "Apartemen dekat stasiun MRT"],
    "rec3": ["House with 3 Bedrooms", "Rumah dengan 3 Kamar Tidur"],
    "rec4": ["See newest properties this week", "Lihat properti terbaru minggu ini"],
    "resetAllFilters": ["Reset All Filters", "Reset Semua Filter"]
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
console.log("Updated SearchResult translations");
