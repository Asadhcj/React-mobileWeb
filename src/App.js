import React ,{Fragment,Component} from 'react';
import './App.css';
import Layout from "./layouts";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Home from "./page/Home";
import Cart from "./page/Cart";
import User from "./page/User";
import GoodsDetails from "./page/Goodsdetails";

class  App extends Component {
      render (){
        return(
          <Fragment>
          <Router>
            <Route path="/" exact 
            render={(props)=><Layout {...props}><Home/></Layout>}/>
            <Route path="/cart" 
            render={(props)=><Layout {...props}><Cart/></Layout>}/>
            <Route path="/user" 
            render={(props)=><Layout {...props}><User/></Layout>}/>
            <Route path="/goosdetails/:id" component={GoodsDetails}/>
            {/* <Route path="/login" 
            component={()=>{}}/> */} 
          </Router>
        </Fragment>
        )
      }
}

export default App;
