const express = require('express');
const bcrypt = require('bcrypt');
const config = require('../utils/configManager');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('🚀 Multiversespark-v2 API is live');
});

router.post('/login', async (req, res) => {
  const { senha } = req.body;
  console.log('🔍 req.body recebido:', req.body);

  if (!senha) return res.status(400).json({ error: 'Senha não fornecida' });

  const senhaCorreta = await bcrypt.compare(senha, config.get('PAINEL_PASSWORD'));

  if (!senhaCorreta) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Autenticado com sucesso
  res.json({ message: 'Login autorizado', token: 'fake-token-exemplo' });
});

module.exports = router;
