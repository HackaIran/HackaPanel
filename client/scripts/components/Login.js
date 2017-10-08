import React from 'react'
import socket from '../model/socket'

class Login extends React.Component {

    onLoginRequest (event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        socket.emit('user login', { username, password })
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