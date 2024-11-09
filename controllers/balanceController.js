const balanceService = require('../services/balanceService');

class BalanceController {
  async getBalance(req, res) {
    const { cardId } = req.params;
    try {
      const balance = await balanceService.getBalance(cardId);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBalance(req, res) {
    const { cardId } = req.params;
    const { amount, type } = req.body;
    
    try {
      const result = await balanceService.updateBalance(cardId, amount, type);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  async getTransactionHistory(req, res) {
    const { cardId } = req.params;
    try {
      const transactions = await balanceService.getTransactionHistory(cardId);
      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BalanceController();