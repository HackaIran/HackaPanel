import React from 'react'
import socket from '../model/socket'

import Team from './Team'

class Leaderboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            teams: [
                { username: 'klug', name: 'Klug Team', score: 12000 },
                { username: 'pug', name: 'Pug Team', score: 1000 },
                { username: 'bhamn', name: 'Ngino Team', score: 800 },
            ]
        };
        socket.on('team score update', info => {
            console.log(info)
            const teams = this.state.teams;
            for (let team of teams) if (team.username === info.username) team.score = info.score;
            this.setState({ teams })
        })
    }

    get teamsList () {
        const teams = this.state.teams;
        console.log(teams);
        teams.sort((team1, team2) => team2.score - team1.score);
        const items = [];
        const topScore = teams[0].score;
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            items.push(
                <Team key={team.username}
                      rank={i}
                      name={team.name}
                      score={team.score}
                      percent={team.score / topScore * 100} />
            );
        }
        return items;
    }

    render() {
        return (
            <aside>
                <header>
                    <img src="./assets/images/leaderboard.png" alt="leaderboard icon" />
                </header>
                <ol className="ranks">{this.teamsList}</ol>
            </aside>
        )
    }
}

export default Leaderboard