import {ADD_CART ,CHECKED_ALL, CHECKED_ONE, CHANGE_NUM, DELETE_GOODS} from "../../createaction/actionType"
//  新建购物车管理员，创建原始数据。
 const defaultstate={
    cartnums:[]
}
// 暴露一个函数出去，函数中会写很多小逻辑
export default (state=defaultstate,action)=>{
    
    switch (action.type){
        case (ADD_CART):{
            let newstate=JSON.parse(JSON.stringify(state));
            if(newstate.cartnums.length===0){
                newstate.cartnums.push(action.value)
            }else{
               const flage= newstate.cartnums.some(e=>e.id===action.value.id);
                  if(flage){
                    newstate.cartnums[0].num+=1
            }else{
                newstate.cartnums.push(action.value)
            }
            }
            state=newstate
        }
        break;
        // 单选与多选
        case (CHECKED_ALL):{
            let newstate=JSON.parse(JSON.stringify(state));
            newstate.cartnums.forEach(e=>e.ischecked=action.value);
            state=newstate
        }
        break;
        case (CHECKED_ONE):{
            let newstate=JSON.parse(JSON.stringify(state));
            newstate.cartnums.filter(e=>e.id===action.value)[0].ischecked=!newstate.cartnums.filter(e=>e.id===action.value)[0].ischecked
            state=newstate
        }
        break;
        case (CHANGE_NUM):{
            let newstate=JSON.parse(JSON.stringify(state));
                console.log(action)
                newstate.cartnums.filter(e=>e.id===action.value.id)[0].num +=action.value.negative
                state=newstate
        }
        break;
        case (DELETE_GOODS):{
            let newstate=JSON.parse(JSON.stringify(state));
          let str= newstate.cartnums.filter(e=>e.id!==action.value)
          newstate.cartnums=str
            state=newstate
        }
    }
    return state
}