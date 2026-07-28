const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.VerifyEmail": {
    "title": ["Bank-grade security that always protects your account.", "Sistem keamanan tingkat bank yang selalu menjaga akun Anda."],
    "subtitle": ["Your data security and privacy are our top priorities. Verify your email quickly and securely.", "Keamanan data dan privasi Anda adalah prioritas utama kami. Verifikasi email Anda dengan cepat dan aman."],
    "verifying": ["Validating your email...", "Memvalidasi email Anda..."],
    "checkInbox": ["Check Your Inbox", "Periksa Kotak Masuk"],
    "checkInboxDesc": ["We have sent a verification link to your email. Please check your inbox or spam folder to activate your account.", "Kami telah mengirimkan tautan verifikasi ke email Anda. Silakan periksa kotak masuk atau folder spam Anda untuk mengaktifkan akun."],
    "backToLogin": ["Back to Login Page", "Kembali ke Halaman Login"],
    "alreadyVerified": ["Already Verified", "Sudah Terverifikasi"],
    "success": ["Verification Successful!", "Verifikasi Berhasil!"],
    "alreadyVerifiedDesc": ["Your account has been verified previously.", "Akun Anda sudah pernah diverifikasi sebelumnya."],
    "successDesc": ["Your email has been successfully verified. Your account is now fully active and ready to use.", "Email Anda berhasil diverifikasi. Akun Anda kini sepenuhnya aktif dan siap digunakan."],
    "continueToDashboard": ["Continue to Dashboard", "Lanjut ke Dashboard"],
    "linkExpired": ["Link Expired", "Tautan Kedaluwarsa"],
    "invalidLink": ["Invalid Link", "Tautan Tidak Valid"],
    "linkExpiredDesc": ["This verification link has passed the safe time limit. Please request a new link.", "Tautan verifikasi ini sudah melewati batas waktu aman. Silakan minta tautan baru."],
    "invalidLinkDesc": ["This verification link is unrecognized, already used, or invalid.", "Tautan verifikasi ini tidak dapat dikenali, sudah digunakan, atau tidak valid."],
    "emailLabel": ["Email Address", "Alamat Email"],
    "emailPlaceholder": ["name@email.com", "nama@email.com"],
    "resending": ["Resending...", "Mengirim ulang..."],
    "sendNewLink": ["Send New Link", "Kirim Tautan Baru"],
    "cancelAndBack": ["Cancel & Back to Login", "Batal & Kembali ke Login"],
    "loading": ["Loading interface...", "Memuat antarmuka..."],
    "enterEmailFirst": ["Please enter your email address first.", "Masukkan alamat email Anda terlebih dahulu."],
    "errorOccurred": ["An error occurred. Please try again.", "Terjadi kesalahan. Silakan coba lagi."]
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
console.log("Updated VerifyEmail translations");
