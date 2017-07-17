const db = require("./db-handler")

class TeamAuth {
    constructor () {
        this.teams = db.json.teams
    }
    login (username, id) {
        const team = this.teams[username]
        if (team === undefined) return {
            status: 0,
            message: "This username is not exist! Check it again!"
        }
        if (team.connect) return {
            status: 1,
            message: "This team has logged in another system!"
        }
        else return {
            status: 2,
            message: "Logged in successfully!"
        }
    }
    findTeamIndexById (id) {
        for (let i in this.teams) if (this.teams[i].id === id) return i
        return false
    }
    disconnect (id) {
        const teamIndex = this.findTeamIndexById(id)
        if (teamIndex !== false) {
            this.teams[teamIndex].id = undefined
            this.teams[teamIndex].connect = false
        }
        db.save()
    }
}

module.exports = TeamAuth