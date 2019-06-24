import React ,{Component,Fragment} from "react";
import { NavBar, Icon , Carousel, WingBlank } from 'antd-mobile';
import {getGoodsinfo} from "../api";
import {connect} from "react-redux";
import {addGoodsInfo} from "../createaction/createAction"
class GoodsDetails extends Component{
    state = {
        data: [],
        goodsinfo:{},
        hotgoodslist:[],
        imgHeight: 176,
      }
      componentDidMount() {
        // simulate img loading
        
        let {id}=this.props.match.params
        getGoodsinfo(id).then(res=>{ 
            let {add_time}=res.message.goodsinfo
                add_time=add_time.replace("T"," ").slice(0,-5)
                res.message.goodsinfo.add_time=add_time
            if(res.status===0){
                this.setState({data:res.message.imglist,
                    hotgoodslist:res.message.hotgoodslist,
                    goodsinfo:res.message.goodsinfo})
            }
        })
       
    }
    render(){ 
        return (
            <Fragment> 
                <div>
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                onClick={()=>this.props.history.go(-1)}
                >商品详情</NavBar>
                {/* 轮播图部分 */}
                <Carousel
                    autoplay
                    infinite
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val.id}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={val.thumb_path}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                </div>
                {/* 商品详情介绍 */}
                <div>
                <div className="goodsinfo">
                    <div className="goodsinfo_title">
                        <h3>{this.state.goodsinfo.title}</h3>  
                    </div> 
                    <p>{this.state.goodsinfo.sub_title}</p>
                    <div className="goodsinfo_price">
                        <span className="goodsinfo_market_price">{this.state.goodsinfo.market_price}</span>
                        <span className="goodsinfo_sell_price">{this.state.goodsinfo.sell_price}</span>
                    </div>
                    <div className="goodsinfo_content">
                        <h3>商品参数</h3>
                        <p>商品编号：{this.state.goodsinfo.goods_no}</p>
                        <p>库存：{this.state.goodsinfo.stock_quantity}</p>
                        <p>{this.state.goodsinfo.add_time}</p>
                    </div>
                    <div  dangerouslySetInnerHTML={{__html:this.state.goodsinfo.content}}></div>
                </div>
                <style jsx>{`
                    .goodsinfo{
                        padding:10px;
                        .goodsinfo_title{
                            margin-bottom:10px;
                            margin-top:10px;
                        }
                        .goodsinfo_price{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom:10px; 
                            .goodsinfo_market_price{
                                text-decoration: line-through;
                            }
                            .goodsinfo_sell_price{
                                color:orangered;
                            }
                        }
                        .goodsinfo_content{
                            margin-bottom:10px;
                        }
                    }
                    `}</style>
                </div>
                {/* 详情页页脚 */}
                <div className="goodsdetails_footer">
                    <div className="Customer_service">
                        <span className="iconfont icon-kefu"></span>
                        <span>客服</span>
                    </div>
                    <div className="shopping_cart" onClick={()=>this.props.history.push("/cart")}>
                        <span className="iconfont icon-gouwuche"></span>
                        <span>购物车</span>
                        <span className="tip" style={{display:this.props.cartnum===0?"none":"block"}}>{this.props.cartnum}</span>
                    </div>
                    <div className="addCart" onClick={()=>this.props.addCart(this.state.goodsinfo)}>
                        加入购物车
                    </div>
                    <div className="nowBuy">
                       立即购买
                    </div>
                    <style jsx>{`   
                    .goodsdetails_footer{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height:45px;
                        position: fixed;
                        bottom: 0;
                        width:100%;
                        background-color:#fff;
                        .Customer_service{
                            flex:2;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        .shopping_cart{
                            flex:2;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            position:relative;
                            .tip{
                                width:20px;
                                height:20px;
                                border-radius:50%;
                                background-color:red;
                                position:absolute;
                                right:16px;
                                top:-10px;
                                color:#fff;
                                text-align:center;
                                line-height:20px;
                            }
                        }
                        .addCart{
                            flex:3;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color:orange;
                            font-size: 16px;
                            font-weight: 600;
                            color:#fff;
                            height:100%;
                        }
                        .nowBuy{
                            flex:3;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color:orangered;
                            font-size: 16px;
                            font-weight: 600;
                            color:#fff;
                            height:100%;
                            
                        }
                    }
                `}</style>
               
                </div>
               
               
            </Fragment>
        )                    
    }
};
const mapStateTopprops=(state)=>{ 
    return {
        cartnum:state.cartNum.cartnums.length
    }
};
const mapDispatchprops=(dispatch)=>{
    return {
        addCart:(newGoods)=>{
            newGoods.num=1;
            newGoods.ischecked=false
            dispatch(addGoodsInfo(newGoods))
        }
    }
}

export default connect(mapStateTopprops,mapDispatchprops)(GoodsDetails);

