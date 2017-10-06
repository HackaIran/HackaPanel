class Editor {
    constructor (app, id) {
        this.app = app;
        ace.require("ace/ext/language_tools");
        this.editor = ace.edit(id);
        this.session = this.editor.getSession();
        this._language = 'javascript';
        this.session.setTabSize(4);
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
        this.setTheme("clouds");
        this.remember();
        this.session.on("change", this.onChange.bind(this))
    }
    remember () {
        if (window.localStorage['code'] !== undefined) this.value = window.localStorage['code'];
        if (window.localStorage['language'] !== undefined) {
            this.language = window.localStorage['language']
        } else this.language = this._language
    }
    setTheme (theme) {
        this.editor.setTheme("ace/theme/" + theme);
    }
    set language (language) {
        this._language = window.localStorage['language'] = language;
        this.editor.getSession().setMode("ace/mode/" + language);
        this.app.ui.languageChoose.value = this._language
    }
    get language () {
        return this._language
    }
    get value () {
        return this.session.getValue()
    }
    set value (val) {
        this.session.setValue(val)
    }
    onChange () {
        window.localStorage['code'] = this.value
    }
}

module.exports = Editor;