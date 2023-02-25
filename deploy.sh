#!/usr/bin/env sh
set -e
npx yarn build
cd build
echo 'www.cplay.work' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Cplayers/Cplayers.github.io.git master:main
git push -f git@gitee.com:NIGEHAOTINGA/cplay.git master:build
cd -