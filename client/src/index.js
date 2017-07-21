import './stylesheets/index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import Routes from './Routes';
import Connexion from './components/Connexion';

import FontAwesome from 'react-fontawesome';

const ToggleMenu = ({ isOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="container__open-menu">
            <FontAwesome
                style={{ color: '#333', fontSize: '30px' }}
                name={isOpen ? 'times' : 'bars'} />
        </button>
    );
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            showLogin: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.showConnexion = this.showConnexion.bind(this)
    }
    toggleMenu() {
        this.setState(prevState => ({
            openMenu: !prevState.openMenu
        }));
    }
    showConnexion() {
        this.setState(prevState => ({
            showLogin: !prevState.showLogin
        }))
    }
    render() {
        return (
            <Router>
                <div className='app'>
                    <div className="container">
                        { this.state.showLogin && <Connexion close={this.showConnexion}/>}
                        <Route render={ (props) => (
                            <Navigation
                                {...props}
                                {...this.state}
                                showConnexion={this.showConnexion}
                                closeMenu={this.toggleMenu}/>
                        )} />
                        <Routes />
                        <Route render={ (props) => (
                            <ToggleMenu
                                {...props}
                                onClick={this.toggleMenu}
                                isOpen={this.state.openMenu} />
                        )} />
                    </div>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
