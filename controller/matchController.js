const Match = require('../models/match');

exports.createMatch = function (req, res, next) {
  const name = req.body.name;

  if (!name) {
    return res.status(422).send({error: 'You must provide match name and time'});
  }

  Match.findOne({name : name}, function (err, existingMatch){
    if (err) {
      return next(err);
    }

    if(existingMatch) {
      return res.status(422).send({error:'match was created'});
    }

    const match = new Match({
      name : name
    });

    match.save(function(err) {
      if(err) {
        return next(err);
      }

      res.json({name : name});
    });
  });
}
