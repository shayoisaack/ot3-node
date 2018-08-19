import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Games from './pages/Games';
import GameWait from './pages/GameWait';

render((
    <Router>
        <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/games' component={Games} />
                {/* <Route path='/login' component={Login} /> */}
                <Route path='/gamewait' component={GameWait} />
</Switch>
</Router>), 
    document.getElementById('root'));
registerServiceWorker();
