class Output {
    constructor (app) {
        this.app = app
        this.loader = $('body > main > section > #output > .cssload-container')
        this.inputBox = $('body > main > section > #output > section > div.input > pre')
        this.outputBox = $('body > main > section > #output > section > div.output > pre')
        this.selectItems = $$('body > main > section > #output > aside li')
        for (let item of this.selectItems) item.addEventListener('click', e => {
            this.select(parseInt(e.target.innerHTML) - 1)
        })
        this.outputsData = []
        this.disableLoading()
        this.select(0)
    }
    select (i) {
        for (let item of this.selectItems) item.classList.remove('active')
        this.selectItems[i].classList.add('active')
        this.putResponse(this.outputsData[i] || {stdout: '', input: ''})
    }
    put (data) {
        this.outputsData[data.inputId] = data
    }
    putResponse (data) {
        this.disableLoading()
        this.clear()
        if (data.hasError || data.hasCodeError) {
            this.changeOutputBox(data.err, true)
        }
        else {
            let outputBoxMessage = ''
            outputBoxMessage += data.solved ? `<span class='green'>Challenge solved!</span>\n` : `<span class='red'>Challenge not solved!</span>\n`
            if (data.solved) {
                outputBoxMessage += `<span class='green'> => Total Steps to Solve: ${data.steps} (Scores earned: ${data.scores.steps})</span>\n`
                outputBoxMessage += `<span class='green'> => Executing Duration: ${data.duration} (Scores earned: ${data.scores.duration})</span>\n`
                outputBoxMessage += `<span class='green'> => Estimated Total Score: ${data.scores.total}</span>\n`
            }
            outputBoxMessage += `\nYour Output:\n===============================\n`
            outputBoxMessage += data.stdout
            this.changeOutputBox(outputBoxMessage)
        }
        console.log(data)
        this.changeInputBox(data.input)
    }
    clear () {
        this.changeInputBox("")
        this.changeOutputBox("")
    }
    changeInputBox (data) {
        this.inputBox.innerHTML = data
    }
    changeOutputBox (data, isError = false) {
        if (isError) this.outputBox.classList.add('error-mode')
        else { this.outputBox.classList.remove('error-mode') }
        this.outputBox.innerHTML = data
    }
    enableLoading () {
        this.loader.style.display = 'block'
    }
    disableLoading () {
        this.loader.style.display = 'none'
    }

}

module.exports = Output