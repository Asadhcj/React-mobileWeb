import axios from "axios";
// axios.defaults.baseURL="http://react.zbztb.cn/site/";
axios.defaults.baseURL="http://react.zbztb.cn/"
axios.interceptors.response.use(function (response) {
  
 
    // 返回什么数据 其他用了 axios 请求的返回值 就是什么数据 
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export const Getgoods=()=>axios.get("/site/goods/gettopdata/goods")