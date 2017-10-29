import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Login from './Login'

import socket from '../model/socket'
import HighScoreBox from "./HighScoreBox";

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showLoginPage: true
        };
        socket.on('user info', () => {
            this.setState({ showLoginPage: false })
        })
    }

    render () {
        return (
            <div className="app">
                <HighScoreBox />
                <Login show={this.state.showLoginPage} />
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default App