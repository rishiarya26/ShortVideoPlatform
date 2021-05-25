#!/bin/sh
git log -n 1 > commits.txt
readline=$(head -n 1 commits.txt)
commithash="$(cut -d' ' -f2 <<< $readline)"
echo "var appVersion = '$commithash'; module.exports = appVersion" > app-version.js

