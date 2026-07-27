import os
import glob
import re

files_to_update = [
    "docs/pages/01_public_website/02_ABOUT_US.md",
    "docs/pages/01_public_website/04_CAREERS.md",
    "docs/pages/01_public_website/10_PRESS.md",
    "docs/pages/01_public_website/03_CONTACT.md",
    "docs/pages/01_public_website/05_PRICING.md",
    "docs/pages/03_property_search/01_SEARCH_RESULT.md",
    "docs/pages/06_owner_dashboard/03_ADD_PROPERTY.md",
    "docs/pages/16_ai/03_AI_VALUATION.md"
]

injection_text = """

**Premium UI Refinement Standards:**
- Semua Heading h1/h2 di UI harus tertulis di dokumen menggunakan class `tracking-tighter` dan `leading-[1.05]`.
- Jarak antar section adalah `py-24 lg:py-32`.
- Shadow menggunakan OKLCH Semantic Shadows (`shadow-card`, `shadow-float`, dsb).
- Penggunaan logo dengan `<Logo />` terpusat.
"""

for filepath in files_to_update:
    path = os.path.join("/Users/drefan/Projects/HOMELINK 2.0", filepath)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split('\n')
    last_heading_index = -1
    for i, line in enumerate(lines):
        if line.startswith("## ") and ("UI/UX" in line or "Aesthetic" in line or "Visual" in line):
            last_heading_index = i
            break
            
    if last_heading_index != -1:
        next_heading_index = -1
        for i in range(last_heading_index + 1, len(lines)):
            if lines[i].startswith("## "):
                next_heading_index = i
                break
                
        if next_heading_index != -1:
            lines.insert(next_heading_index, injection_text)
        else:
            lines.append(injection_text)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write('\n'.join(lines))
        print(f"Updated {filepath}")
    else:
        lines.append("\n## 8. UI/UX Aesthetic Rules (Visual Guidelines)")
        lines.append(injection_text)
        with open(path, "w", encoding="utf-8") as f:
            f.write('\n'.join(lines))
        print(f"Updated {filepath} (appended at end)")
