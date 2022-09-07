import axios from 'axios'

const requset = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default requset
