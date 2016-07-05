/**
 * Created by fsdevlondon on 04/07/16.
 */
var Loan = require('../models/loan');
var loans_db = require('../globals').loans;


exports.getByName = (req, res) => {
    
    var loans = [];
    var i = loans_db.length;
    var regexText = new RegExp(req.params.loan_name);
    while(i--){
        if(regexText.test(loans_db[i].name)) loans.push(loans_db[i]);
    }
    res.send(loans);
};

exports.postLoans = (req, res) => {
    
    var loan = new Loan({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        amount: req.body.amount,
        tranches: []
    });

    loans_db.push(loan);

    res.json({ message: 'New Loan Added!', _id: loan._id });
};

exports.getLoans = (req, res) => {
    
    res.send(loans_db);
};