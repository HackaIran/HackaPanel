const Tabs = require("./Tabs")

class UI {
    constructor (app) {
        this.app = app
        this.tabs = new Tabs
    }
    setTimer (seconds) {
        let secs = seconds % 60
        let mins = (seconds - secs) / 60
        if (secs < 10) secs = "0" + secs
        $("header > time").innerHTML = mins + ":" + secs
    }
}

module.exports = UI