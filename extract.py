import os
import re

dir_path = "src/app/[locale]/(08_internal_agent)/internal"
id_dict = {}
en_dict = {}

texts = [
    "Properti berhasil disetujui!", "Properti ditolak.", "Verifikasi Properti", "Menunggu Review",
    "Menunggu", "Dihubungi", "Ditutup", "Daftar Leads", "Properti", "Status Properti",
    "Properti disetujui!", "Properti ditolak!", "Tinjauan Properti", "Daftar Properti Baru",
    "Nama Properti", "Aksi", "Tidak ada properti.", "Menunggu Verifikasi",
    "Tidak ada Owner yang perlu diverifikasi saat ini.", "Daftar:",
    "Listing Menunggu Review", "Properti Tersurvei", "Laporan Masalah",
    "Ringkasan aktivitas dan prioritas tugas agen internal.", "Daftar Prioritas Tugas",
    "Tugas", "Status", "Tenggat Waktu", "Tidak ada tugas yang perlu diselesaikan."
]

def make_key(text):
    clean = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    return "_".join(clean.lower().split())[:50]

for t in texts:
    id_dict[make_key(t)] = t
    en_dict[make_key(t)] = t # We will translate this later

print("Keys:")
for k, v in id_dict.items():
    print(f'"{k}": "{v}",')
