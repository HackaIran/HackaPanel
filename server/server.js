const time = require('./model/time');
const Team = require('./model/Team');

const Compiler = require('./Compiler');

let allAvailableConnections = [];

class Server {

    constructor () {
        this.compiler = new Compiler(this);
        this._io = null;
    }

    set io (io) {
        this._io = io;
        this.init();
    }

    get io () {
        return this._io;
    }

    init () {
        const io = this.io;
        io.on('connection', onUserConnected);
        setInterval(() => { io.emit('time sync', time) }, 60 * 1000);
        setInterval(() => this.checkConnections(), 15 * 1000);
        this.checkConnections()
    }

    checkConnections () {
        this.io.emit('are you connected');
        allAvailableConnections = [];
    }

    updateTeamScore (teamUserName, score) {
        Team.findOne({ username: teamUserName, score: { $lt: score } }, (err, team) => {
            if (err) return console.error(`Could not update ${teamUserName}'s score to ${score}`);
            if (!team) return;
            team.score = score;
            team.save();
            this.io.emit('team score update', { username: teamUserName,  score: score });
        });
    }

    static resetAllConnections () {
        Team.update({}, { socketId: '' }, { multi: true }, function () {})
    }

    login (form, socket) {

        if (!!this.io) Team.findOne({ username: form.username, password: form.password }, (err, team) => {

            // Send error message if user doesn't exist
            if (!team) return socket.emit('user login error', 'Ops! re-check your username or password;)');

            // Check if last saved socket id is still alive
            if (!!team.socketId && allAvailableConnections.includes(team.socketId)) {
                return socket.emit('user login error', 'You are logged in another device! check it again');
            }

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

    sendAllTeamsInfoTo (socket) {
        Team.find({}, function (err, teams) {
            const data = teams.map(team => {
                return {
                    username: team.username,
                    name: team.name,
                    score: team.score
                }
            });
            socket.emit('get teams score', data)
        })
    }

    runCodeFor (socket, codeData) {
        Team.findOne({ username: codeData.username, password: codeData.password }, (err, team) => {

            if (err) return console.error(err);

            if (!team) return socket.emit('user login error', 'login first then run your code');

            this.compiler.submit(socket, codeData)
        });
    }
}

const onUserConnected = socket => {
    server.sendAllTeamsInfoTo(socket);
    socket.emit('time sync', time);
    socket.on('user login', form => server.login(form, socket));
    socket.on('user logout', () => server.logout(socket));
    socket.on('disconnect', () => server.logout(socket));
    socket.on('i am connected', () => allAvailableConnections.push(socket.id));
    socket.on('user run code', codeData => server.runCodeFor(socket, codeData));
};

Server.resetAllConnections();

const server = new Server;

module.exports = server;