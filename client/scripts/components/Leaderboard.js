import React from 'react'

import Team from './Team'

class Leaderboard extends React.Component {

    constructor (props) {
        super(props);
        this.teams = [
            { username: 'folan', name: 'Klug Team', score: 12000 },
            { username: 'bisar', name: 'Pug Team', score: 1000 },
            { username: 'bhamn', name: 'Ngino Team', score: 800 },
        ]
    }

    get teamsList () {
        this.teams.sort((team1, team2) => team2.score - team1.score);
        const items = [];
        const topScore = this.teams[0].score;
        for (let i = 0; i < this.teams.length; i++) {
            const team = this.teams[i];
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