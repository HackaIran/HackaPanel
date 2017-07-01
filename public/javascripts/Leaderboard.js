const Team = require("./Team")

class Leaderboard {
    constructor (query) {
        this.list = $(query)
        this.teams = []
    }
    addTeam (id, name, score) {
        const team = new Team(this, id, name, score)
        this.list.appendChild(team.element)
        this.teams.push(team)
        return team.element
    }
    getTeamById (id) {
        for (let team of this.teams) if (team.id == id) return team
    }
    
}

module.exports = Leaderboard