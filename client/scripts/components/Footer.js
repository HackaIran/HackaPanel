import React from 'react'
import socket from '../model/socket'

class Footer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            online: false,
            language: window.localStorage['hacka-editor-language'] || 'javascript'
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
                <select className="language-choose" onChange={this.onChooseLanguage.bind(this)} value={this.state.language}>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                </select>
            </footer>
        )
    }
}

export default Footer