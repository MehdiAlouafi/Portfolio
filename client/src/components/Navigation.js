import React from 'react';
import { NavLink } from 'react-router-dom'
const Navigation = (props) => {
    return (
        <nav>
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
