import React from 'react'

class Main extends React.Component {
    render () {
        return (
            <main>
                <aside>
                    <header>
                        <img src="./assets/images/leaderboard.png" alt="Leaderboard Icon" />
                    </header>
                    <ol className="ranks"></ol>
                </aside>
                <section>
                    <nav>
                        <li data-page="challenge">Challenge</li>
                        <li data-page="editor">Code</li>
                        <li data-page="output">Output</li>
                        <li data-page="output" className="submit">Run The Code<em>(F5)</em></li>
                    </nav>
                    <div className="tab-page" id="challenge"></div>
                    <div className="tab-page" id="editor"></div>
                    <div className="tab-page" id="output">
                        <div className="cssload-container">
                            <div className="cssload-whirlpool"></div>
                            <span>Running The Code...</span>
                        </div>
                        <aside>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>10</li>
                        </aside>
                        <section>
                            <div className="input">
                                <h1>Input:</h1>
                                <pre></pre>
                            </div>
                            <div className="output">
                                <h1>Output:</h1>
                                <pre></pre>
                            </div>
                            <div className="submit-container"><button>Submit The Code</button></div>
                        </section>
                    </div>
                </section>
            </main>
        )
    }
}

export default Main