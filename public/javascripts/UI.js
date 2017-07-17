const Tabs = require("./Tabs")

class UI {
    constructor (app) {
        this.app = app
        this.tabs = new Tabs(app)
        this.usernameTxt = $('header .team .name')
        this.scoreTxt = $('header .team .score')
    }
    initProfile (myTeam) {
        this.usernameTxt.innerHTML = myTeam.name
        this.scoreTxt.innerHTML = myTeam.score
    }
    setTimer (seconds) {
        let secs = seconds % 60
        let mins = (seconds - secs) / 60
        if (secs < 10) secs = "0" + secs
        if (seconds > 0) {
            this.app.canSubmit = true
            $("header > time").innerHTML = mins + ":" + secs
        }
        else {
            this.app.canSubmit = false
            this.writeInTimer("Time's up!")
        }
    }
    writeInTimer (text) {
        $("header > time").innerHTML = text
    }
    announceHighScore () {
        document.body.classList.add('highscore-mode')
        setTimeout(() => document.body.classList.remove('highscore-mode'), 2500)
    }
}

module.exports = UI