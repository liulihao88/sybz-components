export function createAlgolia() {
  return {
    appId: 'OWC5FF7N30',
    apiKey: '610e973b9963174fcbc3409dfca4bacb',
    indexName: 'liulihao88_github_io_owc5ff7n30_pages',
    searchParameters: {
      attributesToRetrieve: [
        'hierarchy.lvl0',
        'hierarchy.lvl1',
        'hierarchy.lvl2',
        'hierarchy.lvl3',
        'hierarchy.lvl4',
        'hierarchy.lvl5',
        'hierarchy.lvl6',
        'content',
        'type',
        'url',
        'title',
        'headers',
        'description',
      ],
      attributesToSnippet: [
        'hierarchy.lvl1:10',
        'hierarchy.lvl2:10',
        'hierarchy.lvl3:10',
        'hierarchy.lvl4:10',
        'hierarchy.lvl5:10',
        'hierarchy.lvl6:10',
        'content:10',
        'title:10',
        'description:10',
      ],
    },
    transformSearchClient(searchClient) {
      const removeLangFacetFilters = (facetFilters) => {
        if (!facetFilters) return undefined

        const filters = Array.isArray(facetFilters) ? facetFilters : [facetFilters]
        const cleanedFilters = filters
          .map((filter) => {
            if (!Array.isArray(filter)) {
              return String(filter).startsWith('lang:') ? null : filter
            }

            const nestedFilters = filter.filter((nestedFilter) => !String(nestedFilter).startsWith('lang:'))
            return nestedFilters.length ? nestedFilters : null
          })
          .filter(Boolean)

        return cleanedFilters.length ? cleanedFilters : undefined
      }

      const snippetResult = (value) => ({
        value,
        matchLevel: 'none',
        matchedWords: [],
      })

      const mapAlgoliaHitToDocSearchHit = (item) => {
        const isDocSearchHit = Boolean(item.type && item.hierarchy)
        const title = item.hierarchy?.lvl1 || item.title || 'Sybz Components'
        const content = item.content || item.description || title
        const hierarchy = {
          lvl0: item.hierarchy?.lvl0 || 'Sybz Components',
          lvl1: title,
          lvl2: item.hierarchy?.lvl2 || item.headers?.[0] || null,
          lvl3: item.hierarchy?.lvl3 || item.headers?.[1] || null,
          lvl4: item.hierarchy?.lvl4 || item.headers?.[2] || null,
          lvl5: item.hierarchy?.lvl5 || item.headers?.[3] || null,
          lvl6: item.hierarchy?.lvl6 || item.headers?.[4] || null,
        }

        return {
          ...item,
          type: item.type || 'lvl1',
          content: isDocSearchHit ? content : undefined,
          hierarchy,
          _highlightResult: {
            ...item._highlightResult,
            hierarchy: {
              ...item._highlightResult?.hierarchy,
              lvl0: item._highlightResult?.hierarchy?.lvl0 || snippetResult(hierarchy.lvl0),
              lvl1: item._highlightResult?.hierarchy?.lvl1 || item._highlightResult?.title || snippetResult(title),
            },
          },
          _snippetResult: {
            ...item._snippetResult,
            content: isDocSearchHit ? item._snippetResult?.content || item._highlightResult?.content || snippetResult(content) : undefined,
            hierarchy: {
              ...item._snippetResult?.hierarchy,
              lvl0: item._snippetResult?.hierarchy?.lvl0 || snippetResult(hierarchy.lvl0),
              lvl1: item._snippetResult?.hierarchy?.lvl1 || item._highlightResult?.title || snippetResult(title),
            },
          },
        }
      }

      return {
        ...searchClient,
        search(requests) {
          return searchClient
            .search(
              requests.map((request) => {
                const params = request.params || {}
                const facetFilters = removeLangFacetFilters(params.facetFilters)
                const cleanedParams = {
                  ...params,
                  facetFilters,
                }

                if (!facetFilters) {
                  delete cleanedParams.facetFilters
                }

                return {
                  ...request,
                  params: cleanedParams,
                }
              }),
            )
            .then((response) => ({
              ...response,
              results: response.results.map((result) => ({
                ...result,
                hits: (result.hits || []).map(mapAlgoliaHitToDocSearchHit),
              })),
            }))
        },
      }
    },
    placeholder: '请输入关键词',
    translations: {
      button: {
        buttonText: '搜索文档',
      },
    },
  }
}

export const Github = 'https://github.com/liulihao88/sybz-components/tree/main'
