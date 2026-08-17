import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export interface GitCommitLogItem {
  hash: string
  shortHash: string
  authorName: string
  authorEmail: string
  committedAt: string
  message: string
  url: string
}

export interface GitCommitLogInfo {
  project: string
  version: string
  repository: string
  branch: string
  buildTime: string
  commits: GitCommitLogItem[]
}

export interface GitCommitLogOptions {
  /** Git 仓库目录，默认使用 Vite 的 root。 */
  cwd?: string
  /** 构建时最多读取的提交数量，默认 20。 */
  maxCommits?: number
  /** 调用 b() 时默认展示的提交数量，默认 8。 */
  defaultLimit?: number
  /** 页面加载后自动打印；传数字时同时指定打印条数，默认 false。 */
  autoPrint?: boolean | number
}

declare global {
  function b(limit?: number): GitCommitLogInfo

  interface Window {
    b: (limit?: number) => GitCommitLogInfo
    __SYBZ_GIT_COMMIT_LOG__: GitCommitLogInfo
  }
}

const normalizePositiveInteger = (value: unknown, fallback: number) => {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback
}

const runGit = (cwd: string, args: string[]) => {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return ''
  }
}

const normalizeRepositoryUrl = (url: string) =>
  url
    .trim()
    .replace(/^git\+/, '')
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/\.git$/, '')

const getCommitUrl = (repository: string, hash: string) => {
  if (!repository || !hash) return ''
  return `${repository}${/github\.com/i.test(repository) ? '/commit/' : '/-/commit/'}${hash}`
}

const readProjectPackage = (cwd: string) => {
  try {
    return JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf8')) as {
      name?: string
      version?: string
      repository?: string | { url?: string }
    }
  } catch {
    return {}
  }
}

const createGitCommitLogInfo = (cwd: string, maxCommits: number): GitCommitLogInfo => {
  const packageInfo = readProjectPackage(cwd)
  const packageRepository =
    typeof packageInfo.repository === 'string' ? packageInfo.repository : packageInfo.repository?.url || ''
  const repository = normalizeRepositoryUrl(packageRepository || runGit(cwd, ['remote', 'get-url', 'origin']))
  const output = runGit(cwd, ['log', `-${maxCommits}`, '--pretty=format:%H%x1f%h%x1f%an%x1f%ae%x1f%aI%x1f%s'])
  const commits = output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [hash = '', shortHash = '', authorName = '', authorEmail = '', committedAt = '', message = ''] =
        line.split('\x1f')
      return {
        hash,
        shortHash,
        authorName,
        authorEmail,
        committedAt,
        message,
        url: getCommitUrl(repository, hash),
      }
    })

  return {
    project: packageInfo.name || resolve(cwd).split('/').pop() || '',
    version: packageInfo.version || '',
    repository,
    branch: process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF || runGit(cwd, ['branch', '--show-current']),
    buildTime: new Date().toISOString(),
    commits,
  }
}

const serialize = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

const createClientCode = (info: GitCommitLogInfo, defaultLimit: number, autoPrint: boolean | number) => `
(() => {
  const info = ${serialize(info)};
  const formatDateTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString('zh-CN', { hour12: false });
  };
  const normalizeLimit = (value) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.min(Math.floor(number), info.commits.length) : ${defaultLimit};
  };
  window.__SYBZ_GIT_COMMIT_LOG__ = info;
  window.b = (limit = ${defaultLimit}) => {
    const commits = info.commits.slice(0, normalizeLimit(limit));
    console.group(info.project + ' git commits');
    console.table([{ project: info.project, version: info.version, branch: info.branch, buildTime: formatDateTime(info.buildTime), repository: info.repository }]);
    console.table(commits.map((commit, index) => ({ index: index + 1, hash: commit.shortHash, committedAt: formatDateTime(commit.committedAt), author: commit.authorName, message: commit.message, url: commit.url })));
    console.groupEnd();
    return info;
  };
  ${autoPrint ? `window.b(${typeof autoPrint === 'number' ? autoPrint : defaultLimit});` : ''}
})();`

/**
 * 为 Vite 项目注册 Git 提交记录调试工具。页面加载后可在控制台调用 `b()` 查看。
 */
export const gitCommitLog = (options: GitCommitLogOptions = {}): Plugin => {
  const maxCommits = normalizePositiveInteger(options.maxCommits, 20)
  const defaultLimit = Math.min(normalizePositiveInteger(options.defaultLimit, 8), maxCommits)
  let viteRoot = process.cwd()

  return {
    name: 'sybz-git-commit-log',
    configResolved(config) {
      viteRoot = config.root
    },
    transformIndexHtml: {
      order: 'pre',
      handler() {
        const cwd = resolve(options.cwd || viteRoot)
        const info = createGitCommitLogInfo(cwd, maxCommits)
        return [
          {
            tag: 'script',
            children: createClientCode(info, defaultLimit, options.autoPrint ?? false),
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}
