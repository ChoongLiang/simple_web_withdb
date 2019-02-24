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
    var salt = bcrypt.genSaltSync(10);
    //var hash = bcrypt.hashSync(newUser.password,salt);
    newUser.password=bcrypt.hashSync(newUser.password,salt);
    newUser.save(callback);
};