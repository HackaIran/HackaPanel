const availableMoves = ['right', 'left', 'up', 'down', 'silent']

class Solver {
    constructor (data) {
        this.data = data
        this.character = {x: 0, y: 0}
        this.solve()
    }

    // Collecting Data
    getInput () {
        return this.data.input.split('\n').slice(1)
    }
    getMoves () {
        return this.data.stdout.split('\n').filter(move => availableMoves.includes(move.toLowerCase())).map(move => move.toLowerCase())
    }

    // Logic
    solve () {
        this.grid = this.getInput()
        this.moves = this.getMoves()
        for (let move of this.moves) this.checkEachMove(move)
    }
    checkEachMove (move) {
        console.log(this.grid, move)
    }
}

module.exports = Solver