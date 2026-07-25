#!/usr/bin/env python3
"""
Governance linter: mendeteksi file di docs/pages/ yang isinya masih
identik dengan template placeholder generik (belum diisi konten spesifik
per halaman).

Latar belakang: Audit dokumentasi HomeLink 2.0 (2026-07-24) menemukan bahwa
seluruh 161 file di docs/pages/ awalnya memiliki body konten yang 100%
identik (hanya nama halaman & routing path yang berbeda). Script ini
mengukur progres pengisian konten dari waktu ke waktu tanpa perlu
menghitung ulang checksum secara manual.

Cara kerja:
- Baris 1-7 setiap file (Title, Page Name, Module, Purpose, Routing Path)
  dilewati karena secara sah berbeda per halaman.
- Sisa body di-hash (SHA-256). Cluster hash terbesar dianggap sebagai
  "baseline placeholder" yang belum diisi kontennya.
- File dengan hash yang menyimpang dari baseline dianggap sudah diisi
  konten spesifik (customized).

Usage:
    python3 scripts/check_pages_placeholder.py [--strict] [--phase1-only]

    --strict       Exit code 1 jika masih ada modul Fase 1 yang placeholder.
    --phase1-only  Hanya tampilkan laporan untuk modul Fase 1.

Referensi pemetaan fase: docs/business_and_product/13_PRODUCT_ROADMAP.md §8.3
"""

import argparse
import hashlib
import sys
from collections import defaultdict
from pathlib import Path

HEADER_LINES_TO_SKIP = 7

# Sinkron dengan docs/business_and_product/13_PRODUCT_ROADMAP.md §8.3
PHASE_1_MODULES = {
    "01_public_website",
    "02_authentication",
    "03_property_search",
    "04_property_detail",
    "05_buyer_dashboard",
    "06_owner_dashboard",
    "09_surveyor",
    "11_admin",
    "17_company",
    "18_legal",
}


def body_hash(path: Path) -> str:
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    body = "\n".join(lines[HEADER_LINES_TO_SKIP:])
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


def module_of(path: Path, pages_root: Path) -> str:
    rel = path.relative_to(pages_root)
    return rel.parts[0] if len(rel.parts) > 1 else "(root)"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true")
    parser.add_argument("--phase1-only", action="store_true")
    parser.add_argument(
        "--pages-dir",
        default=str(Path(__file__).resolve().parent.parent / "docs" / "pages"),
    )
    args = parser.parse_args()

    pages_root = Path(args.pages_dir)
    files = sorted(pages_root.rglob("*.md"))
    if not files:
        print(f"Tidak ada file .md ditemukan di {pages_root}")
        return 0

    hashes: dict[str, list[Path]] = defaultdict(list)
    for f in files:
        hashes[body_hash(f)].append(f)

    baseline_hash, baseline_files = max(hashes.items(), key=lambda kv: len(kv[1]))
    placeholder_count = len(baseline_files)
    filled_count = len(files) - placeholder_count

    by_module_total: dict[str, int] = defaultdict(int)
    by_module_placeholder: dict[str, int] = defaultdict(int)
    for f in files:
        mod = module_of(f, pages_root)
        by_module_total[mod] += 1
        if f in baseline_files:
            by_module_placeholder[mod] += 1

    print(f"=== Laporan Progres Konten docs/pages/ ===")
    print(f"Total file       : {len(files)}")
    print(f"Masih placeholder: {placeholder_count} ({placeholder_count / len(files):.0%})")
    print(f"Sudah diisi      : {filled_count} ({filled_count / len(files):.0%})")
    print()
    print(f"{'Modul':<32} {'Fase':<7} {'Terisi/Total':<14} {'Status'}")
    print("-" * 70)

    strict_violation = False
    for mod in sorted(by_module_total):
        if args.phase1_only and mod not in PHASE_1_MODULES:
            continue
        total = by_module_total[mod]
        placeholder = by_module_placeholder.get(mod, 0)
        filled = total - placeholder
        phase_label = "Fase 1" if mod in PHASE_1_MODULES else "Fase 2+"
        status = "OK" if placeholder == 0 else "BELUM DIISI"
        if mod in PHASE_1_MODULES and placeholder > 0:
            strict_violation = True
        print(f"{mod:<32} {phase_label:<7} {f'{filled}/{total}':<14} {status}")

    print()
    if args.strict and strict_violation:
        print("STRICT MODE: Masih ada modul Fase 1 yang belum diisi kontennya. Gagal.")
        return 1

    print("Selesai. (Jalankan dengan --strict di CI untuk menggagalkan build jika modul Fase 1 belum lengkap.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
