var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var Business = require('../models/contact');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

//Get about page
router.get('/about', function(req,res,next) {
    var ranNum = Math.random();
    res.render('about',{title : 'About Me',
        displayName: req.user ? req.user.displayName : ''});
});

//Get business page
router.get('/contact', function(req,res,next) {
    var ranNum = Math.random();
    res.render('contact',{title : 'Business Contact',
        displayName: req.user ? req.user.displayName : ''});
});

//Get sevice page
router.get('/portfolio', function(req,res,next) {
    var ranNum = Math.random();
    res.render('portfolio',{title : 'Portfolio',
        displayName: req.user ? req.user.displayName : ''});
});

//Get contact page
router.get('/contactme', function(req,res,next) {
    var ranNum = Math.random();
    res.render('contactme',{title : 'Get in Touch!!!',
        displayName: req.user ? req.user.displayName : ''});
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
