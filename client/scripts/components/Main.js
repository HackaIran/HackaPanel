import React from 'react'

import Leaderboard from './Leaderboard'

import ChallengeTab from './ChallengeTab'
import EditorTab from './EditorTab'
import OutputTab from './OutputTab'
import socket from "../model/socket";

class Main extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tab: 'challenge' // || window.localStorage['hacka-tab']
        }
    }

    getTabs (items) {
        const listItems = [];
        for (let item of items) listItems.push(
            <li
                key={item.name}
                className={this.state.tab === item.name ? 'active' : ''}
                onClick={() => this.changeTab(item.name)}>
                {item.label}
            </li>
        )
        return listItems;
    }

    changeTab (to) {
        window.localStorage['hacka-tab'] = to;
        this.setState({ tab: to })
    }

    runCode () {
        this.changeTab('output');

        this.refs.output.startLoading();

        const code = window.localStorage['hacka-editor-code'] || '';
        const language = window.localStorage['hacka-editor-language'] || '';
        const username = window.localStorage['hacka-username'] || '';
        const password = window.localStorage['hacka-password'] || '';

        socket.emit('user run code', {
            username: username,
            password: password,
            type: 'run',
            language: language,
            code: code
        })
    }

    render () {
        return (
            <main>
                <Leaderboard />
                <section>
                    <nav>
                        {this.getTabs([ {name: 'challenge', label: 'Challenge'},  {name: 'editor', label: 'Code'},  {name: 'output', label: 'Output'} ])}
                        <li className="submit" onClick={this.runCode.bind(this)}>Run The Code<em>(F5)</em></li>
                    </nav>
                    <ChallengeTab hidden={this.state.tab !== 'challenge'} />
                    <EditorTab hidden={this.state.tab !== 'editor'} />
                    <OutputTab ref='output' inputsCount={10} hidden={this.state.tab !== 'output'} />
                </section>
            </main>
        )
    }
}

export default Main