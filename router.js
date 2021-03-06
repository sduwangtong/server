const Authentication = require('./controller/authentication');
const MatchController = require('./controller/matchController');
const passportService = require('./services/passport');
const passport = require('passport');

//create middleware
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({hi: 'there'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/match', MatchController.getMatches);
  app.post('/match', MatchController.createMatch);
  app.post('/updateMatch', MatchController.updateMatch);
}
