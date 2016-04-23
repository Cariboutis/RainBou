
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type:String, index: {unique: true}},
    email: {type:String, index: {unique: true}},
    admin: Boolean,
    createdAt: {type: Date, default: Date.now},
    hashed_password: String
});

userSchema.methods.verifyPassword = function(password) {
  //TODO
};

userSchema.statics.hashPassword = function(password) {
  //TODO
    return password;
};


module.exports = userSchema;

