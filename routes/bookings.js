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

    console.log("BODY DESTE ADD BOOKING DO FORMULARIO:");
    console.log(req.body);

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

        booking.features = req.body.features
   
        booking.premiumFeature1 = req.body.premiumFeature1
        booking.premiumFeature2 = req.body.premiumFeature2
        booking.premiumFeature3 = req.body.premiumFeature3
        booking.premiumFeature4 = req.body.premiumFeature4
        booking.premiumFeature5 = req.body.premiumFeature5
        booking.premiumFeature6 = req.body.premiumFeature6 

    

        booking.status = req.body.status
        //booking.bookingImage = req.body.bookingImage
        booking.createdAt = req.body.createdAt

        
        //PRICES
        booking.numberOfStayingDays = req.body.totalOfStayDays
        booking.pricePerStay = req.body.pricePerStay

        booking.totalPremiumFeatures = req.body.totalCost
        booking.totalStayingCost =  req.body.totalStayingCost
        booking.totalFinalCost = req.body.totalFinalCost




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







// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }
  


// GET MAKE STATUS UPDATE DECISION em booking by id
router.get('/show/makeDecision/:id' , function(req, res){
    Article.find({}, function(err, articles){  
      Booking.findById(req.params.id, function(err, booking){    
          res.render('booking_status_decision', {
              title:'Booking',
              booking:booking,
              articles:articles
          });
      });
   });
});


// STATUS UPDATE GET aceitar ou decline offer
router.get('/show/makeDecision/statusUpdate/:id', ensureAuthenticated, function(req, res){
    
    Booking.findById(req.params.id, function(err, booking){

      res.render('statusUpdate', {
        title:'Update Booking Status',
        booking:booking
      });
    });
   });



// STATUS UPDATE POST aceitar ou decline offer
router.post('/show/makeDecision/statusUpdate/:id', ensureAuthenticated, function(req,res,next){

    var id = req.params.id;

    Booking.findOne({_id:id}, function(err, foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        } else {
            if(!foundObject){
                res.status(404).send();
            } else {
                if(req.body.status){
                    foundObject.status = req.body.status;
                }
                foundObject.save(function(err, updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    } else {
                        //res.send(updatedObject);
                        req.flash('success','Booking Status Updated');
                         res.redirect('/');
                        //res.redirect('/bookings/show/makeDecision/:id');
                        

                    }
                });

            }
        }

    });




});





//  List MyAccomodations Booking Requests (historic)
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


//  List MyAccomodations Booking Requests (accepted)
router.get('/show/myAccomodations/BookingRequestsAccepted', ensureAuthenticated, function(req, res){
    Article.find({}, function(err, articles){
        // Booking.find({'author':req.params.id}).sort({'_id': -1}).limit(1).exec(function(err, bookings){
        Booking.find({}, function(err, bookings){
        if(err){
            console.log(err);
        } else {
            res.render('myAccomodationsBookingRequestsAccepted', {
            title:'All Accepted Booking from my Accomodations',
            bookings: bookings,
            articles: articles
            });
        }
        });
    });
  });

  //  List MyAccomodations Booking Requests (declined)
router.get('/show/myAccomodations/BookingRequestsPending', ensureAuthenticated, function(req, res){
    Article.find({}, function(err, articles){
        Booking.find({'author':req.params.id}).sort({'_id': -1}).limit(3).exec(function(err, bookings){
        //Booking.find({}, function(err, bookings){
        if(err){
            console.log(err);
        } else {
            res.render('myAccomodationsBookingRequestsPending', {
            title:'All Pending Booking from my Accomodations',
            bookings: bookings,
            articles: articles
            });
        }
        });
    });
  });

    //-------------------------------------------- ESTOU AQUI: DASHBOARD -----------------------------------


    // Get all my bookings
    // router.get('/myDashboard',ensureAuthenticated, function(req, res){
    //     Booking.find({}, function(err, bookings){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.render('myDashboard', {
    //         title:'My Dashboard',
    //         bookings: bookings
    //         });
    //     }
    //     });
    // });
    // ,[],{ sort: { '_id': -1 } }
    router.get('/myDashboard/:id',ensureAuthenticated, function(req, res){
        Booking.find({'author':req.params.id}).sort({'_id': -1}).limit(3).exec(function(err, bookings){
        if(err){
            console.log(err);
        } else {
            console.log("BOOKINGS:");
            console.log(bookings);


            res.render('myDashboard', {
            title:'My Dashboard',
            bookings: bookings
            });
        }
        });
    });

    router.get('/myDashboard-data/:id',ensureAuthenticated, function(req, res){
        Booking.find({'author':req.params.id}).sort({'_id': -1}).limit(3).exec(function(err, bookings){
        if(err){
            console.log(err);
        } else {
            res.send(bookings);
        }
        });
    });




// Load Edit Form booking
router.get('/edit/myBooking/WithBookingID/:idArticle/:idBooking', ensureAuthenticated, function(req, res){
    Article.findById(req.params.idArticle, function(err, article){
        Booking.findById(req.params.idBooking, function(err, booking){
                if(booking.author != req.user._id){
                    req.flash('danger', 'Not Authorized');
                    res.redirect('/');
                }
                res.render('edit_booking', {
                    title:'Edit Booking',
                    booking:booking,
                    article:article

                });
            });    
        });
  });    




















module.exports = router;