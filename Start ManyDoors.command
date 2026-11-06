#!/bin/zsh
# Double-click this file to start ManyDoors. Keep this window open while you use the app.
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

if lsof -nP -iTCP:5173 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "ManyDoors is already running. Opening it in your browser..."
  open "http://localhost:5173"
  exit 0
fi

if [ ! -d node_modules ]; then
  echo "First-time setup: installing (this takes about a minute)..."
  npm install || { echo "Setup failed. Press Enter to close."; read; exit 1; }
fi

echo "Starting ManyDoors... your browser will open in a few seconds."
echo "To stop the app, close this window (or press Control + C)."
( sleep 2; open "http://localhost:5173" ) &
npm run dev
