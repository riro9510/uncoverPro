#!/bin/bash

SNIPPETS_DIR=".devtools/snippets"
VSCODE_SNIPPETS_DIR="$HOME/.config/Code/User/snippets"

# Detectar plataforma
case "$(uname)" in
  Darwin) VSCODE_SNIPPETS_DIR="$HOME/Library/Application Support/Code/User/snippets" ;; # macOS
  Linux) VSCODE_SNIPPETS_DIR="$HOME/.config/Code/User/snippets" ;;
  MINGW*|CYGWIN*|MSYS*) VSCODE_SNIPPETS_DIR="$APPDATA/Code/User/snippets" ;; # Windows con Git Bash
esac

echo "📁 Copying snippets to VS Code..."

mkdir -p "$VSCODE_SNIPPETS_DIR"

for file in $SNIPPETS_DIR/*.code-snippets; do
  fname=$(basename "$file")
  cp "$file" "$VSCODE_SNIPPETS_DIR/$fname"
  echo "✅ $fname installed"
done

echo "🚀 Snippets installed."
