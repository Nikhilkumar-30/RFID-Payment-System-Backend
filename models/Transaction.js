const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CardBalance = require('./CardBalance');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cardId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'card_id'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  transactionType: {
    type: DataTypes.ENUM('credit', 'debit'),
    allowNull: false,
    field: 'transaction_type'
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Set up relationships
// CardBalance.hasMany(Transaction, { foreignKey: 'cardId' });
// Transaction.belongsTo(CardBalance, { foreignKey: 'cardId' });

module.exports = Transaction;
