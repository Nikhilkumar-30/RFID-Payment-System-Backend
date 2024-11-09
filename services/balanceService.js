const { sequelize, CardBalance, Transaction } = require('../models');

class BalanceService {
  async getBalance(cardId) {
    try {
      const cardBalance = await CardBalance.findOne({
        where: { cardId }
      });
      return cardBalance?.balance ?? 0;
    } catch (error) {
      throw new Error('Error fetching balance');
    }
  }

  async updateBalance(cardId, amount, type) {
    const t = await sequelize.transaction();

    try {
      // Find or create card balance
      const [cardBalance] = await CardBalance.findOrCreate({
        where: { cardId },
        defaults: { balance: 0 },
        transaction: t
      });

      const newBalance = type === 'credit'
        ? parseFloat(cardBalance.balance) + parseFloat(amount)
        : parseFloat(cardBalance.balance) - parseFloat(amount);

      if (type === 'debit' && newBalance < 0) {
        throw new Error('Insufficient balance');
      }

      // Update balance
      await cardBalance.update(
        { balance: newBalance },
        { transaction: t }
      );

      // Create transaction record
      await Transaction.create({
        cardId,
        amount,
        transactionType: type
      }, { transaction: t });

      await t.commit();

      return {
        success: true,
        newBalance,
        message: `Balance ${type === 'credit' ? 'added' : 'deducted'} successfully`
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getTransactionHistory(cardId) {
    try {
      return await Transaction.findAll({
        where: { cardId },
        order: [['created_at', 'DESC']],
        limit: 10
      });
    } catch (error) {
      throw new Error('Error fetching transaction history');
    }
  }
}

module.exports = new BalanceService();