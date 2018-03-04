const passport= require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config');

// setup ontions for JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey : config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

const LocalStrategy = require('passport-local');
const localOptions = {usernameField : 'email'};
const logcalLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify, find the user
  User.findOne({email : email}, function(err, user){
    if (err) return done(err);
    if(!user) {
      return done(null, false);
    }

    // comparision the pw
    user.comparePassword(password, function(err, isMatch) {
      if(err) {return done(err);}
      if(!isMatch) {
        return done(null, false);
      }
        // yes
      return done(null, user);
    });
  });
});

//tell passport to use that Strategy
passport.use(jwtLogin);
passport.use(logcalLogin);
