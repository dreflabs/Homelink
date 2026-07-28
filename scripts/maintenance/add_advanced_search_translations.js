const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertySearch.AdvancedSearch": {
    "pageTitle": ["Advanced Search", "Pencarian Lanjutan"],
    "locationLabel": ["Location / Area", "Lokasi / Area"],
    "locationPlaceholder": ["Select city or area...", "Pilih kota atau area..."],
    "propertyTypeLabel": ["Property Type", "Tipe Properti"],
    "allTypes": ["All Types", "Semua Tipe"],
    "house": ["House", "Rumah"],
    "apartment": ["Apartment", "Apartemen"],
    "land": ["Land", "Tanah"],
    "minPriceLabel": ["Minimum Price (Rp)", "Harga Minimum (Rp)"],
    "minPricePlaceholder": ["Example: 500000000", "Contoh: 500000000"],
    "maxPriceLabel": ["Maximum Price (Rp)", "Harga Maksimum (Rp)"],
    "maxPricePlaceholder": ["Example: 2000000000", "Contoh: 2000000000"],
    "minBedroomsLabel": ["Minimum Bedrooms", "Kamar Tidur Minimum"],
    "minBathroomsLabel": ["Minimum Bathrooms", "Kamar Mandi Minimum"],
    "any": ["Any", "Bebas"],
    "minAreaLabel": ["Min Land Area (m²)", "Luas Tanah Min (m²)"],
    "minAreaPlaceholder": ["Example: 100", "Contoh: 100"],
    "specialFacilitiesLabel": ["Special Facilities", "Fasilitas Khusus"],
    "pool": ["Swimming Pool", "Kolam Renang"],
    "garage": ["Garage", "Garasi"],
    "reset": ["Reset", "Reset"],
    "applyFilters": ["Apply Filters", "Terapkan Filter"]
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
console.log("Updated AdvancedSearch translations");
