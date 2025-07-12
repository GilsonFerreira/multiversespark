const express = require('express');
const router = express.Router();
const configManager = require('../configManager');

router.get('/subdominios', (req, res) => {
  const yaml = configManager.lerConfig();
  res.json(yaml);
});

router.post('/subdominios', (req, res) => {
  const result = configManager.adicionarSubdominio(req.body);
  res.json(result);
});

router.post('/reiniciar', (req, res) => {
  const { exec } = require('child_process');
  exec('systemctl restart cloudflared', (error) => {
    if (error) return res.status(500).send('Erro ao reiniciar túnel');
    res.send('Túnel reiniciado com sucesso!');
  });
});

module.exports = router;
