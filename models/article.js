let mongoose = require('mongoose');


// Article Schema
let articleSchema = mongoose.Schema ({


  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  maxCapacity:{
    type: Number,
    required: true
  },
  regions:{
    type: String,
    required: true
  },
  feature1:{
    type: String
  },
  feature2:{
    type: String
  },
  feature3:{
    type: String
  },
  feature4:{
    type: String
  },
  premiumFeature1:{
    type: String
  },
  premiumFeature2:{
    type: String
  },
  premiumFeature3:{
    type: String
  },
  premiumFeature4:{
    type: String
  },
  premiumFeature5:{
    type: String
  },
  premiumFeature6:{
    type: String
  },
  createdAt:{
    type: Date,
  },
  updatedAt:{
    type: Date
  },
  articleImage:{
    type: String,
  }


  
});

let Article = module.exports = mongoose.model('Article', articleSchema);
