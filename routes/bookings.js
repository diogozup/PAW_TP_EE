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
      Article.find({}, function(err, articles){  
        Booking.findById(req.params.id, function(err, booking){    
            res.render('booking', {
                title:'Booking',
                booking:booking,
                articles:articles
            });
        });
     });
  });








// Get all my bookings
router.get('/myBookings',ensureAuthenticated, function(req, res){
    Booking.find({}, function(err, bookings){
      if(err){
        console.log(err);
      } else {
        res.render('myBookings', {
          title:'MyBookings',
          bookings: bookings
        });
      }
    });
  });



//  List MyAccomodations Booking Requests
router.get('/show/myAccomodations/BookingRequests', ensureAuthenticated, function(req, res){
    Article.find({}, function(err, articles){
        Booking.find({}, function(err, bookings){
        if(err){
            console.log(err);
        } else {
            res.render('myAccomodationsBookingRequests', {
            title:'All Booking from my Accomodations',
            bookings: bookings,
            articles: articles
            });
        }
        });
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
  




router.post('/update/status/:id', ensureAuthenticated, function(req,res,next){
   
    let booking = {};
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

    booking.status = null
    booking.status = req.body.status



    var query = {_id:req.params.id}
    
    Booking.updateOne(query, booking, function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success', 'Booking Status Updated');
          res.redirect('/');
        }
      });

});


// Load Edit Form
router.get('/update/status/:id', ensureAuthenticated, function(req, res){
    // console.log ('This is params:');
    // console.log (req.params);
    // console.log ('This is body:');
    // console.log (req.body);
    
    Booking.findById(req.params.id, function(err, booking){
      if(booking.author != req.user._id){
        req.flash('danger', 'Not Authorized');
        res.redirect('/');
      }
      res.render('statusUpdate', {
        title:'Update Booking Status',
        booking:booking
      });
    });
   });








module.exports = router;