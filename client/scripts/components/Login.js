import React from 'react'
import socket from '../model/socket'

class Login extends React.Component {

    constructor (props) {
        super(props);
        socket.on('user login error', message => console.error('LOGIN ERROR:', message));
        socket.on('are you connected', () => socket.emit('i am connected'))
    }

    login () {
        const username = window.localStorage['hacka-username'] = this.refs.username.value;
        const password = window.localStorage['hacka-password'] = this.refs.password.value;
        socket.emit('user login', { username, password })
    }

    componentDidMount () {
        this.refs.username.value = window.localStorage['hacka-username'] || '';
        this.refs.password.value = window.localStorage['hacka-password'] || '';
        if (!!this.refs.username.value && !!this.refs.password.value) this.login();
    }

    onLoginRequest (event) {
        event.preventDefault();
        this.login()
    }

    render() {
        const city = document.title.match(/{[A-z]+}/)[0];
        return (
            <div className={"float-box animate " + (this.props.show ? '' : 'hidden')}>
                <form onSubmit={this.onLoginRequest.bind(this)}>
                    <span>Welcome to <b>Hacka{city}!</b>:)</span>
                    <input ref="username" placeholder="Username here" />
                    <input ref="password" type="password" placeholder="Password here" />
                    <button>Enter</button>
                </form>
            </div>
        )
    }
}

export default Login