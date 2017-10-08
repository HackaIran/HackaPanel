const time = require('./time');

let io = null;

class Server {
    set io (to) {
        io = to;
        this.init();
    }
    init () {
        io.on('connection', onUserConnected);
        setInterval(() => { io.emit('time sync', time) }, 60000)
    }
    get (url) {

    }
}

const onUserConnected = socket => {
    socket.emit('time sync', time);
    socket.emit('user username', 'alireza29675');
    socket.emit('user name', 'Alireza');
    socket.emit('user score', 50);
    setInterval(() => socket.emit('time sync', time), 5 * 1000)
};

const server = new Server;

module.exports = server;