import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Editor from './components/Editor';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectPage from './components/ProjectPage';

import NotFound from './components/NotFound';

const Routes = () => (
    <div>
        <Switch>
            <Route exact path='/projets' component={ProjectList} />
            <Route path='/projects/:id' component={ProjectPage} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/editor' component={Editor} />
            <Route path='(/|/about|/connexion)' component={Home} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Routes;
