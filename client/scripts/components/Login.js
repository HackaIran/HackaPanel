import React from 'react'
import socket from '../model/socket'

class Login extends React.Component {

    login () {
        const username = window.localStorage['hacka-username'] = this.refs.username.value;
        const password = window.localStorage['hacka-password'] = this.refs.password.value;
        socket.on('connect', () => socket.emit('user login', { username, password }))
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
        return (
            <div className={"float-box animate " + (this.props.show ? '' : 'hidden')}>
                <form onSubmit={this.onLoginRequest.bind(this)}>
                    <span>Welcome to <b>Hacka{'{Karaj}'}!</b>:)</span>
                    <input ref="username" placeholder="Username here" />
                    <input ref="password" type="password" placeholder="Password here" />
                    <button>Enter</button>
                </form>
            </div>
        )
    }
}

export default Login