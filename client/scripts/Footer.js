import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="connection"></div>
                <span>All right reserved by <a href="http://hackaglobal.com/" title="HackaGlobal - The largest global community of developers!" target="_blank">HackaGlobal</a></span>
                <select className="language-choose">
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                </select>
            </footer>
        )
    }
}

export default Footer