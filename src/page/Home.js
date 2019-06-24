import { Carousel, WingBlank } from 'antd-mobile';
import  React,{Fragment} from "react";
import {Getgoods,getGoodsgroup}  from "../api";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
    state = {
      data: [],
      RecommendDatas:[],
      Goodsgroup:[],
      imgHeight: 176,
    }
    componentDidMount() {
        Getgoods().then(res=>{
            if(res.status===0){
                this.setState({
                    data:res.message.sliderlist,
                    RecommendDatas:res.message.toplist
                })
            }
        });
        getGoodsgroup().then(res=>{
            if(res.status===0){
              this.setState({
                Goodsgroup:res.message,
              })
            }
        })
      
    }
    render() {
      return (
       
        <Fragment>
            <WingBlank>
              <Carousel
                autoplay={true}
                infinite={true}
                autoplayInterval={3000}
              >
                {this.state.data.map(val => (
                  <a
                    key={val.id}        
                    href="javascript:;"
                    style={{ display: 'inline-block', width: '100%', }}
                    onClick={()=>this.props.history.push("/goosdetails/"+val.id)}
                  >
                    <img
                      src={val.img_url}
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
            </WingBlank>
            {/* 轮播图完成，推荐商品开始 */}
            <div>
            <div className="Recommend_commodities">{"推荐商品"}</div>
            <div className="Recommend_contents">
                {this.state.RecommendDatas.map(e=>{
                  return(
                    <Fragment key={e.id}>
                      <a href="javascrip:;"
                      className="Recommend_goodslist" 
                      onClick={()=>this.props.history.push("/goosdetails/"+e.id)}>
                      <div className="Recommend_imgbox" >
                        <img className="Recommend_img" src={e.img_url} alt=""/>
                      </div>
                      <div className="Recommend_titlebox">
                        <span className="Recommend_title">{e.title}</span>
                      </div>
                      </a>
                    </Fragment>
                  )
                })}
                
                </div>
                <style jsx>{`
                    .Recommend_commodities{
                        background-color:#eee;
                        color:#666;
                       padding: 10px;
                    }
                    .Recommend_contents{   
                        .Recommend_goodslist{ 
                          display: flex; border-bottom: 1px solid #ccc;
                          .Recommend_imgbox{
                            flex:1;
                           
                            .Recommend_img{
                              padding:10px;
                            }
                          }
                          .Recommend_titlebox{
                            display: flex;
                            align-items: center;
                            font-size: 16px;  
                            flex:6;
                            overflow:hidden;
                            .Recommend_title{
                              overflow:hidden;
                              white-space: nowrap; 
                              text-overflow: ellipsis;
                            }
                          }
                        }
                    }
                 `}
                 </style>
            </div>
                 {/* 推荐商品完成，商品分类开始 */}
            <div>
            <div className="Goodsgroup">
            {this.state.Goodsgroup.map(e=>
               <div className="Goodsgroup_box" key={e.level1cateid}>
                <div className="Goodsgroup_catetitle" >{e.catetitle}</div>
                <div className="Goodsgroup_content">
                  {e.datas.map(val=>
                  <a href="javascrip:;"
                  className="Goodsgroup_content_list" 
                  onClick={()=>this.props.history.push("/goosdetails/"+val.artID)}
                  key={val.artID}>
                      <div className="Goodsgroup_content_imgbox">
                        <img src={val.img_url} alt="" className="Goodsgroup_content_img"/>
                      </div>
                      <p className="Goodsgroup_content_artTitle">{val.artTitle}</p>
                      <div className="Goodsgroup_content_price">
                        <span className="Goodsgroup_content_sell_price">{val.sell_price}</span>
                        <span className="Goodsgroup_content_market_price">{val.market_price}</span>
                      </div>
                      <p className="Goodsgroup_content_stock_quantity">热卖中：{val.stock_quantity}</p>
                  </a>)}
                </div>
              </div>)}
            </div>
            <style jsx>{`
                  .Goodsgroup{
                    .Goodsgroup_box{
                      .Goodsgroup_catetitle{
                        background-color:#eee;
                        color:#666;
                       padding: 10px;
                      }
                      .Goodsgroup_content{
                            display: flex;
                            flex-wrap: wrap;
                        .Goodsgroup_content_list{
                              width: 50%;
                              padding:10px;
                          .Goodsgroup_content_imgbox{
                            .Goodsgroup_content_img{}
                          }
                          .Goodsgroup_content_artTitle{
                            -webkit-line-clamp:2; 
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            overflow:hidden; 
                            text-overflow: ellipsis; 
                          }
                          .Goodsgroup_content_price{
                            display:flex;
                            justify-content: space-between;
                            .Goodsgroup_content_sell_price{
                              color:orangered;
                              
                            }
                            .Goodsgroup_content_market_price{
                              color:#666;
                              text-decoration: line-through;
                            }
                          }
                          .Goodsgroup_content_stock_quantity{}
                        }
                      }
                    }
                  }
              `}</style>
          </div>
        </Fragment>
      );
    }
  }
 
export default withRouter(Home) ;