class Team {
    constructor (leaderboard, id, username, name, score) {
        this.leaderboard = leaderboard
        this.id = id
        this._rank = 1
        this._place = 0
        this.isMe = false
        this.name = name
        this.username = username
        this._score = score
        this.element = this.defineElement()
        this.scoreElement = this.element.querySelector(".score")
        this.progressElement = this.element.querySelector(".progress")
    }
    defineElement () {
        const li = document.createElement("li")
        li.innerHTML = `<span class="name">${this.name}</span>
                        <span class="score">${this.score}</span>
                        <div class="progress"></div>
                        <div class="behind-progress"></div>`
        if (this.username === this.leaderboard.app.username) {
            li.classList.add('me')
            this.isMe = true
        }
        return li;
    }
    get score () {
        return this._score
    }
    set score (score) {
        this._score = score
        this.scoreElement.innerHTML = score
        if (this.isMe) $('header .team .score').innerHTML = score
        this.leaderboard.updateTeams()
    }
    get place () {
        return this._place
    }
    set place (place) {
        this._place = place
        this.element.style.top = (this.element.offsetHeight + 5) * this.place + "px"
    }
    get rank () {
        return this._rank
    }
    set rank (rank) {
        this._rank = rank
        // this.rankElement.innerHTML = rank
    }
    set progress (rate) {
        this.progressElement.style.width = (rate * 100) + "%"
    }
}

module.exports = Team