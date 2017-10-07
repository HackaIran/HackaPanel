import React from 'react'

class ChallengeTab extends React.Component {

    get tabStyle () {
        return { display: this.props.hidden ? 'none' : 'inherit' };
    }

    render() {
        console.log('Challenge', this.props.hidden)
        return (
            <div style={this.tabStyle} className="tab-page" id="challenge">

            </div>
        )
    }
}

export default ChallengeTab