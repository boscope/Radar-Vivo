#!/bin/bash

OUT="RADAR_CONTEXT.md"

echo "# RADAR VIVO PROJECT REPORT" > "$OUT"
echo "" >> "$OUT"

echo "## DATA" >> "$OUT"
date >> "$OUT"

echo "" >> "$OUT"

echo "## NODE" >> "$OUT"
node -v >> "$OUT" 2>/dev/null

echo "" >> "$OUT"

echo "## NPM" >> "$OUT"
npm -v >> "$OUT" 2>/dev/null

echo "" >> "$OUT"

echo "## NEXT" >> "$OUT"
grep '"next"' package.json >> "$OUT" 2>/dev/null

echo "" >> "$OUT"

echo "## PACKAGE.JSON" >> "$OUT"
cat package.json >> "$OUT"

echo "" >> "$OUT"

echo "## TREE" >> "$OUT"
find . \
-not -path "./node_modules/*" \
-not -path "./.next/*" \
-not -path "./.git/*" \
| sort >> "$OUT"

echo "" >> "$OUT"

echo "## TYPESCRIPT FILES" >> "$OUT"

find . \
-name "*.ts" \
-o -name "*.tsx" \
| while read file
do
echo "" >> "$OUT"
echo "======================================" >> "$OUT"
echo "$file" >> "$OUT"
echo "======================================" >> "$OUT"
cat "$file" >> "$OUT"
done

echo ""
echo "Relatório criado em:"
echo "$OUT"
