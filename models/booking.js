let mongoose = require('mongoose');


// Booking Schema
let bookingSchema = mongoose.Schema({
    
    title:{
        type: String,
        required:true
    },

    author:{
        type: String
    }, 
    authorArticle:{
        type: String    }, 
    checkIn:{
        type: Date,
        required:true
    },
    checkOut:{
        type: Date,
        required:true
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
    total:{
        type: Number
    },
    status:{
        type: String,
        default: 1
    },
    status:{
        type: Number,
        default: 0
    }



});

let Booking = module.exports = mongoose.model('Booking', bookingSchema);