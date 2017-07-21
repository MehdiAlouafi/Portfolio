import './stylesheets/index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import Routes from './Routes';

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
            openMenu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState(prevState => ({
            openMenu: !prevState.openMenu
        }));
    }

    render() {
        return (
            <Router>
                <div className='app'>
                    <div className="container">
                        <Route render={ (props) => (
                            <Navigation
                                {...props}
                                {...this.state}
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
