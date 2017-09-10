// load the things we need
var mongoose = require('mongoose');
var cardSchema = mongoose.Schema({
        card : {
        cardnumber : Number,
        cardname : String,
        cardexpiry : Number
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Card', cardSchema);