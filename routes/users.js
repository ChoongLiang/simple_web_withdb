var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register',
      {title: 'LoginApp'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'LoginApp'});
});

/* Get data. */
router.post('/register', function(req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var email = req.body.emailaddress;
  var password = req.body.password;

  var newUser = new User({
    username: id,
    name: name,
    email: email,
    password: password
  });

  User.createUser(newUser,function(err,user){
    if(err) throw err;
    console.log(user);
  });

  res.redirect('/users/login');
});

/* login via passport js */
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
        if(err) throw(err);
        if(!user){
          return done(null, false);
        }

        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw (err);
          if(isMatch){
            return done(null,user);
          }else{
            return done(null, false);
          }
        });

      });
    }
));

/* Serialize and Deserialize User */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserByID(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/index', failureRedirect:
    '/users/login', failureFlash: true}),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/');
    });

module.exports = router;
