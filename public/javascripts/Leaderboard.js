const Team = require("./Team")

class Leaderboard {
    constructor (app, query) {
        this.app = app
        this.list = $(query)
        this.teams = []
        this.hightscore = 0
    }
    addTeam (id, username, name, score, needsUpdate = true) {
        const team = new Team(this, id, username, name, score)
        this.list.appendChild(team.element)
        this.teams.push(team)
        if (needsUpdate) this.updateTeams()
        return team.element
    }
    clearAll () {
        for (let team of this.teams) {
            team.element.remove()
            team = null
        }
        this.teams = []
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
            this.addTeam(team.id, username, team.name, team.score, false)
        }
        this.app.ui.initProfile(this.getThisTeam())
        this.updateTeams()
    }
    updateTeams () {
        let scores = [], place = 0
        for (let team of this.teams) scores.push(team.score)
        scores = scores.filter((score, i) => scores.indexOf(score) == i).sort((A, B) => {
            if(A < B) return 1;
            if(A > B) return -1;
            return 0;
        })
        for (let team of this.teams) team.rank = scores.indexOf(team.score) + 1
        this.teams.sort((A, B) => {
            if(A.rank < B.rank) return -1;
            if(A.rank > B.rank) return 1;
            return 0;
        })
        this.highscore = this.teams[0].score
        for (let team of this.teams) {
            team.place = place++
            if (this.highscore !== 0) team.progress = team.score / this.highscore
            else team.progress = 0
        }
    }
    disable () {

    }
}

module.exports = Leaderboard