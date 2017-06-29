const editor = ace.edit("editor");
editor.setTheme("ace/theme/clouds");
editor.getSession().setTabSize(4);
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setUseSoftTabs(true);
editor.setOptions({
    enableBasicAutocompletion: true
});
