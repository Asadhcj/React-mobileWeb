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
  // 获取轮播图、推荐商品
export const Getgoods=()=>axios.get("/site/goods/gettopdata/goods")
// 获取商品分类列表
export const getGoodsgroup=()=>axios.get("/site/goods/getgoodsgroup")
// 获取商品详情信息
export const getGoodsinfo=(id)=>axios.get("/site/goods/getgoodsinfo/"+id)