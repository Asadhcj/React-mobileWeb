import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./styles/iconfont.css";
// 引入store
import store from "./store"
// 引入redux和react的连接工具
// provider 是一个连接者工具
import {Provider} from "react-redux"

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

