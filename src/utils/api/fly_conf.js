
// import Fly from 'flyio'
const Fly = require("flyio/dist/npm/wx") 

const fly = new Fly();

fly.config.baseURL = "https://cnodejs.org/api/v1/"

// 请求拦截器
fly.interceptors.request.use((config) => {
  // console.log(config.body)
  switch (config.method) {
    case 'get':

      break;
    case 'post':

      break;
    default:
      break;
  }
  return config;
})
// 响应拦截器
fly.interceptors.response.use((response) => {
    if(response.status == 200 && response.data != ''){
      wx.hideLoading()
      return response.data.data
    }else{
      wx.hideLoading()
      return false
    }
  },
  (err) => {
    wx.hideLoading()
  }
)

export default fly;


