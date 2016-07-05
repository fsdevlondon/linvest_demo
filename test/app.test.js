/**
 * Created by fsdevlondon on 04/07/16.
 */
var expect = require('chai').expect;
var request = require('superagent');
var myApp = require('../lib/app');

describe('Test suite Lend Invest micro service', ()=>{

    var port = 8080;
    var baseUrl = 'http://localhost:' + port;

    /**
     * Data
     */
    var loan = {
        name: 'one canada square',
        startDate: '2015-10-01T01:00:00.000Z',
        endDate: '2015-11-15T01:00:00.000Z'
    };
    
    var tranches = [
        {
            name: 'A',
            amount: 1000,
            interestRate: 0.03            
        },
        {
            name: 'B',
            amount: 1000,
            interestRate: 0.06
        }
    ];
    
    var investors = [
        {name: 'Investor 4', wallet: 1000},
        {name: 'Investor 3', wallet: 1000},
        {name: 'Investor 2', wallet: 1000},
        {name: 'Investor 1', wallet: 1000}
    ];

    /**
     * End Data
     */

    before(done => myApp.start(port, done));

    after(done => myApp.stop(done));

    it("Add a Loan", done => {
        request
            .post(baseUrl + '/loans')
            .type('form')
            .send(loan)
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                loan._id = res.body._id;
                done();
            });
    });

    it("Get a Loan by Name", done => {
        request
            .get(baseUrl + '/loan/' + loan.name)
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                
                done();
            });
    });
    

    it("Add a " + tranches.length + " to existing loan ", done => {
        request
            .post(baseUrl + '/tranches')
            .type('form')
            .send({
                _id: loan._id,
                tranches: tranches
            })
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                tranches = tranches.map((tranche, index) =>{
                    tranche._id = res.body._ids[index];
                    return tranche;
                });
                done();
            });
    });
    

    it("Add " + investors.length + " Investors", done => {
        
        var i = investors.length;
        var counter = 0;
        
        while(i--){
            request
                .post(baseUrl + '/investors')
                .type('form')
                .send(investors[i])
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    investors[counter]._id = res.body._id;
                    counter++;
                });
        }
        done();
        
    });


    describe('Investments Case Suite', ()=>{

        it("As “Investor 1” I’d like to invest 1,000 pounds on the tranche “A” on 03/10/2015: “ok”", done => {
            request
                .post(baseUrl + '/investments' )
                .type('form')
                .send({
                    investor_id: investors[0]._id,
                    loan_id: loan._id,
                    tranche_id: tranches[0]._id,
                    amount: 1000,
                    date: '2015-10-03T01:00:00.000Z'
                })
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body.state).to.equal('ok');
                    done();
                });

        });

        it("As “Investor 2” I’d like to invest 1 pounds on the tranche “A” on 04/10/2015: “exception”", done => {
            request
                .post(baseUrl + '/investments' )
                .type('form')
                .send({
                    investor_id: investors[1]._id,
                    loan_id: loan._id,
                    tranche_id: tranches[0]._id,
                    amount: 1,
                    date: '2015-10-04T01:00:00.000Z'
                })
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body.state).to.equal('exception');
                    done();
                });

        });

        it("As “Investor 3” I’d like to invest 500 pounds on the tranche “B” on 10/10/2015: “exception”", done => {
            request
                .post(baseUrl + '/investments' )
                .type('form')
                .send({
                    investor_id: investors[2]._id,
                    loan_id: loan._id,
                    tranche_id: tranches[1]._id,
                    amount: 500,
                    date: '2015-10-10T01:00:00.000Z'
                })
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body.state).to.equal('ok');
                    done();
                });

        });

        it("As “Investor 4” I’d like to invest 1,100 pounds on the tranche “B” on 25/10/2015: “exception”", done => {
            request
                .post(baseUrl + '/investments' )
                .type('form')
                .send({
                    investor_id: investors[3]._id,
                    loan_id: loan._id,
                    tranche_id: tranches[1]._id,
                    amount: 1100,
                    date: '2015-10-25T01:00:00.000Z'
                })
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body.state).to.equal('exception');
                    done();
                });

        });

        it("Interest calculation for the period 01/10/2015 -> 31/10/2015", done => {
            request
                .post(baseUrl + '/interests' )
                .type('form')
                .send({
                    startDate: '2015-10-01T01:00:00.000Z',
                    endDate: '2015-10-31T01:00:00.000Z'
                })
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body[0].name).to.equal('Investor 1');
                    expect(res.body[0].earnings).to.equal(28.06);
                    expect(res.body[1].name).to.equal('Investor 3');
                    expect(res.body[1].earnings).to.equal(21.29);
                    done();
                });

        });

    });

    
    
    
});