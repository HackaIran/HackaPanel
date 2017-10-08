const db = require('./db');

const teamSchema = db.Schema({
    username: String,
    password: String,
    name: String,
    score: Number,
    socketId: String
});

teamSchema.methods.introduce = function () {
    console.log(`Hey! we're ${this.name}, with score ${this.score}! this is our user/pass: ${this.username}/${this.password}`)
};

const Team = db.model('Team', teamSchema);

module.exports = Team;