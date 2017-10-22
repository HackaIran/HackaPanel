import React from 'react'

import languageStore from '../stores/language'

class LanguageSelect extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selected: languageStore.getState().language,
            open: false,
            languages: {
                javascript: 'Javascript',
                python: 'Python3',
                csharp: 'C#',
                golang: 'Go',
                java: 'Java'
            }
        }
    }

    select (language) {
        this.setState({ selected: language, open: false });
        languageStore.dispatch({ type: 'change', language: language })
    }

    generateListItem (language, label) {
        return (<li key={language} onClick={() => this.select(language)}>
            <img src={`/assets/images/languages/${language}.png`} />
            <span>{label}</span>
        </li>)
    }

    get langList () {
        const items = [];
        for (let language in this.state.languages) {
            items.push(this.generateListItem(language, this.state.languages[language]))
        }
        return items;
    }

    render() {
        return (
            <div className="language-select">
                <ul className={`lang-drop-down ${this.state.open ? 'open' : ''}`}>{this.langList}</ul>
                <div onClick={() => this.setState({ open: !this.state.open })}>
                    <img src={`/assets/images/languages/${this.state.selected}.png`} />
                    <span>{this.state.languages[this.state.selected]}</span>
                </div>
            </div>
        )
    }
}

export default LanguageSelect