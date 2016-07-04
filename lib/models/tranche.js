/**
 * Created by fsdevlondon on 04/07/16.
 */
var mongoose = require('mongoose');

var TrancheSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    interestRate: Date,
    investors: Array
});

module.exports = mongoose.model('Tranche', TrancheSchema);