const Editor = require("./Editor")
const Leaderboard = require("./Leaderboard")

class App {
    constructor () {
        this.editor = new Editor("editor")
        this.leaderboard = new Leaderboard(".ranks")
    }
    initEditor () {
        
    }
}

window.app = new App()