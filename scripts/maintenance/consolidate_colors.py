import os
import re

files = [
    "docs/ux_and_design/15_DESIGN_SYSTEM.md",
    "docs/ux_and_design/17_COMPONENT_LIBRARY.md",
    "docs/ux_and_design/22_UI_SPECIFICATION.md",
    "docs/ux_and_design/27_DASHBOARD_DESIGN_GUIDELINES.md",
    "docs/system_and_software/34_FRONTEND_ARCHITECTURE.md",
    "docs/system_and_software/94_FRONTEND_GOVERNANCE.md",
    "docs/system_and_software/95_FRONTEND_ENGINEERING_HANDBOOK.md"
]

def consolidate_file(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, not found.")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Rule 1: #0F172A -> #0D1729
    content = content.replace('#0F172A', '#0D1729')

    # Rule 2: Remove #155CFC, #1D4ED8, blue-700 as Brand/Action
    content = content.replace('#155CFC', '#0D1729')
    content = content.replace('#1D4ED8', '#0D1729')

    # Replace blue utility classes with primary/slate equivalents
    # For badges, "ubah ke warna Verified (Emerald) atau default (Slate)"
    # `bg-blue-50 text-blue-700 border-blue-200` to emerald
    content = content.replace('bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200')
    content = content.replace('text-blue-700', 'text-primary')
    content = content.replace('text-blue-600', 'text-primary')
    content = content.replace('bg-blue-600', 'bg-primary')
    content = content.replace('bg-blue-700', 'bg-primary')
    content = content.replace('border-blue-600', 'border-primary')
    content = content.replace('border-blue-200', 'border-slate-200')
    content = content.replace('bg-blue-50', 'bg-slate-50')
    content = content.replace('blue-700', 'primary')
    
    # "Hapus peran slate-900 atau #0F172A sebagai primary jika ada, ganti dengan #0D1729"
    # Wait, replace `slate-900` with `slate-950` only when it refers to action/primary, 
    # but it's easier to just replace text specifically like "slate-900 #0F172A" with "slate-950 #0D1729"
    content = content.replace('slate-900 `#0F172A`', 'slate-950 `#0D1729`')
    content = content.replace('`slate-900` `#0F172A`', '`slate-950` `#0D1729`')
    # Resolve the "Slate-900 is Action/Primary" sentence in 15_DESIGN_SYSTEM
    content = content.replace('Slate-900 is Action/Primary', '#0D1729 is Action/Primary')
    content = content.replace('Royal Blue is demoted to Brand/Trust/Info', 'Blue is removed as a Brand color')
    content = content.replace('Royal Blue', 'Blue')
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Updated {filepath}")

for f in files:
    consolidate_file(f)
