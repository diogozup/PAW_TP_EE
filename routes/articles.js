const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');



const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


















// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
// Booking Model
let Booking = require('../models/booking');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){

  res.render('add_article', {
    title:'Add Article'
  });
});

// Add Submit POST Route
router.post('/add', upload.single('articleImage') , function(req, res){

// console.log(req.body);
// console.log(req.file);
// console.log(req);

  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('body','description is required').notEmpty();
  req.checkBody('maxCapacity','Max Occupation Capacity is required').notEmpty();
  req.checkBody('regions','Region is required').notEmpty();
  

//   req.checkBody('checkIn','Check-In is required').notEmpty();
//   req.checkBody('checkOut','Check-Out is required').notEmpty();
//   req.checkBody('articleImage','Image is required').notEmpty();





  

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let article = new Article();
    console.log(req.file);
    // Booking.findById(req.body.bookingId)
    

    article._id = mongoose.Types.ObjectId();
    article.booking = req.body.bookingId;

    article.author = req.user._id;


    article.title = req.body.title;    
    article.body = req.body.body;
    article.maxCapacity = req.body.maxCapacity

    article.regions = req.body.regions

    article.feature1 = req.body.feature1
    article.feature2 = req.body.feature2
    article.feature3 = req.body.feature3
    article.feature4 = req.body.feature4

    article.premiumFeature1 = req.body.premiumFeature1
    article.premiumFeature2 = req.body.premiumFeature2
    article.premiumFeature3 = req.body.premiumFeature3
    article.premiumFeature4 = req.body.premiumFeature4
    article.premiumFeature5 = req.body.premiumFeature5
    article.premiumFeature6 = req.body.premiumFeature6

    article.articleImage =  req.file.path
    

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_article', {
      title:'Edit Article',
      article:article
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.author = req.user._id;
  article.body = req.body.body;
  article.maxCapacity = req.body.maxCapacity

  article.regions = req.body.regions

  article.feature1 = req.body.feature1
  article.feature2 = req.body.feature2
  article.feature3 = req.body.feature3
  article.feature4 = req.body.feature4

  article.premiumFeature1 = req.body.premiumFeature1
  article.premiumFeature2 = req.body.premiumFeature2
  article.premiumFeature3 = req.body.premiumFeature3
  article.premiumFeature4 = req.body.premiumFeature4
  article.premiumFeature5 = req.body.premiumFeature5
  article.premiumFeature6 = req.body.premiumFeature6


  let query = {_id:req.params.id}
  

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render('article', {
        article:article,
        author: user.name
      });
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




// show all Accomodations from an user
router.get('/show/myAccomodations',ensureAuthenticated, function(req, res){
    Article.find({}, function(err, articles){
      if(err){
        console.log(err);
      } else {
        res.render('myAccomodations', {
          title:'Articles',
          articles: articles
        });
      }
    });
  });

// change STATUS of BOOKING of pending to terminated || accepted



module.exports = router;
