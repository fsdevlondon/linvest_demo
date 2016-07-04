/**
 * Created by fsdevlondon on 04/07/16.
 */
var mongoose = require('mongoose');

var InvestorSchema = new mongoose.Schema({
    name: String,
    virtualWallet: Number,
    investments: Array
});

module.exports = mongoose.model('Investor', InvestorSchema);
