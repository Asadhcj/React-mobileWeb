// 引入仓库管理员
import reducer from "./reducers";
// 引入仓库生成器
import {createStore} from "redux";
// 把store和管理员reducer一起暴露出去
export default createStore(reducer);
