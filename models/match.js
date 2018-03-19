const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    name : {type: String, unique:true, lowercase: true},
    players : []
  }
);

// create the model class
const ModelClass = mongoose.model('match', matchSchema);

module.exports = ModelClass;
