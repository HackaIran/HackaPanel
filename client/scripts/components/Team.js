import React from 'react'

class Team extends React.Component {

    render() {
        return (
            <li style={{ top: this.props.rank * 50 }}>
                <span className="name">{this.props.name}</span>
                <span className="score">{this.props.score}</span>
                <div className="progress" style={{ width: (this.props.score / this.props.highScore) * 100 + '%' }} />
                <div className="behind-progress" />
            </li>
        )
    }
}

export default Team