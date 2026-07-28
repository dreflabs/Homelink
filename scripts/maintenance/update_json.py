import json
import os

keys_id = {
  "properti_berhasil_disetujui": "Properti berhasil disetujui!",
  "properti_ditolak": "Properti ditolak.",
  "verifikasi_properti": "Verifikasi Properti",
  "menunggu_review": "Menunggu Review",
  "menunggu": "Menunggu",
  "dihubungi": "Dihubungi",
  "ditutup": "Ditutup",
  "daftar_leads": "Daftar Leads",
  "properti": "Properti",
  "status_properti": "Status Properti",
  "properti_disetujui": "Properti disetujui!",
  "properti_ditolak_banget": "Properti ditolak!",
  "tinjauan_properti": "Tinjauan Properti",
  "daftar_properti_baru": "Daftar Properti Baru",
  "nama_properti": "Nama Properti",
  "aksi": "Aksi",
  "tidak_ada_properti": "Tidak ada properti.",
  "menunggu_verifikasi": "Menunggu Verifikasi",
  "tidak_ada_owner_yang_perlu_diverifikasi_saat_ini": "Tidak ada Owner yang perlu diverifikasi saat ini.",
  "daftar": "Daftar: ",
  "listing_menunggu_review": "Listing Menunggu Review",
  "properti_tersurvei": "Properti Tersurvei",
  "laporan_masalah": "Laporan Masalah",
  "ringkasan_aktivitas_dan_prioritas_tugas_agen_inter": "Ringkasan aktivitas dan prioritas tugas agen internal.",
  "daftar_prioritas_tugas": "Daftar Prioritas Tugas",
  "tugas": "Tugas",
  "status": "Status",
  "tenggat_waktu": "Tenggat Waktu",
  "tidak_ada_tugas_yang_perlu_diselesaikan": "Tidak ada tugas yang perlu diselesaikan."
}

keys_en = {
  "properti_berhasil_disetujui": "Property successfully approved!",
  "properti_ditolak": "Property rejected.",
  "verifikasi_properti": "Property Verification",
  "menunggu_review": "Awaiting Review",
  "menunggu": "Pending",
  "dihubungi": "Contacted",
  "ditutup": "Closed",
  "daftar_leads": "Leads List",
  "properti": "Property",
  "status_properti": "Property Status",
  "properti_disetujui": "Property approved!",
  "properti_ditolak_banget": "Property rejected!",
  "tinjauan_properti": "Property Overview",
  "daftar_properti_baru": "New Property List",
  "nama_properti": "Property Name",
  "aksi": "Action",
  "tidak_ada_properti": "No properties.",
  "menunggu_verifikasi": "Awaiting Verification",
  "tidak_ada_owner_yang_perlu_diverifikasi_saat_ini": "No Owners to verify at the moment.",
  "daftar": "Registered: ",
  "listing_menunggu_review": "Listings Awaiting Review",
  "properti_tersurvei": "Surveyed Properties",
  "laporan_masalah": "Issue Reports",
  "ringkasan_aktivitas_dan_prioritas_tugas_agen_inter": "Summary of internal agent activities and task priorities.",
  "daftar_prioritas_tugas": "Task Priority List",
  "tugas": "Task",
  "status": "Status",
  "tenggat_waktu": "Deadline",
  "tidak_ada_tugas_yang_perlu_diselesaikan": "No tasks to complete."
}

for lang, data_dict in [("id", keys_id), ("en", keys_en)]:
    path = f"messages/{lang}.json"
    with open(path, "r") as f:
        data = json.load(f)
    data["InternalAgent"] = data_dict
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
print("Updated json files")
