import React from 'react'

import Aside from './Aside'

import ChallengeTab from './ChallengeTab'
import EditorTab from './EditorTab'
import OutputTab from './OutputTab'

class Main extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tab: 'challenge'
        }
    }

    changeTab (to) {
        this.setState({ tab: to })
    }

    render () {
        return (
            <main>
                <Aside />
                <section>
                    <nav>
                        <li onClick={() => this.changeTab('challenge')}>Challenge</li>
                        <li onClick={() => this.changeTab('editor')}>Code</li>
                        <li onClick={() => this.changeTab('output')}>Output</li>
                        <li data-page="output" className="submit">Run The Code<em>(F5)</em></li>
                    </nav>
                    <ChallengeTab hidden={this.state.tab !== 'challenge'} />
                    <EditorTab hidden={this.state.tab !== 'editor'} />
                    <OutputTab hidden={this.state.tab !== 'output'} />
                </section>
            </main>
        )
    }
}

export default Main