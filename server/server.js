const time = require('./time');

let io = null;

const onUserConnected = socket => {
    socket.emit("initial-config", {
        time: time
    });
};

class Server {
    set io (to) {
        io = to;
        this.init();
    }
    init () {
        io.on('connection', onUserConnected);
    }
    get (url) {

    }
}

const server = new Server;

module.exports = server;