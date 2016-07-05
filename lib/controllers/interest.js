/**
 * Created by fsdevlondon on 04/07/16.
 */
var loans_db = require('../globals').loans;
var investors_db = require('../globals').investors;
var finder = require('../globals').finder;

var getNumDays = (startDate, endDate)=>{
    var oneDay = 24*60*60*1000;
    return Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay)));
};

exports.postInterests = (req, res) => {
    var int_startDate = new Date(req.body.startDate);
    var int_endDate = new Date(req.body.endDate);

    var inv_earnings = [];

    loans_db.map(loan => {

        var endDate = new Date(loan.endDate);

        if(int_endDate < endDate) endDate = int_endDate;

        loan.tranches.map(tranche => {

            tranche.investors.map(investor => {

                let stDate = new Date(investor.date);
                if(int_startDate > stDate) stDate = int_startDate;
                
                let numDays = getNumDays(stDate, endDate) + 1;
                let daysPeriod = getNumDays(int_startDate, int_endDate) + 1;
                
                // Interest Rate based on Monthly days
                let earnings = Math.round((investor.amount * (tranche.interestRate * numDays / daysPeriod)) * 100) / 100;

                var inv_idx = finder(inv_earnings, '_id', investor.investor_id);
                if(inv_idx === -1){
                    inv_idx = finder(investors_db, '_id', investor.investor_id);
                    inv_earnings.push({
                        _id: investor.investor_id,
                        name: investors_db[inv_idx].name,
                        earnings: earnings
                    });
                }else{
                    inv_earnings[inv_idx].earnings += earnings;
                }
            });

        });
    });
    
    res.send(inv_earnings);
};