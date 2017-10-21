import React from 'react'

class LanguageSelect extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selected: 'javascript',
            open: false,
            languages: {
                javascript: 'Javascript',
                python: 'Python3',
                csharp: 'C#',
                cpp: 'C++'
            }
        }
    }

    select (language) {
        this.setState({ selected: language, open: false });
    }

    generateListItem (language, label) {
        return (<li onClick={() => this.select(language)}>
            <img src={`/assets/images/languages/${language}.png`} />
            <span>{label}</span>
        </li>)
    }

    get langList () {
        const items = [];
        for (let language in this.state.languages) {
            items.push(this.generateListItem(language, this.state.langs[language]))
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