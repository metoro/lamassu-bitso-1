'use strict';

var common      = require('./common');
var ticker      = require('./ticker').ticker;


// copy relevant convienient constants
var config          = require('../config');
var SATOSHI_FACTOR  = config.SATOSHI_FACTOR;
var FUDGE_FACTOR    = config.FUDGE_FACTOR;

function getProperPrice(price, type, callback) {

  if (price !== null) {
    if (typeof price === 'string') {
      try {
        price = parseFloat(price);
      } catch(e) {
        return callback(new Error('invalid price'));
      }
    }

    return callback(null, price.toFixed(2));
  }

  ticker('MXN', function(err, response) {
    if (err) return callback(err);

    price = response.MXN.rates[type];

    if (type === 'ask') price *= FUDGE_FACTOR;
    else price /= FUDGE_FACTOR;

    callback(null, price.toFixed(2));
  });
}


exports.purchase = function purchase(satoshis, opts, callback) {
  var options = {
    type: 'buy',
    amount: satoshis
  };

  getProperPrice(opts && opts.price, 'ask', function(err, price) {
    if (err) return callback(err);

    options.price = price;

    trade(options, callback);
  });
};

exports.sell = function sell(satoshis, opts, callback) {
  var options = {
    type: 'sell',
    amount: satoshis
  };

  getProperPrice(opts && opts.price, 'bid', function(err, price) {
    if (err) return callback(err);

    options.price = price;

    trade(options, callback);
  });
};


function processError(response) {
  if (typeof response.error !== 'array') return new Error(response.error);

  var errs = [];
  for (var type in response.error) {
    var typeName = type === '__all__' ? 'Other' : type;
    errs.push(typeName + ': ' + response.error[type]);
  }
  return new Error(errs.join('; '));
}

function trade(opts, callback) {
  common.authRequest(opts.type + '/', {
    amount: (opts.amount / SATOSHI_FACTOR).toFixed(8),
    price: opts.price

  }, function(err, response) {
    if (err) return callback(err);

    if (response.error)
      return callback(processError(response));

    callback(null, response);
  });
}
