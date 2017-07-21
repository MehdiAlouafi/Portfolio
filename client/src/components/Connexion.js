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
            message: '',
            error: false
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
        fetch(`${window.location.origin}/login`, options)
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
            .catch(error => this.setState({ message: 'Invalid Password/Email' , error: true }));
    }
    render() {
        if (this.state.loggedIn) return <Redirect to='/dashboard'/>
        const httpResponseStyle = this.state.error ? {
            backgroundColor: 'rgba(232, 30, 70, 0.3)'
        } : {};
        return (
            <div className={`login`}>
                <div className="content">
                    <Close
                        className='content__close'
                        onClick={this.props.close} />
                    <h1 className='content__message f1-l f2-m f3-s'>Login required</h1>
                    {this.state.error && (<p style={httpResponseStyle} className='content__http'>{this.state.message}</p>) }
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
