const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacka');

const teamSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    score: Number
});

teamSchema.methods.introduce = function () {
    console.log(`Hey! we're ${this.name}, with score ${this.score}! this is our user/pass: ${this.username}/${this.password}`)
};

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;