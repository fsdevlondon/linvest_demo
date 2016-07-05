/**
 * Created by fsdevlondon on 04/07/16.
 */
var loans_db = require('../globals').loans;
var investors_db = require('../globals').investors;
var finder = require('../globals').finder;

exports.postInvestments = (req, res) => {
    
    var amount = req.body.amount;
    var inv_date = new Date(req.body.date);
    
    // Find Elements
    var loan_idx = finder(loans_db, '_id', req.body.loan_id);
    if(loan_idx === -1){
        res.send({ message: 'Invalid loan id', state: 'exception'});
        return;
    }
    
    var tranche_idx = finder(loans_db[loan_idx].tranches, '_id', req.body.tranche_id);
    if(tranche_idx === -1){
        res.send({ message: 'Invalid tranche id', state: 'exception'});
        return;
    }

    var investor_idx = finder(investors_db, '_id', req.body.investor_id);
    if(investor_idx === -1){
        res.send({ message: 'Invalid investor id', state: 'exception'});
        return;
    }
    
    // Check Wallet
    if(investors_db[investor_idx].wallet < amount){
        res.send({ message: 'Insufficient funds', state: 'exception'});
        return;
    }
    
    // Check Dates Investment
    if( inv_date > new Date(loans_db[loan_idx].endDate) ||
        inv_date < new Date(loans_db[loan_idx].startDate)
    ){
        res.send({ message: 'Invalid date for this investment', state: 'exception'});
        return;
    }

    // Check Tranche
    if(loans_db[loan_idx].tranches[tranche_idx].available < amount){
        res.send({ message: 'Insufficient funds in tranche', state: 'exception'});
        return;
    }
    
    // Add investment in investor, subtract amount from wallet, subtract amount from tranche available
    loans_db[loan_idx].tranches[tranche_idx].investors.push({
        investor_id: req.body.investor_id,
        amount: amount,
        date: req.body.date
    });
    
    investors_db[investor_idx].wallet -= amount;

    loans_db[loan_idx].tranches[tranche_idx].available -= amount;

    res.send({ message: 'Investment done!', state: 'ok'});
};