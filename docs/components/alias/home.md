# Shell Alias 快捷命令

Alias 是 Shell 自带的命令别名功能，可以把经常输入的长命令缩短成一两个字符。例如执行 `s` 等价于执行 `git status`，执行 `ll` 会打开 Portal Dev 账号选择菜单。

## 环境准备

macOS 默认已安装 Zsh，可以直接查看当前 Shell：

```bash
echo $SHELL
```

如果输出中包含 `zsh`，配置文件默认为 `~/.zshrc`。Linux 可先通过系统包管理器安装 Zsh；Windows 可在 WSL 中使用相同配置。

## 配置方法

1. 打开 Zsh 配置文件：

```bash
open -e ~/.zshrc
```

2. 在文件中添加 alias：

```bash
alias s='git status'
alias ll='portal-dev login'
```

3. 保存后重新加载配置：

```bash
source ~/.zshrc
```

4. 查看已定义的 alias：

```bash
alias
```

删除当前终端会话中的某个 alias 可使用 `unalias <名称>`。要永久删除，还需从 `~/.zshrc` 中删除对应行并重新 `source`。

## Portal Dev 快捷命令

先全局安装 Portal Dev：

```bash
npm install -g @sybz-components/portal-dev
```

然后可以在 `~/.zshrc` 中配置：

```bash
alias ch='portal-dev ch'
alias sjs='portal-dev sjs'
alias ll='portal-dev login'
alias op='open ~/.config/sybz-components/portal-dev.json'
```

| Alias | 实际命令                                         | 作用                                  |
| ----- | ------------------------------------------------ | ------------------------------------- |
| `ch`  | `portal-dev ch`                                  | 执行 alias 为 `ch` 的成华登录 profile |
| `sjs` | `portal-dev sjs`                                 | 执行 alias 为 `sjs` 的石景山 profile  |
| `ll`  | `portal-dev login`                               | 打开所有账号的单键选择菜单            |
| `op`  | `open ~/.config/sybz-components/portal-dev.json` | 打开 Portal Dev 用户配置文件          |

`ch` 和 `sjs` 依赖 Portal Dev profile 中已存在同名 `alias`。可先执行 `portal-dev login` 检查账号，或执行 `portal-dev --help` 查看完整说明。

## 当前 `~/.zshrc` 中的 Alias

以下内容根据当前本机 `~/.zshrc` 中的 alias 声明整理：

