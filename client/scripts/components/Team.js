import React from 'react'

class Team extends React.Component {

    render() {

        const isThisMe = localStorage['hacka-username'] === this.props.username;
        const progressStyle = { width: this.props.score === 0 ? 0 : (this.props.score / this.props.highScore) * 100 + '%' };

        return (
            <li style={{ top: this.props.rank * 60 }} className={isThisMe ? 'me' : ''}>
                <span className="rank">{this.props.rank + 1}</span>
                <span className="name">{this.props.name}</span>
                <span className="score">{this.props.score}</span>
                <div className="behind-progress">
                    <div className="progress" style={progressStyle} />
                </div>
            </li>
        )

    }
}

export default Team