const fs = require('fs');

const enFile = 'messages/en.json';
const idFile = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));

const translations = {
  "Auth.login": {
    "emailRequired": ["Email is required", "Email wajib diisi"],
    "emailInvalid": ["Invalid email format", "Format email tidak valid"],
    "passwordRequired": ["Password is required", "Kata sandi wajib diisi"],
    "heroTitle": ["The most exclusive and trusted property platform in Indonesia.", "Platform properti paling eksklusif dan terpercaya di Indonesia."],
    "heroDesc": ["Join thousands of buyers and property owners who have proven the security of transactions with us.", "Bergabunglah dengan ribuan pembeli dan pemilik properti yang telah membuktikan keamanan transaksi bersama kami."],
    "reviews": ["from 2.000+ reviews", "dari 2.000+ ulasan"],
    "welcomeBack": ["Welcome Back", "Selamat Datang Kembali"],
    "continueJourney": ["Continue your journey at HomeLink.", "Lanjutkan perjalanan Anda di HomeLink."],
    "continueWithGoogle": ["Continue with Google", "Lanjutkan dengan Google"],
    "orWithEmail": ["or with email", "atau dengan email"],
    "emailAddress": ["Email Address", "Alamat Email"],
    "password": ["Password", "Kata Sandi"],
    "forgotPassword": ["Forgot password?", "Lupa sandi?"],
    "hidePassword": ["Hide password", "Sembunyikan kata sandi"],
    "showPassword": ["Show password", "Tampilkan kata sandi"],
    "rememberMe": ["Remember me", "Ingat saya"],
    "processing": ["Processing...", "Memproses..."],
    "loginToAccount": ["Login to Account", "Masuk ke Akun"],
    "noAccount": ["Don't have an account?", "Belum punya akun?"],
    "startJourney": ["Start your journey", "Mulai perjalanan Anda"]
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
console.log("Updated login translations");
