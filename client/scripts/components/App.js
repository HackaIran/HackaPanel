import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Login from './Login'

import socket from '../model/socket'
import HighScoreBox from './HighScoreBox'

import userStore from '../stores/user'

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            highScoreMode: false,
            winnerMode: false,
            disableMode: false,
            showLoginPage: true
        };
        socket.on('user info', () => {
            this.setState({ showLoginPage: false })
        });
    }

    render () {
        let appClass = 'app';
        if (this.state.highScoreMode) appClass += ' highscore-mode';
        if (this.state.disableMode) appClass += ' disabled';
        if (this.state.winnerMode) appClass += ' winner';

        return (
            <div className={appClass}>
                <HighScoreBox app={this} />
                <Login show={this.state.showLoginPage} />
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default App