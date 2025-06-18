#!/bin/zsh

echo "Watching for changes in $(pwd)..."

fswatch -o . | while read f; do
  clear
  echo "Change detected. Committing and pushing..."
  git add .
  git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')" && git push
done
