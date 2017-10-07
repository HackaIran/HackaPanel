import React from 'react'

import Leaderboard from './Leaderboard'

import ChallengeTab from './ChallengeTab'
import EditorTab from './EditorTab'
import OutputTab from './OutputTab'

class Main extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tab: window.localStorage['hacka-tab'] || 'challenge'
        }
    }

    changeTab (to) {
        window.localStorage['hacka-tab'] = to;
        this.setState({ tab: to })
    }

    runCode () {

    }

    render () {
        return (
            <main>
                <Leaderboard />
                <section>
                    <nav>
                        <li onClick={() => this.changeTab('challenge')}>Challenge</li>
                        <li onClick={() => this.changeTab('editor')}>Code</li>
                        <li onClick={() => this.changeTab('output')}>Output</li>
                        <li data-page="output" className="submit" onClick={this.runCode.bind(this)}>Run The Code<em>(F5)</em></li>
                    </nav>
                    <ChallengeTab hidden={this.state.tab !== 'challenge'} />
                    <EditorTab hidden={this.state.tab !== 'editor'} />
                    <OutputTab inputsCount={5} hidden={this.state.tab !== 'output'} />
                </section>
            </main>
        )
    }
}

export default Main