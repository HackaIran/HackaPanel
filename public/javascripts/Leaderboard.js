const Team = require("./Team")

class Leaderboard {
    constructor (app, query) {
        this.app = app
        this.list = $(query)
        this.teams = []
    }
    addTeam (id, username, name, score) {
        const team = new Team(this, id, username, name, score)
        this.list.appendChild(team.element)
        this.teams.push(team)
        return team.element
    }
    clearAll () {
        for (let team of this.teams) {
            team.element.remove()
            team = null
        }
    }
    getTeamById (id) {
        for (let team of this.teams) if (team.id == id) return team
        return false
    }
    getTeamByUsername (username) {
        for (let team of this.teams) if (team.username == username) return team
        return false
    } 
    getThisTeam () {
        return this.getTeamByUsername(this.app.username)
    }
    initializeTeams (teams) {
        this.clearAll()
        for (let username in teams) {
            const team = teams[username]
            if (username === this.app.username) team.id = this.app.connection.id
            this.addTeam(team.id, username, team.name, team.score)
        }
        this.updateTeams()
    }
    updateTeams () {
        this.app.ui.initProfile(this.getThisTeam())
    }
    disable () {

    }
}

module.exports = Leaderboard