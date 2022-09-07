/**
*
登录
*@param {String} mobile 手机号
*@param {Number} code 验证码
*@returns Promise
*/

import requset from '@/utils/request'
export const login = (mobile, code) => {
  return requset({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return requset({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
