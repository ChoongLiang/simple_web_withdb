var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/loginapp');

const db = mongoose.connection;

// User Schema
var userSchema = mongoose.Schema({
   username:{
       type:String,
       index:true
   },
    name:{
       type:String
    },
    email:{
       type:String
    },
    password:{
       type:String
    }
});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.createUser = function(newUser, callback){
    // Async
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });

    // Sync
    // var salt = bcrypt.genSaltSync(10);
    // //var hash = bcrypt.hashSync(newUser.password,salt);
    // newUser.password=bcrypt.hashSync(newUser.password,salt);
    // newUser.save(callback);
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username}; // username should match
    User.findOne(query,callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw (err);
        callback(null, isMatch);
    });
};

module.exports.getUserByID = function(id, callback){
    User.findById(id,callback); //mongodb function
};