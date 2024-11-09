const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.get('/:cardId', balanceController.getBalance);
router.post('/:cardId', balanceController.updateBalance);
router.get('/:cardId/transactions', balanceController.getTransactionHistory);

module.exports = router;