import React from 'react'
import statusStore from "../stores/status";

class FinalBox extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            show: false,
            appear: false,
            message: '',
            winnerMode: false
        };
        statusStore.subscribe(() => {
            const status = statusStore.getState().status;
            this.showMessage();
            this.setState({ show: status === 'winner' || status.startsWith('countdown') });
            if (status.startsWith('countdown')) this.setState({ message: status.split(' ')[1] });
        });
    }

    showMessage () {
        this.setState({ appear: false });
        setTimeout(() => {
            this.setState({ appear: true });
        }, 50)
    }

    render () {
        const boxClass = "final-box" + (this.state.show ? ' show' : '') + (this.state.winnerMode ? ' winner-mode' : '');
        return (
            <div className={boxClass}>
                <h1 className={this.state.appear ? 'show ' : ''}>{this.state.message}</h1>
            </div>
        )
    }
}

export default FinalBox