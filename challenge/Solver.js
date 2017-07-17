const availableMoves = ['right', 'left', 'up', 'down', 'silent']
const soldiers = ['u', 'd', 'r', 'l']

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length)
}

class Solver {
    constructor (data) {
        this.data = data
        this.character = {x: 0, y: 0}
        this.soldierInDoubt = false
        this.failingReason = ''
        this.currentStep = 0
        this.solved = this.solve()
    }

    // Collecting Data
    getInput () {
        return this.data.input.split('\n').slice(1)
    }
    getMoves () {
        return this.data.stdout.split('\n')
                .map(move => move.split("\r")[0])
                .filter(move => availableMoves.includes(move.toLowerCase()))
                .map(move => move.toLowerCase())
    }
    searchForChar (char) {
        for (let i = 0; i < this.grid.length; i++) 
            if (this.grid[i].indexOf(char) !== -1)
                return { x: this.grid[i].indexOf(char), y: i }
        return null
    }
    getExitPosition () {
        return this.searchForChar('e')
    }
    getCharacterFirstPosition () {
        return this.searchForChar('n')
    }
    getNearestSoldier (position, direction) {
        const moveStep = {x: 0, y: 0}
        const virtualPosition = {x: position.x, y: position.y}
        if (direction === 'up') moveStep.y = -1
        if (direction === 'down') moveStep.y = 1
        if (direction === 'right') moveStep.x = 1
        if (direction === 'left') moveStep.x = -1
        while (true) {
            virtualPosition.x += moveStep.x
            virtualPosition.y += moveStep.y
            // if we are out of grid lets get out of this while
            if (virtualPosition.x < 0 ||
                virtualPosition.x >= this.grid.length ||
                virtualPosition.y < 0 ||
                virtualPosition.y >= this.grid.length) return null
            // check blocks
            const block = this.grid[virtualPosition.y][virtualPosition.x]
            if (soldiers.includes(block)) return block
        }
    }

    // Logic
    solve () {
        this.grid = this.getInput()
        this.moves = this.getMoves()
        this.exit = this.getExitPosition()
        this.character = this.getCharacterFirstPosition()
        for (let move of this.moves) {
            this.currentStep++
            const situation = this.checkMove(move)
            if (situation === 'win') return true
            if (situation === 'fail') {
                this.failingReason += ` [STEP=${this.currentStep}] [X: ${this.character.x}, y: ${this.character.y}]`
                return false
            }
        }
        this.failingReason = `You stopped moving before getting into exit door. [STEP=${this.currentStep}] [X: ${this.character.x}, y: ${this.character.y}]`
        return false
    }
    checkMove (move) {
        const prevCharacterPosition = {x: this.character.x, y: this.character.y}
        this.moveCharacter(move)
        if (move != 'silent' && prevCharacterPosition.x == this.character.x && prevCharacterPosition.y == this.character.y) return 'nothing'
        if (move == 'silent') this.silentThisBlock()
        if (this.hasWon()) return 'win'
        if (this.soldierInDoubt) {
            this.failingReason = `Doubted soldier detected you!`
            return 'fail'
        }
        const blockDanger = this.isBlockDangerous(this.character)
        if (blockDanger.inDanger) {
            this.failingReason = `You have detected from this direction: "${blockDanger.from}"!`
            return 'fail'
        }
        return 'nothing'
    }
    silentThisBlock () {
        this.grid[this.character.y] = this.grid[this.character.y].replaceAt(this.character.x, '-')
        this.soldierInDoubt = false
    }
    moveCharacter (move) {
        if (move == 'up') this.character.y = Math.max(0, this.character.y - 1)
        if (move == 'down') this.character.y = Math.min(this.grid.length-1, this.character.y + 1)
        if (move == 'left') this.character.x = Math.max(0, this.character.x - 1)
        if (move == 'right') this.character.x = Math.min(this.grid.length-1, this.character.x + 1)
    }
    hasWon () {
        return (this.character.x == this.exit.x) && (this.character.y == this.exit.y)
    }
    isBlockDangerous (position) {
        const block = this.grid[position.y][position.x]
        if (soldiers.includes(block)) {
            this.soldierInDoubt = true
            return { inDanger: false, from: 'self' }
        }
        else {
            if (this.getNearestSoldier(position, 'up') == 'd') return { inDanger: true, from: 'up' }
            if (this.getNearestSoldier(position, 'down') == 'u') return { inDanger: true, from: 'down' }
            if (this.getNearestSoldier(position, 'right') == 'l') return { inDanger: true, from: 'right' }
            if (this.getNearestSoldier(position, 'left') == 'r') return { inDanger: true, from: 'left' }
        }
        return { inDanger: false }
    }
}

module.exports = Solver