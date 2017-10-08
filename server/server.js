const time = require('./model/time');
const Team = require('./model/Team');

class Server {
    set io (io) {
        io.on('connection', onUserConnected);
        setInterval(() => { io.emit('time sync', time) }, 60 * 1000);
    }

    static resetAllConnections () {
        Team.update({}, { socketId: '' }, { multi: true }, function () {})
    }

    get (url) {}

    login (form, socket) {
        Team.findOne({ username: form.username, password: form.password, socketId: '' }, (err, team) => {

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

    logout (socket) {
        Team.findOneAndUpdate({ socketId: socket.id }, { socketId: '' }, function () {})
    }
}

const onUserConnected = socket => {
    socket.emit('time sync', time);
    socket.on('user login', form => server.login(form, socket));
    socket.on('user logout', () => server.logout(socket));
    socket.on('disconnect', () => server.logout(socket));
};

Server.resetAllConnections();
const server = new Server;

module.exports = server;