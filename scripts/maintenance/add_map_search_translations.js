const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertySearch.MapSearch": {
    "filter": ["Filter", "Filter"],
    "mapPlaceholder": ["Mapbox / Google Maps API Placeholder", "Mapbox / Google Maps API Placeholder"],
    "mapPlaceholderDesc": ["Currently using OpenStreetMap for demo purposes.", "Currently using OpenStreetMap for demo purposes."],
    "connectApi": ["Connect API", "Hubungkan API"],
    "propertiesInArea": ["Properties in This Area", "Properti di Area Ini"],
    "propertiesFound": ["{count} properties found", "{count} properti ditemukan"],
    "list": ["List", "List"],
    "map": ["Map", "Map"],
    "allProperties": ["All Properties", "Semua Properti"],
    "noPropertiesFound": ["No Properties Found", "Tidak Ada Properti Ditemukan"],
    "tryChangeKeyword": ["Try changing your keywords or search area.", "Coba ubah kata kunci atau area pencarian Anda."]
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
console.log("Updated MapSearch translations");
