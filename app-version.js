const appVersion = 'a341e02f7cb408131d24241fccad4915b381a14c';
module.exports = appVersion;

// script to generate this file
// git log -n 1 > commits.txt
// readline=$(head -n 1 commits.txt)
// commithash="$(cut -d' ' -f2 <<< $readline)"
// echo "const appVersion = '$commithash';\nmodule.exports = appVersion;" > app-version.js
