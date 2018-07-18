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
    javascript: `// JavaScript: Making the world a better place, just got easier with it\n\nconst lines = INPUT.split("\\n");\nconst target = lines.shift();\nconst clientHistory = lines.pop().split(":")[1].split(",");\nconst usersHistory = lines.map(item=>item.split(':')[1].split(","));\n`,
    python: `# Python: Faster Than Your Imagination!\n\nlines = INPUT.split('\\n')\ntarget = lines[0]\nclientHistory = lines[5].split(':')[1].split(',')\nusersHistory = list(map(lambda item:item.split(':')[1].split(','), lines[1:-1]))\n`,
    csharp: `// C#: Feels Like Home!\n\nstatic public void Main () {\n\n\tstring[] lines = INPUT.Split('\\n');\n\tint target = int.Parse(lines[0].Substring(0, 1));\n\tList < string[] > userHistory = new List < string[] > ();\n\tfor (int i = 1; i < lines.Length - 1; i++) userHistory.Add(lines[i].Split(':')[1].Split(','));\n\tvar clientHistory = lines[lines.Length - 1].Split(':')[1].Split(',');\n\tuserHistory = userHistory.Where(m => m != null).ToList();\n\t\n\t// target : 3 -> int\n\t// userHistory : [["A","B","S",...],["X","A","S",...],...] -> List<string>\n\t// clientHistory : ["A","B","V"] -> string[]\n\n}\n`,
    golang: `// Go: Absolutely Different From The Others!\n\nfunc main() {\n\tlines := strings.Split(INPUT,"\\n");\n\ttarget := lines[0];\n\tclientHistory := strings.Split(strings.Split(lines[len(lines)-1], ":")[1], ",")\n\tvar usersHistory[][] string;\n\tfor index, item := range lines[1:len(lines)-2] {\n\t\tfmt.Println(index);\n\t\tusersHistory = append(usersHistory, strings.Split(strings.Split(item, ":")[1], ","))\n\t}\n\n\tfmt.Println(target);\n\tfmt.Println(clientHistory);\n\tfmt.Println(usersHistory);\n}\n`,
    java: `// Java: Old Fashioned But Still Sexy:)\n\npublic static void main(String[] args) {\n\n\tSystem.out.println("Hello Hackers World");\n\n}\n`,
    c_cpp: `// C/C++: Today\`s Grandpa, Yesterday\`s Celebrity!`,
    php: `// PHP: As Of 2016, It Comprises More Than 80% Of The Websites On The Internet.\n\n$lines = explode("\\n",$INPUT);\n$target = intval($lines[0]);\n$usersHistory = [];\nfor($i=1;$i<count($lines)-1;$i++){\n\t$usersHistory[$i-1] = explode(":",$lines[$i])[1];\n\t$usersHistory[$i-1] = explode(",",$usersHistory[$i-1]);\n}\n$clientHistory = explode(":",$lines[$i])[1];\n$clientHistory = explode(",",$clientHistory);`
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