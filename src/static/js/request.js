import axios from 'axios'
// import md5 from 'blueimp-md5'

// axios 配置
axios.defaults.timeout = 220000

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// Add a response interceptor
axios.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    console.log('error-->', error)
    return Promise.reject(error)
  }
)
// 接口地址
// const API_URL = 'http://192.168.0.109:9090'
// const API_URL = 'https://webadd.herokuapp.com' // heroku服务器
const API_URL = 'https://api.2048888.xyz' // ikoula 服务器
// ajax方法封装
function fetch(path, method = 'GET', params = {}) {
  return axios({
    method: method,
    url: API_URL + path,
    data: params
  })
}
export default fetch;
