import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
    <p>Oops 404 Not Found. <Link style={{ textDecoration: 'underline'}} to='/'>Retournez à la Page d'accueil</Link></p>
);

export default NotFound;
