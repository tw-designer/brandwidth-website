#!/bin/zsh

echo "Watching for file changes (excluding .git)..."

fswatch -or --exclude '\.git/' --exclude '.*\.swp$' . | while read f; do
  # Only commit if there are actual changes
  if [[ -n $(git status --porcelain) ]]; then
    clear
    echo "Change detected. Committing and pushing..."
    git add .
    git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
    git push
  else
    echo "Change detected, but nothing new to commit."
  fi
done
