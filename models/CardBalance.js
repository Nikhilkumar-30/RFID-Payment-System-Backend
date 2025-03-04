const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardBalance = sequelize.define('CardBalance', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true
  },
  cardId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    field: 'card_id'
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  }
}, {
  tableName: 'card_balances',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CardBalance;
