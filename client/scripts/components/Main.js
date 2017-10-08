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
        this.changeTab('output')

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
                    <OutputTab inputsCount={10} hidden={this.state.tab !== 'output'} />
                </section>
            </main>
        )
    }
}

export default Main