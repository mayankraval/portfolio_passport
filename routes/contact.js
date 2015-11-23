var express = require('express');
var router = express.Router();
var passport = require('passport');

// add a reference to contact model
var Contact = require('../models/contact');

// GET contact main page
router.get('/', function(req, res, next) {

    // use the contact model to retrieve all contact informations
    Contact.find(function(err, contacts) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //pass the contacts and open index view
            res.render('contacts/index', {
                title: 'contacts',
                contacts: contacts,

                displayName: req.user ? req.user.displayName : ''            });
        }
    });

});

// show the add contact form
router.get('/add', function(req, res, next) {
    res.render('contacts/add', {
        title: 'Add a new Contact',
        displayName: req.user ? req.user.displayName : ''
    });
});

// process the submission of a new contact information
router.post('/add', function(req, res, next) {

    // try to save, and redirect to index if successful
    Contact.create( {
        name: req.body.name,
        value: req.body.value
    }, function(err, Contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

// show the edit contact page
router.get('/:id', function(req, res, next) {
    // create an id variable
    var id = req.params.id;

    // use mongoose and our model to find the right field information
    Contact.findById(id, function(err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit contact view
            res.render('contacts/edit', {
                title: 'Contact Details',
                contact: contact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

// process the edit contact form submission
router.post('/:id', function(req, res, next) {
    var id = req.params.id;

    // create an contact object
    var contact = new Contact( {
        _id: id,
        name: req.body.name,
        value: req.body.value
    });

    // use mongoose to do update contact information
    Contact.update( { _id: id }, contact, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

// run delete on the selected contact information
router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    Contact.remove( { _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

// export this module to publicly available
module.exports = router;