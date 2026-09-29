#!/usr/bin/env bash
# Builds the site from the latest master and swaps the running container.
#
# Runs on the VPS as the forced command of the GitHub Actions deploy key (see
# "Hosting and deployment" in the README), or by hand. Settings come from the
# environment so the authorized_keys line can set them:
#
#   LD_REPO_DIR   checkout to build from        (default /root/LaDespani)
#   LD_CONTAINER  name of the running container (default ladespani)
#   LD_PUBLISH    docker -p host side           (default 3000, e.g. 127.0.0.1:3000)
#
# Everything is inside main() so bash has parsed the whole file before
# `git reset` rewrites it on disk mid-run.
set -euo pipefail

main() {
  local repo_dir="${LD_REPO_DIR:-/root/LaDespani}"
  local name="${LD_CONTAINER:-ladespani}"
  local publish="${LD_PUBLISH:-3000}"
  local repo_url="https://github.com/Gargant0373/LaDespani.git"
  local branch="master"

  # Two quick pushes must not swap containers at the same time.
  if command -v flock >/dev/null; then
    exec 9>/tmp/ladespani-deploy.lock
    flock 9
  fi

  if [ ! -d "$repo_dir/.git" ]; then
    git clone --quiet --branch "$branch" "$repo_url" "$repo_dir"
  fi
  cd "$repo_dir"
  # Fetch by URL so the checkout's own remote config does not matter. reset
  # --hard leaves untracked files alone, which is what keeps .env in place.
  git fetch --quiet "$repo_url" "$branch"
  git reset --quiet --hard FETCH_HEAD
  local rev
  rev="$(git rev-parse --short HEAD)"
  echo "==> building $rev"

  # Build before touching the running container, so a failed build changes
  # nothing on the live site.
  docker build --tag "$name:$rev" .

  local previous
  previous="$(docker inspect --format '{{.Config.Image}}' "$name" 2>/dev/null || true)"

  echo "==> starting $name:$rev"
  start "$name" "$name:$rev" "$publish"

  if ! healthy "$publish"; then
    echo "==> $name:$rev failed its health check" >&2
    docker logs --tail 40 "$name" >&2 || true
    if [ -n "$previous" ]; then
      echo "==> rolling back to $previous" >&2
      start "$name" "$previous" "$publish"
      if healthy "$publish"; then
        echo "==> $previous is serving again" >&2
      else
        echo "==> $previous is unhealthy too; the site is down" >&2
      fi
    fi
    exit 1
  fi

  # The VPS is shared and short on disk. Keep this site's three newest builds
  # for a manual rollback, and drop build cache nothing has used for a week.
  docker images "$name" --format '{{.Tag}}' | tail -n +4 |
    while read -r tag; do docker rmi "$name:$tag" >/dev/null 2>&1 || true; done
  docker builder prune --force --filter until=168h >/dev/null

  echo "==> deployed $rev"
}

start() {
  docker rm --force "$1" >/dev/null 2>&1 || true
  docker run --detach --name "$1" --restart unless-stopped \
    --publish "$3:3000" "$2" >/dev/null
}

# The homepage must load and an unknown URL must be a real 404. The second
# check is what catches a return to single-page mode, which silently served
# the homepage for every URL.
healthy() {
  local base="http://127.0.0.1:${1##*:}"
  for _ in $(seq 1 30); do
    if [ "$(status "$base/")" = 200 ] && [ "$(status "$base/__deploy-check__")" = 404 ]; then
      return 0
    fi
    sleep 1
  done
  return 1
}

status() {
  curl --silent --output /dev/null --write-out '%{http_code}' "$1" || true
}

main "$@"
