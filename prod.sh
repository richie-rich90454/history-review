#!/usr/bin/env bash
# Run the frontend and backend in production mode (parallel).
#
# Runs the built Spring Boot jar and serves the built frontend via
# `vite preview`. Run ./build.sh first to produce the artifacts.
#
# Backend  -> http://localhost:8080
# Frontend -> http://localhost:4173
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

jar="$root/backend/target/history-backend-0.0.1-SNAPSHOT.jar"
dist="$root/frontend/dist"

if [ ! -f "$jar" ]; then
    echo "Backend jar not found: $jar" >&2
    echo "Run ./build.sh first." >&2
    exit 1
fi
if [ ! -d "$dist" ]; then
    echo "Frontend dist not found: $dist" >&2
    echo "Run ./build.sh first." >&2
    exit 1
fi

cleanup() {
    echo -e "\n\033[33mShutting down...\033[0m"
    kill "$backend_pid" "$frontend_pid" 2>/dev/null || true
    wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Starting backend..."
cd "$root/backend"
java -jar "$jar" &
backend_pid=$!

echo "Starting frontend..."
cd "$root/frontend"
npm run preview &
frontend_pid=$!

echo -e "\033[32mBackend  running at http://localhost:8080\033[0m"
echo -e "\033[32mFrontend running at http://localhost:4173\033[0m"
echo -e "\033[33mPress Ctrl+C to stop.\033[0m"

wait
