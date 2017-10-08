const time = require('./model/time');
const Team = require('./model/Team');

Team.find(function(err, teams){
    console.log(err, teams)
});

class Server {
    set io (io) {
        io.on('connection', onUserConnected);
        setInterval(() => { io.emit('time sync', time) }, 60 * 1000);
    }
    get (url) {

    }
}

const onUserConnected = socket => {
    socket.emit('time sync', time);
    socket.emit('user username', 'alireza29675');
    socket.emit('user name', 'Alireza');
    socket.emit('user score', 50);
};

const server = new Server;

module.exports = server;