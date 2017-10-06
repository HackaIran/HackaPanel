const Editor = require("./Editor");
const Output = require("./Output");
const Leaderboard = require("./Leaderboard");
const UI = require("./UI");
const Socket = require("./Socket");
const Mousetrap = require('mousetrap');

class App {
    constructor (auth, username) {
        this.winner = '';
        this.auth = auth;
        this.username = username;
        this.mode = 'coding';
        this.canSubmit = false;
        this.winnerShowed = false;
        this.winningSong = $('audio.winning-song');
        this.connection = {};
        this.ui = new UI(this);
        this.editor = new Editor(this, "editor");
        this.output = new Output(this);
        this.leaderboard = new Leaderboard(this, ".ranks");
        this.socket = new Socket(this, '/');
        this.initShortcuts()
    }
    initShortcuts () {
        Mousetrap.bind("alt alt alt alt alt alt", () => { this.auth.logout() })
    }
    enterNitroMode () {
        this.mode = 'nitro';
        this.leaderboard.disable()
    }
    exitNitroMode () {
        this.mode = 'coding';
        this.leaderboard.enable()
    }
    enterTimesUpMode () {
        $('body > .final-box').classList.add("show");
        this.mode = 'timesup'
    }
    countDown (seconds) {
        this.ui.writeInFinalBox(15 + seconds)
    }
    showWinner () {
        if (this.winner !== '' && !this.winnerShowed) {
            if (this.winner === this.username) {
                this.ui.writeInFinalBox("YOU ARE THE WINNER!", true, true);
                this.winnerShowed = true
            } else {
                const winnerName = this.leaderboard.getTeamByUsername(this.winner).name;
                if (winnerName !== undefined) {
                    this.ui.writeInFinalBox(`"${winnerName}" has won the game!`, true, false);
                    this.winnerShowed = true
                } else {
                    this.winnerShowed = false
                }
            }
        }
    }
    playWinningSong () {
        if (this.winner !== this.username) {
            this.winningSong.volume = 0;
            setTimeout(() => { this.winningSong.volume = 1 }, 7000);
        }
        this.winningSong.play()
    }
}

module.exports = App;