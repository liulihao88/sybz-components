export function createAlgolia() {
  return {
    // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    appId: 'ZN8VN43G8D',
    apiKey: '6b6e7845261ceff59ea5eeb84e0bde86',
    indexName: 'sybz-components',
    container: '### REPLACE ME WITH A CONTAINER (e.g. div) ###',
    placeholder: '请输入关键词',
    translations: {
      button: {
        buttonText: '搜索文档',
      },
    },
  }
}

export const Github = 'https://github.com/liulihao88/sybz-components/tree/main'
