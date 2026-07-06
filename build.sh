#!/usr/bin/env bash
# Build the frontend and backend.
#
# Output:
#   Frontend -> frontend/dist/
#   Backend  -> backend/target/history-backend-0.0.1-SNAPSHOT.jar
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "== Building frontend =="
cd "$root/frontend"
npm run build

echo ""
echo "== Building backend =="
cd "$root/backend"
./mvnw clean package -DskipTests

echo ""
echo "Build complete." | sed 's/.*/\x1b[32m&\x1b[0m/'
echo "  Frontend dist: frontend/dist/"
echo "  Backend jar:   backend/target/history-backend-0.0.1-SNAPSHOT.jar"
