import React from 'react'

class EditorTab extends React.Component {

    get tabStyle () {
        return { display: this.props.hidden ? 'none' : 'inherit' };
    }

    render() {
        return (
            <div style={this.tabStyle} className="tab-page" id="editor">

            </div>
        )
    }
}

export default EditorTab