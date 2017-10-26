import React from 'react'
import AceEditor from 'react-ace';

import MouseTrap from 'mousetrap'

import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/csharp';
import 'brace/mode/java';
import 'brace/mode/golang';

import 'brace/theme/monokai';
import 'brace/ext/language_tools';

import languageStore from '../stores/language'

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
        return window.localStorage['hacka-editor-code'] || ' ';
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