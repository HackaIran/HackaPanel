import React from 'react'
import Header from './Header'
import Main from './Main'

import socket from '../model/socket'

class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="app">
                <Header />
                <Main />
            </div>
        )
    }
}

export default App