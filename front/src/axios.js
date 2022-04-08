import axios from './axios'

const http = axios.create({
  baseURL:'http://localhost:3000/api/user'
})

//请求拦截
http.interceptors.request.use (
  cofig =>{
  if (localStorage.user){
    config.headers.Authorization = localStorage.user
    }
    return config
})

//响应拦截
http.interceptors.response.use(res=>{
  return res
},err =>{
    console.log(err.response)
   // Message.error(err.response.data)
})

export default http