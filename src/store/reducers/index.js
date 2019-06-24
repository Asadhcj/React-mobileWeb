// 创建一个总管理员，引入分管理员，引入redux包中的合并方法combineReducers
import {combineReducers} from "redux"
import cartNum from "./cartNum"
// 将管理员合并后暴露出去
export default combineReducers({cartNum})