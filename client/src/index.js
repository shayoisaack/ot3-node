import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Play from './pages/Play';
import Login from './pages/Login';
import Games from './pages/Games';
import GameWait from './pages/GameWait';
import Leaderboard from './pages/Leaderboard';

render((
    <Router>
        <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/games' component={Games} />
                {/* <Route path='/login' component={Login} /> */}
                <Route path='/gamewait' component={GameWait} />
                <Route path='/play' component={Play} />
                <Route path='/leaderboard' component={Leaderboard} />
</Switch>
</Router>), 
    document.getElementById('root'));
registerServiceWorker();
