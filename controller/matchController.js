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

exports.getMatches = function(req, res) {
  Match.find({}, function(err, matches) {
    if(err) {
      return next(err);
    }
    res.json(matches);
 });
}
 exports.updateMatch = function(req, res) {
   const matchId = req.body.id;
   const name = req.body.name;

   Match.findByIdAndUpdate(matchId,
    {$push: {playerNames: name}},
    {safe: true, upsert: true},
    function(err, doc) {
        if(err){
          console.log(err);
        }else{
          res.json({success : true});
        }
    });
  }
