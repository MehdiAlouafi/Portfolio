import React from 'react';
import { Link } from 'react-router-dom';
const styles = {
    textDecoration: 'underline'
};
const About = () => (
        <div>
            <p className='f3-ns f3-m f4'>
                J'ai découvert le code pour la toute première fois à Simplon où j'y ai suivi une formation de développeur web durant 6 mois. <br />
                J'ai ensuite été accepté en tant qu'alternant au sein de l'équipe de SimplonProd, le pôle d'innovation numérique de Simplon, avec qui je continue
                aujourd'hui mon aventure.
            </p>
            <p className='f3-ns f3-m f4'>
                Beaucoup de choses se sont enchaînées pour moi ces 2 dernières années, j'ai pu découvrir une passion.
            </p>
            <p className='f3-ns f3-m f4'>
                Je code en Javascript : ReactJS, Redux, NodeJS, MeteorJS, Npm, Webpack, ...<br />
                <Link style={styles} to='/projets'>Découvrez les  projets sur lesquels j'ai travaillé </Link>
            </p>
        </div>
);

export default About;
