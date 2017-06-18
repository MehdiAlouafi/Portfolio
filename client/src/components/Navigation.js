import React from 'react';
import { NavLink } from 'react-router-dom'
const Navigation = (props) => {
    const showDashboardLink = localStorage.getItem('tokenADM') !== null;
    return (
        <nav>
            {
                showDashboardLink &&
                <NavLink
                    activeStyle={{ backgroundColor: '#FC153B'}}
                    to='/dashboard'>Dashboard</NavLink>
            }
            <NavLink
                activeStyle={{ backgroundColor: '#FC153B'}}
                to='/projets'>Projets</NavLink>
            <NavLink
                activeStyle={{ backgroundColor: '#FC153B'}}
                to='/about'>About</NavLink>
        </nav>
    );
}

export default Navigation;
