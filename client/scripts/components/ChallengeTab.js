import React from 'react'
import renderHTML from 'react-render-html';

class ChallengeTab extends React.Component {

    constructor (props) {
        super(props);
        const challengeElement = document.querySelector('body > .challenge');
        this.challengeHTML = challengeElement.innerHTML;
        challengeElement.remove()
    }

    get tabStyle () {
        return { display: this.props.hidden ? 'none' : 'inherit' };
    }

    render() {
        return (
            <div style={this.tabStyle} className="tab-page" id="challenge">
                { renderHTML(this.challengeHTML) }
            </div>
        )
    }
}

export default ChallengeTab