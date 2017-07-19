const Tabs = require("./Tabs")

class UI {
    constructor (app) {
        this.app = app
        this.tabs = new Tabs(app)
        this.usernameTxt = $('header .team .name')
        this.scoreTxt = $('header .team .score')
        this.finalBox = $('body > .final-box')
        this.languageChoose = $('body > footer > select.language-choose')
        this.languageChoose.addEventListener('change', this.onLanguageChanged.bind(this))
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
    writeInFinalBox (what, isResult = false, isWinner = false) {
        this.finalBox.querySelector('h1 span').innerHTML = what
        this.finalBox.querySelector('h1').classList.add('show')
        if (!isResult) {
            setTimeout(() => {
                this.finalBox.querySelector('h1').classList.remove('show')
            }, 950)
        } else {
            this.finalBox.classList.add('result')
            if (isWinner) this.finalBox.classList.add('winner')
        }
    }
    onLanguageChanged () {
        console.log(this.languageChoose.value)
        this.app.editor.language = this.languageChoose.value
    }
    writeInTimer (text) {
        $("header > time").innerHTML = text
    }
    announceHighScore () {
        document.body.classList.add('highscore-mode')
        setTimeout(() => document.body.classList.remove('highscore-mode'), 2500)
    }
    turnOnDisableMode () {
        document.body.classList.add('disable-mode')
    }
    turnOffDisableMode () {
        document.body.classList.remove('disable-mode')
    }
}

module.exports = UI