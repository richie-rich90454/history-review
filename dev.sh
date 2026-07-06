#!/usr/bin/env bash
# Run the frontend and backend in development mode (parallel).
#
# Backend  -> http://localhost:8080
# Frontend -> http://localhost:5173
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cleanup() {
    echo -e "\n\033[33mShutting down...\033[0m"
    kill "$backend_pid" "$frontend_pid" 2>/dev/null || true
    wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Starting backend..."
cd "$root/backend"
./mvnw spring-boot:run &
backend_pid=$!

echo "Starting frontend..."
cd "$root/frontend"
npm run dev &
frontend_pid=$!

echo -e "\033[32mBackend  running at http://localhost:8080\033[0m"
echo -e "\033[32mFrontend running at http://localhost:5173\033[0m"
echo -e "\033[33mPress Ctrl+C to stop.\033[0m"

wait
