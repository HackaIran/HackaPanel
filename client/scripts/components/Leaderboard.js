import React from 'react'
import socket from '../model/socket'
import statusStore from '../stores/status'

import Team from './Team'

const isLeaderboardDisabled = (status) => {
    return status === 'invisible' || status.startsWith('countdown')
};

class Leaderboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            disabled: isLeaderboardDisabled(statusStore.getState().status),
            teams: []
        };

        statusStore.subscribe(() => this.setState({ disabled: isLeaderboardDisabled(statusStore.getState().status) }));

        // if server sent us all teams scores
        socket.on('get teams score', teams => this.setState({ teams }));

        // on one team's score got updated
        socket.on('team score update', info => {
            const teams = this.state.teams;
            for (let team of teams) if (team.username === info.username) team.score = info.score;
            this.setState({ teams })
        })
    }

    get teamsList () {
        const teams = this.state.teams;
        const sortedTeams = ([].concat(teams)).sort((team1, team2) => team2.score - team1.score);
        const items = [];
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            items.push(
                <Team key={team.username}
                      rank={sortedTeams.indexOf(team)}
                      username={team.username}
                      name={team.name}
                      score={team.score}
                      highScore={sortedTeams[0].score} />
            );
        }
        return items;
    }

    render() {
        return (
            <aside className={this.state.disabled ? 'disable' : ''}>
                <header>LeaderBoard</header>
                <ol className="ranks">{this.teamsList}</ol>
            </aside>
        )
    }
}

export default Leaderboard