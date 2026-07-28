const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "SurveyorDashboard": {
    "page": {
      "locationRequired": ["Location Access Required", "Akses Lokasi Diperlukan"],
      "locationDesc": ["Make sure your GPS is active for route guidance and check-in at property locations.", "Pastikan GPS Anda aktif untuk fitur panduan rute dan *check-in* di lokasi properti."],
      "dashboardTitle": ["Surveyor Dashboard", "Dashboard Surveyor"],
      "dashboardDesc": ["Summary of your survey tasks today.", "Ringkasan tugas survei Anda hari ini."],
      "todayTasks": ["Today's Tasks", "Tugas Hari Ini"],
      "todayTasksDesc": ["Property survey schedules for today", "Jadwal survei properti hari ini"],
      "completed": ["Completed", "Selesai"],
      "completedDesc": ["Surveys verified", "Survei telah diverifikasi"],
      "pending": ["Pending", "Tertunda"],
      "pendingDesc": ["Waiting for execution", "Menunggu pelaksanaan"],
      "startWorking": ["Start Working", "Mulai Bekerja"],
      "readyToField": ["Ready for the field?", "Siap ke lapangan?"],
      "readyToFieldDesc": ["See the list of properties to be surveyed and start filling out the report form when you arrive at the location.", "Lihat daftar properti yang harus disurvei dan mulai isi formulir laporan saat Anda tiba di lokasi."],
      "viewTasks": ["View Task List", "Lihat Daftar Tugas"]
    },
    "tasks": {
      "title": ["Surveyor Assignments", "Daftar Penugasan Surveyor"],
      "desc": ["Manage daily property physical survey reports.", "Kelola laporan hasil survei fisik properti harian Anda."],
      "statusPending": ["Pending", "Pending"],
      "statusInProgress": ["In Progress", "In Progress"],
      "statusUrgent": ["Urgent", "Urgent"],
      "statusCompleted": ["Completed", "Selesai"],
      "allTasks": ["All Tasks", "Semua Tugas"],
      "noTasks": ["No Assignments Yet", "Belum Ada Penugasan"],
      "noTasksDesc": ["All physical inspection and field verification schedules have been covered. Please check back later!", "Semua jadwal pemeriksaan fisik dan verifikasi lapangan telah tuntas dicover. Silakan periksa kembali nanti!"],
      "notScheduled": ["Not Scheduled", "Belum Dijadwalkan"],
      "startSurvey": ["Start Survey", "Mulai Survei"]
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
console.log("Updated SurveyorDashboard translations");
