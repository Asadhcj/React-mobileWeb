import React ,{Component,Fragment} from "react";
import { NavBar, Icon , SwipeAction, List, Checkbox,Modal } from 'antd-mobile';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {checkedAll,checkOne,changeNum,deleteGoods} from "../createaction/createAction";
const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

class Cart extends Component{
    render(){
        return (
            <Fragment>
                 <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                onClick={()=>this.props.history.go(-1)}
                >购物车</NavBar>
                 <List>
                     {this.props.cartnum.map(e=>
                    <SwipeAction
                    key={e.id}
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                        {
                        text: '取消',
                        onPress: () =>{},
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                        text: '删除',
                        onPress: () => alert('警告', '确定要删除吗???', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确认', onPress: () =>this.props.handledelete(e.id)},
                          ]),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                    >
                   
                    <div className="goodslist">
                        {/* 复选框 */}
                        <div className="goods_checked">
                        <CheckboxItem  checked={e.ischecked} 
                        onClick={()=>this.props.chkOne(e.id)}/>
                        </div>
                        {/* 商品图片 */}
                        <div className="gooods_img">
                            <img src={e.img_url} alt=""/>
                        </div>
                        {/* 商品价格 */}
                        <div className="goods_introduce">
                            <span className="goods_title">{e.title}</span>
                            <span className="goods_price">￥{e.sell_price}</span>
                        </div>
                        {/* 数量加减按钮*/}
                        <div className="goods_number">
                           <span className="num_reduce" onClick={()=>this.props.handlechangenum(e.id,-1,e.num)}>-</span> 
                           <span>{e.num}</span> 
                           <span className="num_add"  onClick={()=>this.props.handlechangenum(e.id,1,e.num)}>+</span> 
                        </div>
                    </div>
                   
                    </SwipeAction>
                    )}
                    <style jsx>{`
                        .goodslist{
                            display: flex;
                            justify-content: space-between;
                            align-items:center;    
                            .goods_checked{
                                flex:1;
                            }
                            .gooods_img{
                                flex:3;
                            }
                            .goods_introduce{
                                flex:3;
                                display: flex;
                                flex-direction: column;
                                padding-left:10px;
                              
                                .goods_title{
                                 -webkit-line-clamp:2; 
                                display:-webkit-box;
                                -webkit-box-orient:vertical;
                                overflow:hidden; 
                                text-overflow: ellipsis; 
                                margin-bottom:10px;
                                }
                                .goods_price{
                                    color: orangered;
                                }
                            }
                            .goods_number{
                                flex:2;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                font-size:20px;
                                .num_reduce{
                                    color:#999;
                                    font-size:30px;
                                }
                                .num_add{
                                    color:#999;
                                }
                            }
                        }
                    `}</style>
                </List>
                <div className="cart_tool">
                    <div className="checkedAll">
                        <CheckboxItem checked={this.props.ischeckedall} onClick={()=>this.props.chkAll(this.props.ischeckedall)}>
                        全选
                        </CheckboxItem>
                        
                    </div>
                    <div className="allPrice">
                        <span className="price_text">合计</span>
                        <span className="price">￥{this.props.prices}</span>
                    </div>
                    <div className="settlement">去结算({this.props.chklength})</div>
                    <style jsx>{`
                        .cart_tool{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: fixed;
                            bottom:45px;
                            width:100%;
                               
                            .checkedAll{

                                flex:2;
                            }
                            .allPrice{
                                flex:3;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size:16px;
                                .price_text{}
                                .price{
                                    color:orangered;
                                }
                            }
                            .settlement{
                                flex:3;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height:40px;
                                background-color:orangered;
                                color:#fff;
                                font-size:18px;
                            }
                        }
                    `}</style>
                </div>
            </Fragment>
        )
    }
};
function getAllprice(arr){
    let price=0
    arr.forEach(e=> {
        if(e.ischecked){
            price+=e.sell_price*e.num
        }
    });
    return price
}
const mapStateTopprops=(state)=>{ 
    return {
        cartnum:state.cartNum.cartnums,
        chklength:state.cartNum.cartnums.map(e=>e.ischecked).length,
        ischeckedall:state.cartNum.cartnums.length&&state.cartNum.cartnums.every(e=>e.ischecked===true),
        prices:getAllprice(state.cartNum.cartnums)
    }
};
const  mapDispatchprops=(dispatch)=>{
    return{
        chkAll:(flag)=>{
            dispatch(checkedAll(flag))
        },
        chkOne:(id)=>{
            dispatch(checkOne(id))
        },
        handlechangenum:(id,negative,num)=>{
            if(num===1&&negative===-1){
                alert('警告', '确定要删除吗???', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => dispatch(deleteGoods(id)) },
                  ])
            }else{
                dispatch(changeNum(id,negative))
            }
            
        },
        handledelete:(id)=>{
            dispatch(deleteGoods(id))
        }
    }
}
export default withRouter( connect(mapStateTopprops, mapDispatchprops)(Cart));