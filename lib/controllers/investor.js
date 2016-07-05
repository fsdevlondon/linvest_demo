/**
 * Created by fsdevlondon on 04/07/16.
 */
var Investor = require('../models/investor');
var investors_db = require('../globals').investors;


exports.getByName = (req, res) => {

    var investors = [];
    var i = investors_db.length;
    var regexText = new RegExp(req.params.inv_name);
    while(i--){
        if(regexText.test(investors_db[i].name)) investors.push(investors_db[i]);
    }
    res.send(investors);
};

exports.postInvestors = (req, res) => {

    var investor = new Investor({
        name: req.body.name,
        wallet: req.body.wallet
    });

    investors_db.push(investor);

    res.json({ message: 'New Investor Added!', _id: investor._id});
};

exports.getInvestors = (req, res) => {

    res.send(investors_db);
};