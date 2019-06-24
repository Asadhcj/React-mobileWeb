import {ADD_CART,CHECKED_ALL,CHECKED_ONE,CHANGE_NUM, DELETE_GOODS} from "./actionType";


// 创建添加商品的action方法
export const addGoodsInfo=(newGoods)=>{
    return{
        type:ADD_CART,
        value:newGoods,
    }
   
};

// 创建全选事件的action方法
export const checkedAll=(ischecked)=>{
    return {
        type:CHECKED_ALL,
        value:!ischecked,
    }
};

// 创建单选事件的action方法
export const checkOne=(id)=>{
    return {
        type:CHECKED_ONE,
        value:id,
    }
};

// 创建改变商品数量事件的action方法
export const changeNum=(ids,negatives)=>{
    return {
        type:CHANGE_NUM,
        value:{id:ids,negative:negatives}
    }
};

// 删除商品事件的action方法
export const deleteGoods=(id)=>{
    return {
        type: DELETE_GOODS,
        value:id
    }
}