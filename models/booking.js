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

    // PRICES
    numberOfStayingDays:    { type: Number , default : 0 },
    pricePerStay:    { type: Number , default : 0 },
    
    totalPremiumFeatures:    { type: Number , default : 0 },
    totalStayingCost:    { type: Number , default : 0 },
    totalFinalCost:    { type: Number , default : 0 },


    
    

    status:{ type: String, default: 1 }

    

});

let Booking = module.exports = mongoose.model('Booking', bookingSchema);