import React from 'react'
import socket from '../model/socket'
import LanguageSelect from "./LanguageSelect";

class Footer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            online: false,
            language: window.localStorage['hacka-editor-language'] || 'javascript',
            languageOptions: [
                { key: 'javascript', text: 'Javascript', value: 'javascript' },
                { key: 'python', text: 'Python', value: 'python' },
            ]
        };
        socket.on('connect', () => this.setState({ online: true }));
        socket.on('disconnect', () => this.setState({ online: false }));
    }

    onChooseLanguage (e) {
        const language = e.target.value;
        window.localStorage['hacka-editor-language'] = language;
        this.setState({ language: language })
    }

    render() {
        return (
            <footer>
                <div className={`connection ${this.state.online ? '' : 'offline'}`} />
                <span>All right reserved by <a href="http://hackaglobal.com/" title="HackaGlobal - The largest global community of developers!" target="_blank">HackaGlobal</a></span>
                <LanguageSelect />
            </footer>
        )
    }
}

export default Footer