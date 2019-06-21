import { Carousel, WingBlank } from 'antd-mobile';
import  React from "react";
import {Getgoods}  from "../api"
class Home extends React.Component {
    state = {
      data: [],
     
    }
    componentDidMount() {
        Getgoods().then(res=>{
            console.log(res)
            if(res.status===0){
                this.setState({
                    data:res.message.sliderlist
                })
            }
        })
      
    }
    render() {
      return (
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite={true}
            autoplayInterval={3000}
          >
            {this.state.data.map(val => (
              <a
                key={val.id}        
                href="#"
                style={{ display: 'inline-block', width: '100%', }}
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
      );
    }
  }
  
export default  Home;