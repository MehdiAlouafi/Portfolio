import React from 'react';
import { Route } from 'react-router-dom';

import Connexion from './Connexion';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            currentStack: []
        };
        this.handleKonamiCode = this.handleKonamiCode.bind(this);
    }
    handleKonamiCode({ keyCode }) {
        const konamiCode = [38,38,40,40,37,39,37,39,66,65];
        this.setState(prevState => ({
            currentStack: [...prevState.currentStack, keyCode]
        }));
        this.state.currentStack.forEach((p, idx) => {
            // A la moindre différence, on reset la currentStack
            if (konamiCode[idx] !== p) {
                this.setState(prevState => ({ currentStack: [] }))
            } else if (idx === 9){
                this.setState(prevState => ({
                    currentStack: [],
                    showLogin: true
                }));
            }
        });
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKonamiCode);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKonamiCode);
    }
    render() {
        return (
            <div>
                {this.state.showLogin && <Connexion />}
                <h1>
                    <strong>Salut</strong> ! Je m'appel Mehdi<br/>
                    Et j'apprends à coder, <strong>continuellement</strong>.
                </h1>
                <Route exact path='/about' render={() => <h1>About</h1>} />
            </div>
        );
    }
}

export default Home;
