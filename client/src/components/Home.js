import React from 'react';
import { Route } from 'react-router-dom';

import Connexion from './Connexion';

const Home = (props) => {
    return (
        <div>
            <h1>
                <strong>Salut</strong> ! Je m'appel Mehdi<br/>
                Et j'apprends à coder, <strong>continuellement</strong>.
            </h1>
            <Route exact path='/connexion' component={Connexion} />
            <Route exact path='/about' render={() => <h1>About</h1>} />
        </div>
    );
}

export default Home;
