/**
 * Created by fsdevlondon on 04/07/16.
 */

//Forced locally for example purposes, substitute by connection to DB
var loans = [];
var investors = [];

var findById = (array, prop, value) => {
    var i = array.length;
    while(i--){
        if(array[i][prop] == value) return i;
    }
    return -1;
};

exports.loans = loans;
exports.investors = investors;

exports.finder = findById;
