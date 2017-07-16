import React from 'react';
import { Route } from 'react-router-dom';

import About from './About';
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
    close(event) {
        event.stopPropagation();
        this.setState(prevState => ({
            ...prevState,
            showLogin: false
        }))
    }
    render() {
        const [ blank, pathname ] = this.props.location.pathname.split('/');

        return (
            <div className={`homepage`}>
                {/* <Connexion/> */}
                {this.state.showLogin && <Connexion close={this.close.bind(this)} />}
                <div className="homepage__kicker">
                    <h1 className={` hompage__kicker ${pathname} f1-ns f2-m f3`}>
                        <strong>Salut</strong> ! Je m'appelle Mehdi<br/>
                        Et j'apprends à coder, <strong>continuellement</strong>.
                    </h1>
                    <div className="homepage__kicker__socials">
                        <a  className="homepage__kicker__links homeage__kicker__links--twitter"
                            href="https://twitter.com/AMehdiw">Twitter</a>
                        <a  className="homepage__kicker__links homeage__kicker__links--github"
                            href="https://github.com/MehdiAlouafi">GitHub</a>
                        <a  className="homepage__kicker__links homeage__kicker__links--linkedin"
                            href="https://www.linkedin.com/in/mehdi-alouafi-440529116/">LinkedIn</a>
                    </div>
                </div>

                <Route
                    location={this.props.location}
                    key={this.props.location.key}
                    exact path='/about'
                    component={About} />

            </div>
        );
    }
}

export default Home;
