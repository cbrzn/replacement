let User = require('./user_db');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy(function(username, password, done) {
    User.getUserByUsername(username).then((user)=>{
        if (user.error) {
            return done(null, false, {message: "email not found"});
        }
        User.comparePassword(password, user.password).then((isMatch)=>{
            if (isMatch)
                return done(null, user);
            else
                return done(null, false, { message : 'wrong password'});
        }).catch((err)=>{
            throw err;
        });
    }).catch((err)=>{
      console.log('pepa')
        return done(null, false, {message: "email not found"});
        // throw err;
    });
});
