import React from 'react'

class Team extends React.Component {

    render() {
        const isThisMe = localStorage['hacka-username'] === this.props.username;
        return (
            <li style={{ top: this.props.rank * 58 }} className={isThisMe ? 'me' : ''}>
                <span className="rank">{this.props.rank}</span>
                <span className="name">{this.props.name}</span>
                <span className="score">{this.props.score}</span>
                <div className="behind-progress">
                    <div className="progress" style={{ width: (this.props.score / this.props.highScore) * 100 + '%' }} />
                </div>
            </li>
        )
    }
}

export default Team