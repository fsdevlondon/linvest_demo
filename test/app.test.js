/**
 * Created by fsdevlondon on 04/07/16.
 */
var expect = require('chai').expect;
var request = require('superagent');
var myApp = require('../lib/app');

describe('Test suite Lend Invest micro service', ()=>{

    var port = 8080;
    var baseUrl = 'http://localhost:' + port;

    before(done => myApp.start(port, done));

    after(done => myApp.stop(done));

    it("Add a Investment", done => {
        request
            .post(baseUrl + '/loans')
            .type('form')
            .send({
                name: 'one canada square',
                startDate: '2016-10-01T01:00:00.000Z',
                endDate: '2016-11-15T01:00:00.000Z'
            })
            .end(function(err, res){
                expect(res).to.exist;
                expect(res.status).to.equal(200);

                done();
            });
    });

    it("Add 4 Investors", done => {
        var investors = [
            {

            },
        ];

        done();
    });
});