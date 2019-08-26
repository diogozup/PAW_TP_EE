const express = require('express');
const router = express.Router();


// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
// Booking Model
let Booking = require ('../models/booking');



// GET add booking references articles
router.get('/add/:id', ensureAuthenticated , function(req, res){

    Article.findById(req.params.id, function(err, article){    
        res.render('add_booking', {
            title:'Add Booking',
            article:article
        });
    });

  });


// POST add booking references articles
router.post('/add/:id', function(req, res){

    // Get Errors
    let errors = req.validationErrors();
  
    if(errors){
      res.render('add_booking', {
        title:'Add Booking',
        errors:errors
      });
    } else {
      let booking = new Booking();
        booking.title = req.body.title  

        booking.author = req.user._id;
        booking.authorArticle = req.params.id;

        booking.checkIn = req.body.checkIn
        booking.checkOut = req.body.checkOut

        booking.feature1 = req.body.feature1
        booking.feature2 = req.body.feature2
        booking.feature3 = req.body.feature3
        booking.feature4 = req.body.feature4

        booking.premiumFeature1 = req.body.premiumFeature1
        booking.premiumFeature2 = req.body.premiumFeature2
        booking.premiumFeature3 = req.body.premiumFeature3
        booking.premiumFeature4 = req.body.premiumFeature4
        booking.premiumFeature5 = req.body.premiumFeature5
        booking.premiumFeature6 = req.body.premiumFeature6 

        booking.status = req.body.status

      booking.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success','Booking Added');
          res.redirect('/');
        }
      });
    }
  });


// Get ALL Bookings 
router.get('/show/allBookings', function(req, res){
    Booking.find({}, function(err, bookings){
      if(err){
        console.log(err);
      } else {
        res.render('allBookings', {
          title:'AllBookings',
          bookings: bookings
        });
      }
    });
  });


// GET booking by id
router.get('/show/:id' , function(req, res){

    Booking.findById(req.params.id, function(err, booking){    
        res.render('booking', {
            title:'Booking',
            booking:booking
        });
    });

  });


// Get ALL Bookings  TRANFOR INTO // show all bookings of a user
router.get('/show/allBookings', function(req, res){
    Booking.find({}, function(err, bookings){
      if(err){
        console.log(err);
      } else {
        res.render('allBookings', {
          title:'AllBookings',
          bookings: bookings
        });
      }
    });
  });















// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }
  




module.exports = router;