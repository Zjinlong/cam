import axios from 'axios';
import { Message } from 'element-ui';
function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}

function getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}
function logCookie() {
  let tk = null
  if(localStorage.getItem('_xsrf')){
    tk = localStorage.getItem('_xsrf')
  } 
　　 return tk
}
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // timeout: 50000,


});

service.interceptors.request.use(
    
    config => {
    
        if(config.url !== '/users/signin'){
            config.headers = {
                "Authorization":'Bearer '+localStorage.getItem('_xsrf') || ''
                // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
     
        if(error.response.status == 403){
            Message({
                message: '登录过期，请重新登录',
                type: 'error'
              })
            localStorage.removeItem('_xsrf')
            localStorage.removeItem('username')
            window.location.href = '/'
           
        }
        if(error.response.status == 422){
            Message({
                message: '登录失败，账号密码有误',
                type: 'error'
              })
        }
        if(error.response.status == 500){
            Message({
                message: '服务器请求失败',
                type: 'error'
              })
              return  
        }
        if(error.response.status == 400){
            Message({
                message: '请求参数有误',
                type: 'error'
              })
              return  
        }
        return Promise.reject();
    }
);

export default service;
