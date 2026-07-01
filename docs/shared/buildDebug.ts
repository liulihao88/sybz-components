type BuildCommit = {
  hash: string
  shortHash: string
  authorName: string
  authorEmail: string
  committedAt: string
  message: string
  url: string
}

type DocsBuildInfo = {
  project: string
  version: string
  repository: string
  homepage: string
  branch: string
  buildTime: string
  latestCommitHash: string
  latestCommitShortHash: string
  latestCommitTime: string
  latestCommitMessage: string
  commits: BuildCommit[]
}

type BuildDebugResult = DocsBuildInfo & {
  componentsBuildTime: string
  utilsBuildTime: string
}

declare const __SYBZ_DOCS_BUILD_INFO__: DocsBuildInfo | undefined
declare const __SYBZ_COMPONENTS_BUILD_TIME__: string | undefined
declare const __SYBZ_UTILS_BUILD_TIME__: string | undefined

declare global {
  interface Window {
    b?: (limit?: number) => BuildDebugResult
    __SYBZ_BUILD_INFO__?: BuildDebugResult
  }
}

const emptyBuildInfo: DocsBuildInfo = {
  project: 'sybz-components',
  version: '',
  repository: '',
  homepage: '',
  branch: '',
  buildTime: '',
  latestCommitHash: '',
  latestCommitShortHash: '',
  latestCommitTime: '',
  latestCommitMessage: '',
  commits: [],
}

const getInjectedDocsBuildInfo = () => {
  if (typeof __SYBZ_DOCS_BUILD_INFO__ !== 'undefined' && __SYBZ_DOCS_BUILD_INFO__) {
    return __SYBZ_DOCS_BUILD_INFO__
  }

  return emptyBuildInfo
}

const getInjectedBuildTime = (value: unknown) => (typeof value === 'string' && value ? value : '未注入')

const formatDateTime = (value: string) => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const pad = (num: number) => String(num).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const normalizeLimit = (limit: unknown, max: number) => {
  const numericLimit = Number(limit)

  if (!Number.isFinite(numericLimit) || numericLimit <= 0) {
    return max
  }

  return Math.min(Math.floor(numericLimit), max)
}

const createBuildDebugResult = (): BuildDebugResult => ({
  ...getInjectedDocsBuildInfo(),
  componentsBuildTime: getInjectedBuildTime(
    typeof __SYBZ_COMPONENTS_BUILD_TIME__ === 'undefined' ? undefined : __SYBZ_COMPONENTS_BUILD_TIME__,
  ),
  utilsBuildTime: getInjectedBuildTime(
    typeof __SYBZ_UTILS_BUILD_TIME__ === 'undefined' ? undefined : __SYBZ_UTILS_BUILD_TIME__,
  ),
})

export const registerBuildDebug = () => {
  if (typeof window === 'undefined') return

  const buildInfo = createBuildDebugResult()

  window.__SYBZ_BUILD_INFO__ = buildInfo
  window.b = (limit = 8) => {
    const commits = buildInfo.commits.slice(0, normalizeLimit(limit, buildInfo.commits.length))

    console.group('sybz-components build info')
    console.table([
      {
        project: buildInfo.project,
        version: buildInfo.version,
        branch: buildInfo.branch,
        buildTime: buildInfo.buildTime,
        componentsBuildTime: buildInfo.componentsBuildTime,
        utilsBuildTime: buildInfo.utilsBuildTime,
        latestCommit: buildInfo.latestCommitShortHash,
        latestCommitTime: formatDateTime(buildInfo.latestCommitTime),
        latestCommitMessage: buildInfo.latestCommitMessage,
        repository: buildInfo.repository,
      },
    ])
    console.table(
      commits.map((commit, index) => ({
        index: index + 1,
        hash: commit.shortHash,
        committedAt: formatDateTime(commit.committedAt),
        author: commit.authorName,
        message: commit.message,
        url: commit.url,
      })),
    )
    console.groupEnd()

    return buildInfo
  }
}
