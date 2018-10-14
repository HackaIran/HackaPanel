import React from 'react'
import AceEditor from 'react-ace';

import MouseTrap from 'mousetrap'

import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/csharp';
import 'brace/mode/java';
import 'brace/mode/golang';
import 'brace/mode/c_cpp';

import 'brace/theme/monokai';
import 'brace/ext/language_tools';

import languageStore from '../stores/language'

const defaults = {
    javascript: `// JavaScript: Making the world a better place, just got easier with it\n\nconst lines = INPUT.split("\\n");\nconsole.log(lines[0])\n`,
    python: `# Python: Faster Than Your Imagination!\n\nlines = INPUT.split('\\n')\nprint(lines[0])`,
    csharp: `// C#: Feels Like Home!\n\nstatic public void Main () {\n\n\tstring[] lines = INPUT.Split('\\n');\n\tConsole.WriteLine(lines[0]);\n}\n`,
    golang: `// Go: Absolutely Different From The Others!\n\nfunc main() {\n\tlines := strings.Split(INPUT,"\\n");\n\tfmt.Println(lines[0]);\n}\n`,
    java: `// Java: Old Fashioned But Still Sexy:)\n\npublic static void main(String[] args) {\n\tSystem.out.println(INPUT);\n}\n`,
    c_cpp: `// C/C++: Today's Grandpa, Yesterday's Celebrity!\n\nint main () {\n\tcout << INPUT;\n}`,
    php: `// PHP: As Of 2016, It Comprises More Than 80% Of The Websites On The Internet.\n\n$lines = explode("\\n",$INPUT);\necho $lines[0];\n`
};

class EditorTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            language: languageStore.getState().language,
            theme: 'monokai',
            fontSize: parseInt(window.localStorage['hacka-editor-font-size']) || 20,
        };
        MouseTrap.bind('alt+up', () => this.zoom(1));
        MouseTrap.bind('alt+down', () => this.zoom(-1));
        languageStore.subscribe(() => this.setState({ language: languageStore.getState().language }))
    }

    zoom (to) {
        const min = 10, max = 25;
        const newSize = Math.min(Math.max(this.state.fontSize + to, min), max);
        window.localStorage['hacka-editor-font-size'] = newSize;
        this.setState({ fontSize: newSize })
    }

    get tabStyle () {
        return {
            display: this.props.hidden ? 'none' : 'initial',
            position: 'relative'
        };
    }

    onEditorChange (code) {
        window.localStorage['hacka-editor-code'] = code
    }

    get code () {
        let code = window.localStorage['hacka-editor-code'] || '';
        if (code === '' && defaults[this.state.language]) code = defaults[this.state.language];
        return code;
    }

    render() {
        return (
            <div style={this.tabStyle} className="tab-page" id="editor">
                <AceEditor
                    mode={this.state.language}
                    theme={this.state.theme}
                    name="editor-ace"
                    width="100%"
                    height="100%"
                    value={this.code}
                    style={{ position: 'absolute' }}
                    onChange={this.onEditorChange}
                    fontSize={this.state.fontSize}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    editorProps={{ $blockScrolling: Infinity }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}/>
            </div>
        )
    }
}

export default EditorTab