import React from 'react'
import statusStore from "../stores/status";

import socket from '../model/socket'

import { makeRibbons } from '../tools/ribbons'
import renderHTML from 'react-render-html';

class FinalBox extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            show: false,
            appear: false,
            message: '',
            winnerMode: false,
            teams: []
        };

        socket.on('get teams score', teams => {
            const sortedTeams = ([].concat(teams)).sort((team1, team2) => team2.score - team1.score);
            this.setState({ teams: sortedTeams });
            if (this.state.winnerMode) this.setState({ message: `<span>${sortedTeams[0].name}</span> is the winner!` })
        });

        statusStore.subscribe(() => {
            const status = statusStore.getState().status;

            this.showMessage();

            this.setState({ show: (status === 'winner' || status.startsWith('countdown')) });

            // Countdown mode
            if (status.startsWith('countdown')) this.setState({
                message: status.split(' ')[1],
                winnerMode: false
            });

            // Winner mode
            if (status === 'winner') {
                this.setState({
                    message: this.state.teams[0] ? `<span>${this.state.teams[0].name}</span> is the winner!` : '',
                    winnerMode: true
                });
                makeRibbons(document.querySelector('.final-box'))
            }
        });
    }

    showMessage () {
        this.setState({ appear: false });
        setTimeout(() => {
            this.setState({ appear: true });
        }, 50)
    }

    close () {
        this.setState({ show: false })
    }

    render () {
        const boxClass = "final-box" + (this.state.show ? ' show' : '') + (this.state.winnerMode ? ' winner-mode' : '');
        return (
            <div className={boxClass}>
                <i className="close" onClick={this.close.bind(this)}>X</i>
                <h1 className={this.state.appear ? 'show ' : ''}>{renderHTML(this.state.message)}</h1>
            </div>
        )
    }
}

export default FinalBox