import request from '@/utils/request'
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 *
 * @returns Promise
 * 获取所有频道
 */

export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *
 * @param {删除频道} id
 * @returns
 */

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *新增频道
 * @param {String|Number} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns
 */

export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
