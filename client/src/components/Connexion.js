import React from 'react';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
const Close = (props) => {
    return (
        <span {...props}>
            <FontAwesome style={{color: '#333'}} size='2x' name='times' />
        </span>
    );
};
class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        };
        fetch('http://localhost:8080/login', options)
            .then(res => {
                if (res.status === 401) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                localStorage.setItem('tokenADM', data.token);
                this.setState({ loggedIn: true });
            })
            .catch(error => this.setState({ message: error.message }));
    }
    render() {
        if (this.state.loggedIn) return <Redirect to='/dashboard'/>
        return (
            <div className={`login`}>
                <div className="content">
                    <Close
                        className='content__close'
                        onClick={this.props.close} />
                    <h1 className='content__message'>Login required</h1>
                    <p className='content__http'>{this.state.message}</p>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="email" ref={node => this.email = node}/>
                        <input type="password" ref={node => this.password = node}/>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default Connexion;
