const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const balanceRoutes = require('./routes/balanceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/balance', balanceRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error syncing database:', err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

