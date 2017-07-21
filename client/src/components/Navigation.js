import React from 'react';
import { NavLink } from 'react-router-dom'
const Navigation = (props) => {
    const { openMenu, closeMenu, showConnexion } = props;
    const { pathname: currentRoute } = props.location;
    const showDashboardLink = localStorage.getItem('tokenADM') !== null;

    return (
        <nav className={`${openMenu ? 'is-open' : ''}`}>
            {
                showDashboardLink &&
                <NavLink
                    onClick={closeMenu}
                    activeClassName='active'
                    to='/dashboard'>Dashboard</NavLink>
            }
            <NavLink
                onClick={closeMenu}
                activeClassName='active home'
                exact
                to='/'>Accueil</NavLink>
            <NavLink
                onClick={closeMenu}
                activeClassName='active projets'
                to='/projets'>Projets</NavLink>
            <NavLink
                onClick={closeMenu}
                activeClassName='active about'
                to='/about'>A propos</NavLink>
            <button onClick={() => {
                closeMenu();
                showConnexion();
            }} id='trigger-modal'>Login</button>
        </nav>
    );
}

export default Navigation;
