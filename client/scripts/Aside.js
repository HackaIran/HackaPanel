import React from 'react'

class Aside extends React.Component {
    render() {
        return (
            <aside>
                <header>
                    <img src="./assets/images/leaderboard.png" alt="leaderboard icon" />
                </header>
                <ol className="ranks">

                </ol>
            </aside>
        )
    }
}

export default Aside