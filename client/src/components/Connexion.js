import React from 'react';
import { Redirect } from 'react-router-dom';

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
            <div>
                <h1>{this.state.message}</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="email" ref={node => this.email = node}/>
                    <input type="password" ref={node => this.password = node}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

}

export default Connexion;
