import React from 'react'
import socket from '../model/socket'

import userStore from '../stores/user'

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.interval = null;
        this.state = {
            name: userStore.getState().name,
            score: userStore.getState().score,
            toEnd: '-',
            toStart: '-',
        };
        socket.on('time sync', this.onTimeSync.bind(this));
        userStore.subscribe(() => {
            const user = userStore.getState();
            this.setState({ name: user.name, score: user.score })
        })
    }
    onTimeSync (data) {
        this.setState({ toEnd: data.toEnd, toStart: data.toStart });
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.setState({
                toEnd: this.state.toEnd - 1,
                toStart: this.state.toStart - 1
            })
        }, 1000)
    }
    get time () {
        // If toEnd was String
        if (typeof this.state.toEnd === 'string') return this.state.toEnd;

        // If toStart was String
        if (typeof this.state.toStart === 'string') return this.state.toStart;

        // Before contest
        if (this.state.toStart > 0) {
            const toStart = this.state.toStart;
            if (toStart > 3600) return `About ${Math.floor(toStart / 3600)} hours later`;
            if (toStart > 60) return `Opening in ${Math.floor(toStart / 60)} minutes later`;
            return `Opening in ${toStart} seconds later`;
        }

        // After contest
        if (this.state.toEnd < 0) {
            return `Time is over!`
        }

        // In contest
        const hours = String(Math.floor(this.state.toEnd / 3600)).padStart(2, 0);
        const minutes = String(Math.floor((this.state.toEnd % 3600) / 60)).padStart(2, 0);
        const seconds = String(Math.floor(this.state.toEnd % 60)).padStart(2, 0);

        return `${hours}:${minutes}:${seconds}`
    }
    render() {
        return (
            <header>
                <div className="team">
                    <h3 className="name">{this.state.name}</h3>
                    <span>score: <span className="score">{this.state.score}</span></span>
                </div>
                <time>{this.time}</time>
            </header>
        )
    }
}

export default Header