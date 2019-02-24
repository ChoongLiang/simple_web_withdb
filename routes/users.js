var express = require('express');
var router = express.Router();

var user = require('../models/users');

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

  var newUser = new user({
    username: id,
    name: name,
    email: email,
    password: password
  });

  user.createUser(newUser,function(err,user){
    if(err) throw err;
    console.log(user);
  });

  req.flash('success_msg','Register successfully.');

  res.redirect('/users/login');
});

module.exports = router;
