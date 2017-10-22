import { createStore } from 'redux'

const initalLanguage = window.localStorage['hacka-editor-language'] || 'javascript';

function counter(state = { language: initalLanguage }, action) {
    switch (action.type) {
        case 'change':
            window.localStorage['hacka-editor-language'] = action.language
            return { language: action.language };
        default:
            return state;
    }
}

const languageStore = createStore(counter);

export default languageStore