const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email : {type: String, unique:true, lowercase: true},
  password : String
});

//on save hook, encrpt the password
userSchema.pre('save', function(next){
  // user model - an instance
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return next(err);
      // overwrite the plain text
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function(candidatePw, callback) {
  bcrypt.compare(candidatePw, this.password, function(err, isMatch) {
    if(err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
