/**
 * Created by fsdevlondon on 04/07/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server;
var router = express.Router();

var loanController = require('./controllers/loan');
var investorController = require('./controllers/investor');
var tranchesController = require('./controllers/tranche');
var interestsController = require('./controllers/interest');
var investmentsController = require('./controllers/investment');

app.use(bodyParser.urlencoded({
    extended: true
}));

// Create endpoint handlers for loans
router.route('/loans')
    .get(loanController.getLoans)
    .post(loanController.postLoans);

router.route('/loan/:loan_name')
    .get(loanController.getByName);

// Create endpoint handlers for lonas --> tranches
router.route('/tranches')
    .post(tranchesController.postTranches);


// Create endpoint handlers for investors
router.route('/investors')
    .get(investorController.getInvestors)
    .post(investorController.postInvestors);

router.route('/investor/:inv_name')
    .get(investorController.getByName);

//Investments
router.route('/investments')
    .post(investmentsController.postInvestments);

//Calculations
router.route('/interests')
    .post(interestsController.postInterests);


app.use('/', router);


var start = exports.start = function(port, callback){
    server = app.listen(port, callback);
};

var stop = exports.stop = function(callback){
    server.close(callback);
};

//console.log("Lend Invest Microservice started at port: ", 8080);
//start(8080);