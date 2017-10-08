import React from 'react'
import socket from '../model/socket'

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.interval = null;
        this.state = {
            name: '[loading]',
            score: '[loading]',
            time: '[loading]',
        };
        socket.on('time sync', this.onTimeSync.bind(this));
        socket.on('user name', name => this.setState({ name: name }));
        socket.on('user score', score => this.setState({ score: score }));
    }
    onTimeSync (data) {
        this.setState({ time: data.toEnd });
        clearInterval(this.interval);
        this.interval = setInterval(() => this.setState({ time: this.state.time - 1 }), 1000)
    }
    get time () {

        if (typeof this.state.time === 'string') return this.state.time;

        const hours = String(Math.floor(this.state.time / 3600)).padStart(2, 0);
        const minutes = String(Math.floor((this.state.time % 3600) / 60)).padStart(2, 0);
        const seconds = String(Math.floor(this.state.time % 60)).padStart(2, 0);

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