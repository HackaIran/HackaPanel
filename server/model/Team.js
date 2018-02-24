const db = require('./db');

const teamSchema = db.Schema({
    username: String,
    password: String,
    name: String,
    score: Number,
    socketId: String
});

const Team = db.model('Team', teamSchema);

module.exports = Team;