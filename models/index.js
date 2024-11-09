const sequelize = require('../config/database');
const CardBalance = require('./CardBalance');
const Transaction = require('./Transaction');

module.exports = {
  sequelize,
  CardBalance,
  Transaction
};