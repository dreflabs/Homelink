const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.AccountVerificationPending": {
    "titlePending": ["Awaiting Verification", "Menunggu Verifikasi"],
    "descPending": ["Complete the following verification steps to fully activate your account.", "Selesaikan langkah verifikasi berikut untuk mengaktifkan akun Anda sepenuhnya."],
    "titleEmail": ["Email Verification Required", "Verifikasi Email Diperlukan"],
    "descEmail": ["Please check your email inbox and click the link we sent.", "Silakan periksa kotak masuk email Anda dan klik tautan yang telah kami kirimkan."],
    "titlePhone": ["Phone Verification Required", "Verifikasi Telepon Diperlukan"],
    "descPhone": ["Enter the OTP code sent to your phone number to continue.", "Masukkan kode OTP yang telah dikirim ke nomor telepon Anda untuk melanjutkan."],
    "verifyPhoneNow": ["Verify Phone Number Now", "Verifikasi Nomor Telepon Sekarang"],
    "resendEmailCountdown": ["Resend Email ({time}s)", "Kirim Ulang Email ({time}s)"],
    "resendEmail": ["Resend Verification Email", "Kirim Ulang Email Verifikasi"],
    "logout": ["Logout", "Keluar"]
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
console.log("Updated AccountVerificationPending translations");
