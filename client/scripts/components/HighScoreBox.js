import React from 'react'

import userStore from '../stores/user'

class HighScoreBox extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            score: userStore.getState().score
        };
        this.app = this.props.app;
        setTimeout(() => {
            this.setState({ score: userStore.getState().score });
            userStore.subscribe(() => {
                const score = userStore.getState().score;
                if (this.state.score < score) {
                    this.setState({ score });
                    this.appear()
                }
            })
        }, 2500)
    }

    appear (time = 2000) {
        this.app.setState({ highScoreMode: true });
        setTimeout(this.disappear.bind(this), time)
    }

    disappear () {
        this.app.setState({ highScoreMode: false })
    }

    render() {
        return (
            <dialog onClick={this.disappear.bind(this)}>
                <img src="./assets/images/check.svg" alt="Highscore" width="100px" />
                <h2>Congrats! New Highscore</h2>
                <span>{ this.state.score }</span>
            </dialog>
        )
    }
}

export default HighScoreBox