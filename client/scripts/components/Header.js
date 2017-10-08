import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="team">
                    <h3 className="name"></h3>
                    <span>score: <span className="score"></span></span>
                </div>
                <time></time>
            </header>
        )
    }
}

export default Header