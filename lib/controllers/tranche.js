/**
 * Created by fsdevlondon on 04/07/16.
 */
var Tranche = require('../models/tranche');
var loans_db = require('../globals').loans;


exports.postTranches = (req, res) => {

    var tranches = [];
    for(var i=0; i<req.body.tranches.length; i++){
        tranches.push(
            new Tranche({
                name: req.body.tranches[i].name,
                amount: req.body.tranches[i].amount,
                available: req.body.tranches[i].amount,
                interestRate: req.body.tranches[i].interestRate,
                investors: []
            })
        );
    }

    i = loans_db.length;
    while(i--){
        if(loans_db[i]._id == req.body._id){
            loans_db[i].tranches = tranches;
            break;
        }
    }
    
    res.json({ message: 'New tranches Added!', _ids: tranches.map(x=>x._id)});
};