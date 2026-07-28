const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.ForgotPassword": {
    "title": ["Bank-grade security that always protects your account.", "Sistem keamanan tingkat bank yang selalu menjaga akun Anda."],
    "subtitle": ["Your data security and privacy are our top priorities. Recover your account quickly and securely.", "Keamanan data dan privasi Anda adalah prioritas utama kami. Pulihkan akun Anda dengan cepat dan aman."],
    "backToLogin": ["Back to Login", "Kembali ke Login"],
    "formTitle": ["Forgot Password?", "Lupa Kata Sandi?"],
    "formDesc": ["Don't worry. Enter your email and we will send you recovery instructions immediately.", "Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi pemulihan segera."],
    "identifierLabel": ["Email or Phone Number", "Email atau Nomor Telepon"],
    "identifierPlaceholder": ["name@email.com or 0812...", "nama@email.com atau 0812..."],
    "identifierRequired": ["Email or phone number is required.", "Email atau nomor telepon wajib diisi."],
    "identifierMin": ["Email or phone number is required.", "Email atau nomor telepon wajib diisi."],
    "sending": ["Sending...", "Mengirim..."],
    "sendInstructions": ["Send Recovery Instructions", "Kirim Instruksi Reset"],
    "errorOccurred": ["An error occurred. Please try again.", "Terjadi kesalahan. Silakan coba lagi."],
    "successTitle": ["Instructions Sent", "Instruksi Terkirim"],
    "successDesc": ["If your email is registered, we have sent recovery instructions. Please check your inbox.", "Jika email Anda terdaftar, kami telah mengirimkan instruksi pemulihan. Silakan periksa kotak masuk Anda."],
    "didNotReceive": ["Didn't receive the email?", "Tidak menerima email?"],
    "checkSpam": ["Check your spam folder or make sure the email address you entered is correct.", "Periksa folder spam atau pastikan alamat email yang Anda masukkan sudah benar."],
    "backToLoginPage": ["Back to Login Page", "Kembali ke Halaman Login"]
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
console.log("Updated ForgotPassword translations");
