#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

command -v cwebp >/dev/null || { echo "cwebp not found. Install it with: brew install webp" >&2; exit 1; }

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

for isbn in $(grep -oE "isbn: '[0-9Xx-]+'" src/lib/books.ts | cut -d"'" -f2 | tr -d '-' | tr x X); do
	out="static/books/$isbn.webp"
	[[ -f "$out" ]] && continue
	if curl -sfL "https://covers.openlibrary.org/b/isbn/$isbn-L.jpg?default=false" -o "$tmp"; then
		cwebp -quiet -q 80 -resize 0 300 "$tmp" -o "$out"
		echo "Added $out"
	else
		echo "No Open Library cover for $isbn. Save one to $out by hand." >&2
	fi
done
