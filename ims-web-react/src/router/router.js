import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import List from '../page/menu/list';
import App from '../App';
import Demo from '../page/redux-demo';
import {Provider} from "react-redux";
import store from "../redux/store/demo";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';


moment.locale('zh-cn');

const getRouter = () => (
    <ConfigProvider locale={zhCN}>
        <Router>
            <Provider store={store}>
            {/*<ul>*/}
            {/*    <li><Link to="/">首页</Link></li>*/}
            {/*    <li><Link to="/menu">菜单</Link></li>*/}
            {/*</ul>*/}
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/redux" component={Demo}/>
                <Route path="/menu" component={List}/>
            </Switch>
        </Provider>
    </Router>
    </ConfigProvider>
    
);

export default getRouter;