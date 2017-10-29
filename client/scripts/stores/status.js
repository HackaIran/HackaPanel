import socket from '../model/socket'

import { createStore } from 'redux'

function counter(state = { status: 'disable' }, action) {
    switch (action.type) {
        case 'change':
            return { status: action.status };
        default:
            return state;
    }
}

const statusStore = createStore(counter);

socket.on('status sync', status => statusStore.dispatch({ type: 'change', status: status }));

export default statusStore