const passport = require('passport');
const LocalStrategy = require('passport-local');

const Frenchise  = require("../models").Frenchise;

passport.use(new LocalStrategy({
  usernameField: 'Mobilenumber',
  passwordField: 'Password',
}, (Mobilenumber, Password, done) => {
  Frenchise.findOne({ where:{ Mobilenumber:Mobilenumber }})
    .then((user) => {
      if(!user || !Frenchise.validatePassword(Password,user.Salt,user.Hash)) {  
        return done(null, false, { errors: { 'Mobile Number or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));