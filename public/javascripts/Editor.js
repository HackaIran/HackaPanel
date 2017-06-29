class Editor {
    constructor (id) {
        ace.require("ace/ext/language_tools");
        this.editor = ace.edit(id);
        this.session = this.editor.getSession()
        this.session.setTabSize(4);
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
        this.setTheme("clouds")
        this.setLang("javascript")
        this.remember()
        this.session.on("change", this.onChange.bind(this))
    }
    remember () {
        if (window.localStorage['code'] !== undefined) this.value = window.localStorage['code']
    }
    setTheme (theme) {
        this.editor.setTheme("ace/theme/" + theme);
    }
    setLang (lang) {
        this.editor.getSession().setMode("ace/mode/" + lang);
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

module.exports = Editor