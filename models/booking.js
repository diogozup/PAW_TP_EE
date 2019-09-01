let mongoose = require('mongoose');


// Booking Schema
let bookingSchema = mongoose.Schema({
    
    title:{ type: String, required:true },
    author:{ type: String }, 
    authorArticle:{ type: String }, 
    checkIn:{ type: Date, required:true },
    checkOut:{type: Date, required:true },

    createdAt: {type: Date, default: Date.now },

    features:{ type: String },

    premiumFeature1:{ type: String },
    premiumFeature2:{ type: String },
    premiumFeature3:{ type: String },
    premiumFeature4:{ type: String },
    premiumFeature5:{ type: String },
    premiumFeature6:{ type: String },

    featuresTotalPrice:         { type: Number , default : 0 },
    premiumFeaturesTotalPrice:  { type: Number , default : 0 },
    finalTotalPrice:            { type: Number , default : 0 },
    

    status:{ type: String, default: 1 },

    bookingImage:{ type: String }

});

let Booking = module.exports = mongoose.model('Booking', bookingSchema);