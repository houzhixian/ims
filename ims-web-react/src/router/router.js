import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import List from '../page/menu/list';
import App from '../App';


const getRouter = () => (
    <Router>
        <div>
            {/*<ul>*/}
            {/*    <li><Link to="/">首页</Link></li>*/}
            {/*    <li><Link to="/menu">菜单</Link></li>*/}
            {/*</ul>*/}
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/menu" component={List}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;