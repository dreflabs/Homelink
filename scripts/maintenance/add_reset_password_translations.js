const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.ResetPassword": {
    "passwordMin": ["Password must be at least 8 characters.", "Password minimal 8 karakter."],
    "passwordUppercase": ["Must contain at least 1 uppercase letter.", "Harus mengandung minimal 1 huruf besar."],
    "passwordNumber": ["Must contain at least 1 number.", "Harus mengandung minimal 1 angka."],
    "passwordCommon": ["Password is too common.", "Password terlalu umum."],
    "passwordMismatch": ["Password confirmation does not match.", "Konfirmasi password tidak cocok."],
    "errorOccurred": ["An unexpected error occurred.", "An unexpected error occurred."],
    "backToLogin": ["Back to Login", "Kembali ke Login"],
    "invalidLinkTitle": ["Invalid Link", "Tautan Tidak Valid"],
    "invalidLinkDesc": ["This reset link is no longer valid or incorrect. Please request a new recovery link.", "Tautan reset ini sudah tidak berlaku atau salah. Silakan minta tautan pemulihan yang baru."],
    "requestNewLink": ["Request New Link", "Minta Tautan Baru"],
    "successTitle": ["Password Updated", "Password Diperbarui"],
    "successDesc": ["Your password has been successfully changed. Your account is now secure and ready to use.", "Kata sandi Anda berhasil diubah. Akun Anda kini kembali aman dan siap digunakan."],
    "loginToAccount": ["Login to Account", "Masuk ke Akun"],
    "formTitle": ["Create New Password", "Buat Password Baru"],
    "formDesc": ["Enter a strong new password to secure your account again.", "Masukkan kata sandi baru yang kuat untuk mengamankan kembali akun Anda."],
    "newPasswordLabel": ["New Password", "Password Baru"],
    "newPasswordPlaceholder": ["Min. 8 characters", "Minimal 8 karakter"],
    "confirmPasswordLabel": ["Confirm Password", "Konfirmasi Password"],
    "confirmPasswordPlaceholder": ["Repeat new password", "Ulangi password baru"],
    "saving": ["Saving...", "Menyimpan..."],
    "saveNewPassword": ["Save New Password", "Simpan Password Baru"],
    "loading": ["Loading interface...", "Memuat antarmuka..."]
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
console.log("Updated ResetPassword translations");
