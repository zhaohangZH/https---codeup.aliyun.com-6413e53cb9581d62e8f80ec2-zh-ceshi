#!/bin/bash

branch=${1:-dev}
ref=dev
if [ "$branch" = "dev" ]; then
  ref=dev
elif [ "$branch" = "uat" ] ; then
  ref=uat
elif [ "$branch" = "master" ] ; then
  ref=prod
else
  exit 1
fi

# 设置全局缓存
yarn config set cache-folder ~/.yarn
# 构建中优先使用缓存中
yarn install --prefer-offline

# 编译
yarn build:mp-weixin-${ref}

# 部署
node .${ref}-ci.js
