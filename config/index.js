'use strict';

const _ = require('underscore');
let envConfig;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

try {
  envConfig = require('./env/' + process.env.NODE_ENV + '.js');
} catch(e) {
  envConfig = {};
}

let config = _.extend({}, require('./all.js'), envConfig);

/**
 * @returns {Boolean} isDev
 */
config.isDev = function(){
  return this.env === 'development';
};

/**
 * @returns {Boolean} isProduction
 */
config.isProduction = function(){
  return this.env === 'production';
};

/**
 * @returns {Boolean} isTest
 */
config.isTest = function(){
  return this.env === 'test';
};

module.exports = config;
