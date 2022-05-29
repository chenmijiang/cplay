#!/usr/bin/env sh
set -e
npm run build
cd build
echo 'www.cplay.work' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Cplayers/Cplayers.github.io.git master:main
cd -