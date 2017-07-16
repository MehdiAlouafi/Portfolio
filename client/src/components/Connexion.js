import React from 'react';
import { Redirect } from 'react-router-dom';

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isOpen: false
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
            <div onClick={this.props.close} className={`login ${this.state.isOpen}`}>
                <div className="content">
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
