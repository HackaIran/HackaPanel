import React from 'react'

class OutputTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            input: '',
            output: ''
        }
    }

    get questionItems () {
        const ret = [];
        for (let i = 0; i < 10; i++) ret.push(<li key={i}>i</li>)
        return ret;
    }

    get tabStyle () {
        return { display: this.props.hidden ? 'none' : 'inherit' };
    }

    render() {
        return (
            <div style={this.tabStyle} className="tab-page" id="output">
                <div className="cssload-container">
                    <div className="cssload-whirlpool" />
                    <span>Running The Code...</span>
                </div>
                <aside>{this.questionItems}</aside>
                <section>
                    <div className="input">
                        <h1>Input:</h1>
                        <pre>{this.state.input}</pre>
                    </div>
                    <div className="output">
                        <h1>Output:</h1>
                        <pre>{this.state.output}</pre>
                    </div>
                    <div className="submit-container"><button>Submit The Code</button></div>
                </section>
            </div>
        )
    }
}

export default OutputTab