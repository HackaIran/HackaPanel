const Team = require('../server/model/Team');
const config = require('../config/hacka.config');

describe('Team Model', function () {

    it(`can find all teams`, function (done) {
        Team.find({}, function (err) {
            if (err) return done(err);
            return done()
        })
    });

    it(`can create a new team`, function (done) {
        const test = new Team({ username: 'jestuser', password: 'jest', score: 0, name: 'Jest User' });
        test.save(function (err) {
            if (err) return done(err);
            return done();
        });
    });

    it(`can read a specified team`, function (done) {
        Team.findOne({ username: 'jestuser' }, function (err) {
            if (err) return done(err);
            return done();
        })
    });

    it(`can update a specified team`, function (done) {
        Team.updateOne({ username: 'jestuser' }, { name: 'Updated Jest' }, function (err) {
            if (err) return done(err);
            return done();
        })
    });

    it(`can delete a specified team`, function (done) {
        Team.deleteOne({ username: 'jestuser' }, function (err) {
            if (err) return done(err);
            return done();
        })
    });

});