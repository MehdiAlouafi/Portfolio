import React from 'react';
import { NavLink } from 'react-router-dom'
const Navigation = (props) => {
    const showDashboardLink = localStorage.getItem('tokenADM') !== null;
    return (
        <nav>
            {
                showDashboardLink &&
                <NavLink
                    activeClassName='active'
                    to='/dashboard'>Dashboard</NavLink>
            }
            <NavLink
                activeClassName='active home'
                exact
                to='/'>Home</NavLink>
            <NavLink
                activeClassName='active projets'
                to='/projets'>Projets</NavLink>
            <NavLink
                activeClassName='active about'
                to='/about'>About</NavLink>
        </nav>
    );
}

export default Navigation;
