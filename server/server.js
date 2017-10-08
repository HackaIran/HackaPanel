const time = require('./time');

let io = null;

const onUserConnected = socket => {
    socket.emit('time sync', time);
    socket.emit('user name', 'Alireza');
    socket.emit('user score', 50);
    setInterval(() => socket.emit('time sync', time), 60 * 1000)
};

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

const server = new Server;

module.exports = server;