/**
 * Created by fsdevlondon on 04/07/16.
 */
var mongoose = require('mongoose');

var LoanSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    tranches: Array
});

module.exports = mongoose.model('Loan', LoanSchema);
