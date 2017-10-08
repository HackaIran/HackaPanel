import React from 'react'
import Header from './Header'
import Main from './Main'
import Login from './Login'

class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="app">
                <Login />
                <Header />
                <Main />
            </div>
        )
    }
}

export default App