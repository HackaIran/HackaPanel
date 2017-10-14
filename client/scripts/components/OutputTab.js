import React from 'react'
import renderHTML from 'react-render-html';

import socket from '../model/socket'

class OutputTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            question: 0,
            loading: false,
            QAs: [
                { input: 'A',  output: 'B' },
                { input: 'C',  output: 'D' },
                { input: 'E',  output: 'F' }
            ]
        };
        socket.on('user code result', this.onResult.bind(this));
    }

    onResult (result) {
        const QAs = this.state.QAs;
        const qa = QAs[result.inputId];

        qa.input = result.input;

        if (result.hasErrors) {
            qa.output = `<span class="red">${result.error}</span>`;
        }

        this.setState({ QAs, loading: false });
    }

    changeQuestionTo (i) {
        this.setState({ question: i })
    }

    submitTheCode () {

    }

    startLoading () {
        this.setState({ loading: true })
    }

    get questionItems () {
        const ret = [];
        for (let i = 1; i <= this.props.inputsCount; i++) ret.push(
            <li
                key={i}
                className={this.state.question === (i - 1) ? 'active' : ''}
                onClick={() => this.changeQuestionTo(i - 1)}
            >
                {i}
            </li>
        )
        return ret;
    }

    get tabStyle () {
        return { display: this.props.hidden ? 'none' : 'inherit' };
    }

    get current () {
        const question = this.state.QAs[this.state.question];
        if (question) return question;
        return { input: '', output: '' }
    }

    render() {

        const loader = this.state.loading ? (<div className="cssload-container">
            <div className="cssload-whirlpool" />
            <span>Running The Code...</span>
        </div>) : null;

        return (
            <div style={this.tabStyle} className="tab-page" id="output">
                {loader}
                <aside>{this.questionItems}</aside>
                <section>
                    <div className="input">
                        <h1>Input:</h1>
                        <pre>{ this.current.input }</pre>
                    </div>
                    <div className="output">
                        <h1>Output:</h1>
                        <pre>{ renderHTML(this.current.output) }</pre>
                    </div>
                    <div className="submit-container"><button onClick={this.submitTheCode.bind(this)}>Submit The Code</button></div>
                </section>
            </div>
        )
    }
}

export default OutputTab