import React from 'react'
import Header from './Header'
import Main from './Main'
import Login from './Login'

import user from '../model/user'
import socket from '../model/socket'

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showLoginPage: true
        };
        socket.on('user info', info => {
            user.name = info.name;
            user.username = info.username;
            user.score = info.score;
            user.loggedIn = true;
            this.setState({ showLoginPage: false })
        })
    }

    render () {
        return (
            <div className="app">
                <Login show={this.state.showLoginPage} />
                <Header />
                <Main />
            </div>
        )
    }
}

export default App