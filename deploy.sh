#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd build

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# 当分支名称出现冲突的时候，使用 master:dev ，master是当前分支，dev是远程的分支
git push -f git@github.com:Cplayers/Cplayers.github.io.git master:main
# git@github.com:Your-songs-are-so-good/cplay.git

cd -