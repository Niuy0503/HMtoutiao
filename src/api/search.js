import request from '@/utils/request'

/**
 * 搜索建议
 * @param {搜索关键字} q
 * @returns
 */

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResultsAPI = (/*eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