```bash
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
eval "$(/opt/homebrew/bin/brew shellenv)"
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 以空格开头的命令不进入 history
setopt HIST_IGNORE_SPACE

# 减少重复历史
setopt HIST_IGNORE_DUPS
setopt HIST_FIND_NO_DUPS

# 自动忽略无意义命令
zshaddhistory() {
  emulate -L zsh
  local cmd=${1%%$'\n'}

  case $cmd in
    ls|ls\ *|ll|ll\ *|la|la\ *|pwd|clear|history|history\ * )
      return 1
      ;;
  esac

  return 0
}



function autoGitCommit() {
    local message

    # 1. 必须传参数
    if [ $# -eq 0 ]; then
        echo "❌ commit message is required"
        echo "usage: autoGitCommit \"your message\""
        return 1
    fi

    message="fix: $*"

    # 2. 检查是否有变更
    if [ -z "$(git status --porcelain)" ]; then
        echo "❌ no changes"
        return 0
    fi

    # 3. add
    git add . || {
        echo "❌ git add failed"
        return 1
    }

    # 4. pull
    echo "⬇️ pulling latest changes..."
    git pull || {
        echo "❌ pull failed, rollback staged changes..."
        git reset
        return 1
    }

    # 5. commit
    git commit -m "$message" || {
        echo "❌ commit failed"
        return 1
    }

    # 6. push
    echo "⬆️ pushing..."
    git push || {
        echo "❌ push failed"
        return 1
    }

    echo "🎉 success!"
}


alias a='alias'
alias b='git branch'
alias bb='pm run build'
alias brancha='branchAdd'
alias branchd='branchDelete'
alias c='clear'
alias C='clear'

alias cd.c='cd /Users/liulihao/cyrd'
alias cd.g='cd /Users/liulihao/githubProject'
alias cd.i='cd /Users/liulihao/images'
alias cd.m='cd /Users/liulihao/myProject'
alias cd.s='cd /Users/liulihao/sybz'
alias ch='portal-dev ch'
alias sjs='portal-dev sjs'
alias cd.t='cd /Users/liulihao/testProject'

alias date='cal && date "+%Y-%m-%d %H:%M:%S"'
alias d='pm run dev || pm run serve || pm run start'
alias dd='pm run deploy'
alias ddd='pm run deploy-no-build'
alias gg='autoGitCommit'
alias gl='git log'
alias gp='git pull'
alias g='git'
alias gc='git checkout'
alias g.='git checkout .'

alias h='history'
unalias kk 2>/dev/null
kk() {
  if [[ -z "$1" ]]; then
    pkill node
    return
  fi

  local port="$1"
  if [[ ! "$port" =~ ^[0-9]+$ ]]; then
    echo "用法: kk [端口号]"
    return 2
  fi

  local pids
  pids=$(lsof -ti :"$port")
  if [[ -z "$pids" ]]; then
    echo "端口 $port 没有找到监听进程"
    return 0
  fi

  echo "$pids" | xargs kill -TERM
}

alias l='ls'

alias ni='pm install'
alias pa='pm add'
alias pi='pm install'
alias pp='npm run lint:prettier'
alias pr='pm run'
alias p='pnpm'
alias python=python3.12
alias python3=python3.12

alias pwdc="pwd && pwd | pbcopy"

alias r='pm run'
alias rr='pm run release-deploy'
alias rn='sudo npm cache clean --force && rm -rf node_modules package-lock.json'
alias ll='portal-dev login'

alias s='git status'
alias sz='source ~/.zshrc'

alias uu='pm run update'

alias v='viewVersionFunc'
alias vv='viewVersionFunc sybz-components && viewVersionFunc @sybz-components/utils && viewVersionFunc @sybz-components/portal-dev'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

alias oz='open -e ~/.zshrc'
alias op='open ~/.config/sybz-components/portal-dev.json'

function viewVersionFunc() {
    if [ -z "$1" ]; then
        echo 'Usage: v <package-name>'
        return 1
    fi

    npm view "$1" versions
    npm view "$1" version time --json | node -e '
let s="";
process.stdin.on("data",d=>s+=d);
process.stdin.on("end",()=>{
  const j=JSON.parse(s);
  const d=new Date(j.time[j.version]);
  const p=n=>String(n).padStart(2,"0");
  const t =
    d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+" "+
    p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
  console.log(j.version+" "+t);
});
'

}

function gcc() {
    local keyword branches matches count

    if [ -z "$1" ]; then
        echo 'Usage: gcc <branch-keyword>'
        return 1
    fi

    keyword="$1"
    branches=$(git branch --all --format='%(refname:short)' 2>/dev/null | sed 's#^remotes/[^/]*/##' | awk 'NF' | sort -u)

    if [ -z "$branches" ]; then
        echo 'No git branches found in the current repository.'
        return 1
    fi

    matches=$(echo "$branches" | grep -Fx "$keyword")
    if [ -z "$matches" ]; then
        matches=$(echo "$branches" | grep -E "^$keyword")
    fi
    if [ -z "$matches" ]; then
        matches=$(echo "$branches" | grep -F "$keyword")
    fi

    count=$(echo "$matches" | awk 'NF' | wc -l | tr -d ' ')

    if [ "$count" -eq 0 ]; then
        echo "No branch matches: $keyword"
        return 1
    fi

    if [ "$count" -gt 1 ]; then
        echo "Multiple branches match: $keyword"
        echo "$matches"
        return 1
    fi

    git checkout "$matches"
}


function branchAdd() {
    if [ -z "$1" ]; then
        echo 'Usage: gb <branch-name>'
        return 1
    fi

    git checkout -b "$1" && git push -u origin "$1"
}

function branchDelete() {
    if [ -z "$1" ]; then
        echo 'Usage: gd <branch-name> [force]'
        return 1
    fi

    if git show-ref --verify --quiet "refs/heads/$1"; then
        if [ "$1" = "$(git branch --show-current)" ]; then
            echo "Cannot delete current branch: $1"
            return 1
        fi

        git branch -d "$1" || return 1
    else
        echo "Local branch not found: $1"
    fi

    if [ "$2" = "force" ]; then
        git push origin --delete "$1"
    fi
}

pm() {
  local dir="$PWD"
  local manager=""

  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" ]]; then
      if grep -q '"packageManager"[[:space:]]*:[[:space:]]*"bun@' "$dir/package.json"; then
        manager="bun"
        break
      elif grep -q '"packageManager"[[:space:]]*:[[:space:]]*"pnpm@' "$dir/package.json"; then
        manager="pnpm"
        break
      elif grep -q '"packageManager"[[:space:]]*:[[:space:]]*"npm@' "$dir/package.json"; then
        manager="npm"
        break
      fi
    fi

    if [[ -f "$dir/bun.lockb" || -f "$dir/bun.lock" ]]; then
      manager="bun"
      break
    elif [[ -f "$dir/pnpm-lock.yaml" ]]; then
      manager="pnpm"
      break
    elif [[ -f "$dir/package-lock.json" ]]; then
      manager="npm"
      break
    fi

    dir="$(dirname "$dir")"
  done

  [[ -z "$manager" ]] && manager="npm"

  command "$manager" "$@"
}

```

## 依赖与注意事项

- `pm`、`branchAdd`、`branchDelete`、`autoGitCommit` 和 `viewVersionFunc` 是另外定义的函数或命令；只复制 alias 无法独立运行。
- `cd.*` 使用当前电脑的绝对路径，其他电脑使用时需替换为自己的目录。
- `python` 和 `python3` 依赖本机已安装 `python3.12`。
- `open`、`pbcopy` 是 macOS 命令，Linux/WSL 中需要替换。
- `rn` 会清理 npm 缓存并删除当前项目的 `node_modules` 和 `package-lock.json`，使用前需确认当前目录。
