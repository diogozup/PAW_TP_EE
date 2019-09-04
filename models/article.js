let mongoose = require('mongoose');


// Article Schema
let articleSchema = mongoose.Schema ({


  title:{ type: String, required: true },
  author:{ type: String, required: true },
  body:{ type: String, required: true },
  maxCapacity:{ type: Number, required: true },
  regions:{ type: String, required: true },
  articleImage:{ type: String, require: true },

  createdAt:{ type: Date, default: Date.now },
  lastEditedAt:{ type: Date },
 

  


  
//   premiumFeaturePrice1:{ type: Number, default: 0 },
//   premiumFeaturePrice2:{ type: Number, default: 0 },
//   premiumFeaturePrice3:{ type: Number, default: 0 },
//   premiumFeaturePrice4:{ type: Number, default: 0 },
//   premiumFeaturePrice5:{ type: Number, default: 0 },
//   premiumFeaturePrice6:{ type: Number, default: 0 },

  pricePerStay:{type: Number, default: 0 },
  totalEarnedOfBookings:{type: String },
  totalEarnedOfAllTime:{type: Number, default: 0 },  




  features:{ type: String },
  premiumFeatures:{ type: String },


  premiumFeature1:{ type: String },
  premiumFeature2:{ type: String },
  premiumFeature3:{ type: String },
  premiumFeature4:{ type: String },
  premiumFeature5:{ type: String },
  premiumFeature6:{ type: String },

 
  
});

let Article = module.exports = mongoose.model('Article', articleSchema);
