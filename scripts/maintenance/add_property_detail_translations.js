const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "PropertyDetail": {
    "fullyVerified": ["Fully Verified", "Sepenuhnya Terverifikasi"],
    "house": ["House", "Rumah Tapak"],
    "apartment": ["Apartment", "Apartemen"],
    "land": ["Land", "Tanah"],
    "bedrooms": ["Bedrooms", "Kamar Tidur"],
    "bathrooms": ["Bathrooms", "Kamar Mandi"],
    "buildingArea": ["Building Area", "Luas Bangunan"],
    "propertyDescription": ["Property Description", "Deskripsi Properti"],
    "verifiedLegality": ["Verified Legality", "Legalitas Terverifikasi"],
    "shm": ["Freehold Title (SHM)", "Sertifikat Hak Milik (SHM)"],
    "imb": ["Building Permit (IMB) Complete", "Izin Mendirikan Bangunan (IMB) lengkap"],
    "pbb": ["Property Tax (PBB) Paid", "Pajak Bumi dan Bangunan (PBB) lunas"],
    
    "startingPrice": ["Starting Price", "Harga Mulai"],
    "estimatedInstallment": ["Est. installment {amount}/month", "Cicilan estimasi {amount}/bulan"],
    "mortgageSimulation": ["Mortgage Simulation", "Simulasi KPR"],
    "scheduleSurvey": ["Schedule Survey", "Jadwal Survey"],
    "contactAgent": ["Contact Agent", "Hubungi Agen"],
    "surveySuccess": ["Survey schedule successfully submitted!", "Jadwal survey berhasil diajukan!"],
    "messageSuccess": ["Message sent successfully. An agent will contact you shortly.", "Pesan berhasil dikirim. Agen akan segera menghubungi Anda."],
    "fullName": ["Full Name", "Nama Lengkap"],
    "enterName": ["Enter your name", "Masukkan nama Anda"],
    "whatsappNumber": ["WhatsApp Number", "Nomor WhatsApp"],
    "selectSurveyDate": ["Select Survey Date", "Pilih Tanggal Survey"],
    "processing": ["Processing...", "Memproses..."],
    "scheduleLocationSurvey": ["Schedule Location Survey", "Jadwalkan Survey Lokasi"],
    "freeSurvey": ["No charge for location survey.", "Tidak dipungut biaya untuk survey lokasi."],
    "message": ["Message", "Pesan"],
    "messagePlaceholder": ["Hi, I am interested in this property...", "Halo, saya tertarik dengan properti ini..."],
    "messageDefault": ["Hi, I am interested in this property. Is it still available?", "Halo, saya tertarik dengan properti ini. Apakah masih tersedia?"],
    "sending": ["Sending...", "Mengirim..."],
    "sendMessage": ["Send Message via System", "Kirim Pesan via Sistem"]
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
console.log("Updated PropertyDetail translations with booking panel");
