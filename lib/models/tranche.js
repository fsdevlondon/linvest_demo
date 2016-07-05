/**
 * Created by fsdevlondon on 04/07/16.
 */
var mongoose = require('mongoose');

var TrancheSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    available: Number, 
    interestRate: Number,
    investors: Array
});

module.exports = mongoose.model('Tranche', TrancheSchema);