class Output {
    constructor (app) {
        this.app = app
        this.loader = $('body > main > section > #output > .cssload-container')
        this.inputBox = $('body > main > section > #output > div.input > pre')
        this.outputBox = $('body > main > section > #output > div.output > pre')
        this.disableLoading()
    }
    putResponse (data) {
        this.disableLoading()
        this.clear()
        if (data.hasError || data.hasCodeError) {
            this.changeOutputBox(data.err, true)
        }
        else {
            this.changeOutputBox(data.stdout)
        }
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