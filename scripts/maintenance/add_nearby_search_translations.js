const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertySearch.NearbySearch": {
    "pageTitle": ["Properties Around You", "Properti di Sekitar Anda"],
    "pageDesc": ["Find the nearest dream properties from your current location.", "Temukan properti idaman terdekat dari lokasi Anda saat ini."],
    "allowLocationTitle": ["Allow Location Access", "Izinkan Akses Lokasi"],
    "allowLocationDesc": ["To find properties around you, we need permission to access your device's location.", "Untuk menemukan properti di sekitar Anda, kami memerlukan izin untuk mengakses lokasi perangkat Anda."],
    "detecting": ["Detecting...", "Mendeteksi..."],
    "detectLocation": ["Detect My Location", "Deteksi Lokasi Saya"],
    "locationDetected": ["Location detected", "Lokasi terdeteksi"],
    "updateLocation": ["Update Location", "Perbarui Lokasi"],
    "errorFailedFetch": ["Failed to get location. Ensure location permission is enabled.", "Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan."],
    "errorNotSupported": ["Geolocation is not supported in this browser.", "Geolokasi tidak didukung di browser ini."]
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
console.log("Updated NearbySearch translations");
