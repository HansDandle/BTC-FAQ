#!/usr/bin/env python3
import sys
from pathlib import Path

try:
    import yaml
except Exception:
    print('PyYAML not installed; please run: python -m pip install pyyaml')
    sys.exit(2)

paths = [
    Path('.github/workflows/auto-blog.yml'),
    Path('.github/workflows/blog-generator-sonar.yml')
]

ok = True
for p in paths:
    if not p.exists():
        print(f'MISSING: {p}')
        ok = False
        continue
    try:
        yaml.safe_load(p.read_text())
        print(f'OK: {p}')
    except Exception as e:
        print(f'INVALID: {p} -> {e}')
        ok = False

sys.exit(0 if ok else 1)
