import React from 'react'

class HighScoreBox extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            score: 0
        }
    }

    render() {
        return (
            <dialog>
                <img src="./assets/images/check.svg" alt="Highscore" width="100px" />
                <h2>Congrats! New Highscore</h2>
                <span>{ this.state.score }</span>
            </dialog>
        )
    }
}

export default HighScoreBox