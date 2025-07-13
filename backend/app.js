require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;
const path = require('path');

// Servir os arquivos estáticos da build do React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Redirecionar qualquer rota não-API para o index.html do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.listen(port, () => {
  console.log(`🚀 Backend rodando na porta ${port}`);
});
