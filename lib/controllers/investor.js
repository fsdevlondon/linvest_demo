/**
 * Created by fsdevlondon on 04/07/16.
 */
var loans = require('../globals');
/**
 * Create endpoint /investor/:name for GET
 */
exports.getByName = (req, res) => {
    loans.push("asa22s");
    res.send(loans);
};