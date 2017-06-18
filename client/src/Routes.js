import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import ProjectList from './components/ProjectList';
import ProjectPage from './components/ProjectPage';

import NotFound from './components/NotFound';

const Routes = () => (
    <div>
        <Switch>
            <Route exact path='/projets' component={ProjectList} />
            <Route path='/projects/:id' component={ProjectPage} />
            <Route path='(/|/about)' component={Home} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Routes;
