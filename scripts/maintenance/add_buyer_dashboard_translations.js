const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "BuyerDashboard": {
    "dashboard": {
      "welcome": ["Welcome back", "Selamat datang kembali"],
      "exploreVerified": ["Start exploring verified properties.", "Mulai jelajahi properti terverifikasi."],
      "searchProperty": ["Search Properties", "Cari Properti"],
      "upcomingSurvey": ["Upcoming Survey Schedule", "Jadwal Survei Terdekat"],
      "youHaveSurvey": ["You have a survey scheduled for {title}.", "Anda memiliki jadwal survei untuk {title}."],
      "viewSchedule": ["View Schedule", "Lihat Jadwal"],
      "continueSearch": ["Continue Your Search", "Lanjutkan Pencarian Anda"],
      "lastViewed": ["You recently viewed: {title}.", "Anda terakhir melihat properti: {title}."],
      "viewProperty": ["View Property", "Lihat Properti"],
      "savedProperties": ["Saved Properties", "Properti Tersimpan"],
      "noSavedProperties": ["No Saved Properties Yet", "Belum Ada Properti Tersimpan"],
      "noSavedPropertiesDesc": ["You haven't saved any properties yet. Start exploring and save your dream properties to compare them later.", "Anda belum menyimpan properti apapun. Mulai jelajahi dan simpan properti impian Anda untuk membandingkannya nanti."],
      "viewAll": ["View All", "Lihat Semua"]
    },
    "layout": {
      "title": ["Buyer Dashboard", "Dashboard Pembeli"],
      "roleBadge": ["Buyer Portal", "Portal Pembeli"],
      "links": {
        "overview": ["Overview", "Ringkasan"],
        "favorites": ["Favorites", "Favorit"],
        "profile": ["Profile", "Profil"],
        "schedule": ["Schedule", "Jadwal"],
        "offers": ["Offers", "Penawaran"],
        "documents": ["Documents", "Dokumen"],
        "messages": ["Messages", "Pesan"],
        "settings": ["Settings", "Pengaturan"],
        "logout": ["Log out", "Keluar"]
      }
    }
  }
};

function deepMerge(targetEn, targetId, source) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      targetEn[key] = source[key][0];
      targetId[key] = source[key][1];
    } else if (typeof source[key] === 'object') {
      if (!targetEn[key]) targetEn[key] = {};
      if (!targetId[key]) targetId[key] = {};
      deepMerge(targetEn[key], targetId[key], source[key]);
    }
  }
}

deepMerge(en, id, translations);

fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
fs.writeFileSync(idFile, JSON.stringify(id, null, 2));
console.log("Updated BuyerDashboard translations");
