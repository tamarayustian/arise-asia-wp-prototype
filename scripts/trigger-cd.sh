#!/usr/bin/env bash
set -euo pipefail

TARGET_BRANCH="main"
REMOTE="origin"
COMMIT_AUTHOR="Tamara Yustian <tamarayustian@gmail.com>"
COMMIT_MESSAGE=$(git log -1 --pretty=format:"%s")
DELAY=5  # seconds to wait for CI to pick up the push before reverting

if [[ -z "$COMMIT_MESSAGE" ]]; then
    echo "Error: could not determine latest commit message" >&2
    exit 1
fi

# -------- Safeguards --------

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: not in a git repository" >&2
    exit 1
fi

if ! git symbolic-ref -q HEAD > /dev/null 2>&1; then
    echo "Error: detached HEAD state" >&2
    exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]]; then
    echo "Error: on branch '$CURRENT_BRANCH', expected '$TARGET_BRANCH'" >&2
    exit 1
fi

if ! git diff --quiet --cached; then
    echo "Error: there are staged changes; commit or stash them first" >&2
    exit 1
fi

if ! git diff --quiet; then
    echo "Error: there are unstaged changes; stash or commit them first" >&2
    exit 1
fi

if ! git remote get-url "$REMOTE" > /dev/null 2>&1; then
    echo "Error: remote '$REMOTE' does not exist" >&2
    exit 1
fi

ORIGINAL_HEAD=$(git rev-parse HEAD)

# -------- Confirmation --------

echo "Target:  $REMOTE/$TARGET_BRANCH"
echo "Author:  $COMMIT_AUTHOR"
echo "Message: $COMMIT_MESSAGE"
echo "HEAD:    $(git rev-parse --short HEAD)"
echo ""
echo "This will create an empty commit, push it, then reset and"
echo "force-with-lease push to revert — triggering CI on $TARGET_BRANCH"
echo "without changing the working tree."
echo ""

read -p "Proceed? [y/N] " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# -------- Execute --------

git commit --allow-empty -m "$COMMIT_MESSAGE" --author="$COMMIT_AUTHOR"

git push "$REMOTE" "$TARGET_BRANCH"

sleep "$DELAY"

git reset --hard "$ORIGINAL_HEAD"
git push --force-with-lease "$REMOTE" "$TARGET_BRANCH"

echo ""
echo "Done. CI triggered on $REMOTE/$TARGET_BRANCH"
