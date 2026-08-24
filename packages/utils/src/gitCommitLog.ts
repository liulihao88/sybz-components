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
  tag: string
  describe: string
  upstream: string
  sync: string
  workspace: string
  mode: string
  node: string
  platform: string
  buildTime: string
  body: string
  commits: GitCommitLogItem[]
}

export interface GitCommitLogOptions {
  /** Git 仓库目录，默认使用 Vite 的 root。 */
  cwd?: string
  /** 构建时最多读取的提交数量，默认 20。 */
  maxCommits?: number
  /** 调用 b() 时默认展示的提交数量，默认 10。 */
  defaultLimit?: number
  /** 页面加载后自动打印；传数字时同时指定打印条数，默认 true。 */
  autoPrint?: boolean | number
  /** 打印后是否默认展开控制台分组，默认 false。 */
  expanded?: boolean
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

const createGitCommitLogInfo = (cwd: string, maxCommits: number, mode: string): GitCommitLogInfo => {
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
  const upstream = runGit(cwd, ['rev-parse', '--abbrev-ref', '@{upstream}'])
  const [ahead = '0', behind = '0'] = upstream
    ? runGit(cwd, ['rev-list', '--left-right', '--count', `HEAD...${upstream}`]).split(/\s+/)
    : []
  const changedFiles = runGit(cwd, ['status', '--porcelain']).split('\n').filter(Boolean).length

  return {
    project: packageInfo.name || resolve(cwd).split('/').pop() || '',
    version: packageInfo.version || '',
    repository,
    branch: process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF || runGit(cwd, ['branch', '--show-current']),
    tag: runGit(cwd, ['describe', '--tags', '--exact-match']) || '-',
    describe: runGit(cwd, ['describe', '--tags', '--always', '--dirty']) || '-',
    upstream: upstream || '-',
    sync: upstream ? `ahead ${ahead || 0} / behind ${behind || 0}` : '-',
    workspace: changedFiles ? `${changedFiles} changed` : 'clean',
    mode,
    node: process.version,
    platform: `${process.platform}/${process.arch}`,
    buildTime: new Date().toISOString(),
    body: runGit(cwd, ['log', '-1', '--pretty=format:%B']),
    commits,
  }
}

const serialize = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

const createClientCode = (
  info: GitCommitLogInfo,
  defaultLimit: number,
  autoPrint: boolean | number,
  expanded: boolean,
) => `
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
    const latestCommit = commits[0] || info.commits[0] || {};
    const summary = [
      '[build git info]',
      formatDateTime(info.buildTime) || '-',
      latestCommit.shortHash || '-',
      latestCommit.authorName || '-',
      latestCommit.message || '-',
    ].join(' · ');
    console.${expanded ? 'group' : 'groupCollapsed'}(summary);
    console.table({
      authorName: latestCommit.authorName || '-',
      buildTime: formatDateTime(info.buildTime),
      mode: info.mode,
      subject: latestCommit.message || '-',
      branch: info.branch || '-',
      tag: info.tag,
      describe: info.describe,
      shortHash: latestCommit.shortHash || '-',
      authorDate: formatDateTime(latestCommit.committedAt),
      upstream: info.upstream,
      sync: info.sync,
      workspace: info.workspace,
      node: info.node,
      platform: info.platform,
    });
    console.log('repository:', info.repository || '-');
    console.log('body:\\n' + (info.body || '-'));
    console.log('recentCommits:\\n' + commits.map((commit, index) =>
      String(index + 1).padStart(2, '0') + '. ' + formatDateTime(commit.committedAt) + ' [' + commit.shortHash + '] ' + commit.authorName + ': ' + commit.message
    ).join('\\n'));
    console.groupEnd();
    return info;
  };
  ${autoPrint ? `window.b(${typeof autoPrint === 'number' ? autoPrint : defaultLimit});` : ''}
})();`

/**
 * 为 Vite 项目注册 Git 提交记录调试工具。页面加载后默认打印，也可调用 `b()` 再次查看。
 */
export const gitCommitLog = (options: GitCommitLogOptions = {}): Plugin => {
  const maxCommits = normalizePositiveInteger(options.maxCommits, 20)
  const defaultLimit = Math.min(normalizePositiveInteger(options.defaultLimit, 10), maxCommits)
  let viteRoot = process.cwd()
  let viteMode = 'development'

  return {
    name: 'sybz-git-commit-log',
    configResolved(config) {
      viteRoot = config.root
      viteMode = config.mode
    },
    transformIndexHtml: {
      order: 'pre',
      handler() {
        const cwd = resolve(options.cwd || viteRoot)
        const info = createGitCommitLogInfo(cwd, maxCommits, viteMode)
        return [
          {
            tag: 'script',
            children: createClientCode(info, defaultLimit, options.autoPrint ?? true, options.expanded ?? false),
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}
