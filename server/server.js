const time = require('./model/time');
const Team = require('./model/Team');

class Server {
    set io (io) {
        io.on('connection', onUserConnected);
        setInterval(() => { io.emit('time sync', time) }, 60 * 1000);
    }
    get (url) {

    }
    login (form, socket) {
        Team.findOne({ username: form.username, password: form.password }, (err, team) => {

            // Send error message if user doesn't exist
            if (!team) return socket.emit('user login error', 'Ops! re-check your username or password;)');

            // if Username and Password was OK
            socket.emit('user info', {
                username: team.username,
                name: team.name,
                score: team.score,
            });

            team.socketId = socket.id;
            team.save();
        })
    }
}

const onUserConnected = socket => {
    socket.emit('time sync', time);
    socket.on('user login', form => server.login(form, socket))
};

const server = new Server;

module.exports = server;