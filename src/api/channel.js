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
