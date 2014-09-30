'use strict';

var _ = require('lodash');

exports.NAME = 'Bitso';
exports.SUPPORTED_MODULES = ['ticker', 'trader'];
exports.API_ENDPOINT = 'https://api.bitso.com/v2/';


exports.SATOSHI_FACTOR = 1e8;
exports.FUDGE_FACTOR = 1.05;

exports.config = function config(localConfig) {
  if (localConfig) _.merge(exports, localConfig);
};
