import { createStore } from 'redux'

if (!window.localStorage['hacka-editor-language']) {
    window.localStorage['hacka-editor-language'] = 'javascript'
}

const initalLanguage = window.localStorage['hacka-editor-language'];

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