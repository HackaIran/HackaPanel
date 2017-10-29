import { createStore } from 'redux'

if (!window.localStorage['hacka-editor-language']) {
    window.localStorage['hacka-editor-language'] = 'javascript'
}

const initialLanguage = window.localStorage['hacka-editor-language'];

function reducer(state = { language: initialLanguage }, action) {
    switch (action.type) {
        case 'change':
            window.localStorage['hacka-editor-language'] = action.language;
            return { language: action.language };
        default:
            return state;
    }
}

const languageStore = createStore(reducer);

export default languageStore