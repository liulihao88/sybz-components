#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -euo pipefail

skip_build=false
commit_message="更新"

for arg in "$@"; do
    case "$arg" in
        -k|--skip-build)
            skip_build=true
            ;;
        *)
            commit_message="$arg"
            ;;
    esac
done

if [ "$skip_build" = false ]; then
    # 打包生成静态文件
    pnpm docsbuild
elif [ ! -f "docs/.vitepress/dist/index.html" ]; then
    echo "docs/.vitepress/dist/index.html 不存在，无法跳过 docsbuild"
    exit 1
fi

# 提交打包静态网站到 github-pages 分支
cd docs/.vitepress/dist
touch .nojekyll
git init -b main
git checkout -B main
git add .
if ! git diff --cached --quiet; then
    git commit -m "deploy"
else
    echo "文档产物没有变化，继续推送当前 dist HEAD"
fi

# 部署到 https://<username>.github.io/<repo>
git push -f https://github.com/liulihao88/sybz-components.git HEAD:github-pages

# 提交所有代码到github
cd ../../../
git add .
if ! git diff --cached --quiet; then
    git commit -m "$commit_message"
fi
git push -u origin main --follow-tags
