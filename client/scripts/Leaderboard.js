import React from 'react'

class Leaderboard extends React.Component {

    constructor (props) {
        super(props);
        this.teams = [
            { username: 'folan', name: 'Klug Team', point: 552 },
            { username: 'bisar', name: 'Pug Team', point: 1000 },
            { username: 'bhamn', name: 'Ngino Team', point: 800 },
        ]
    }

    get teamsList () {
        this.teams.sort((team1, team2) => team2.point - team1.point);
        const items = [];
        for (let team of this.teams) {
            items.push(<li key={team.username}>{team.name}</li>);
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