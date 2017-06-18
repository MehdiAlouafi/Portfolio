import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import Routes from './Routes';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <Routes />
        </div>
    </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
