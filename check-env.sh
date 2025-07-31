#!/bin/bash

echo "✅ Validating .env..."
if [ ! -f .env ]; then
  echo "❌ .env file not found!"
  exit 1
fi

required_vars=("PORT" "DATABASE_URL" "JWT_SECRET")
for var in "${required_vars[@]}"; do
  if ! grep -q "$var=" .env; then
    echo "❌ Missing $var in .env"
    exit 1
  fi
done

echo "🎉 .env file is valid!"
npm start
