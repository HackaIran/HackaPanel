import socket from '../model/socket'

import { createStore } from 'redux'

function reducer(state = { username: '-', score: 0, name: '-' }, action) {
    switch (action.type) {
        case 'change':
            return Object.assign({}, state, action.team);
        default:
            return state;
    }
}

const userStore = createStore(reducer);

socket.on('get teams score', teams => {
    const username = localStorage['hacka-username'];
    for (let team of teams) if (username === team.username) userStore.dispatch({ type: 'change', team });
});

socket.on('team score update', team => {
    const username = localStorage['hacka-username'];
    if (username === team.username) userStore.dispatch({ type: 'change', team });
});

socket.on('user info', team => {
    userStore.dispatch({ type: 'change', team });
});

export default userStore