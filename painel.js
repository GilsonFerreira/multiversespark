const express = require('express');
const router = express.Router();
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { backupConfig, readConfig, writeConfig } = require('../config/configManager');

// Caminho do arquivo config.yml
const CONFIG_PATH = '/mnt/cloudflared/config.yml';

// Tela principal do painel
router.get('/', (req, res) => {
  try {
    const config = readConfig(CONFIG_PATH);
    const hostnames = config.ingress || [];
    res.render('painel', { hostnames });
  } catch (err) {
    res.send(`Erro ao ler config.yml: ${err.message}`);
  }
});

// Adiciona novo subdomínio
router.post('/add', (req, res) => {
  try {
    const { subdomain } = req.body;
    if (!subdomain || !subdomain.trim()) throw new Error('Subdomínio inválido');

    const config = readConfig(CONFIG_PATH);
    const newHostname = {
      hostname: `${subdomain}.seudominio.com`,
      service: 'http://localhost:3000'
    };

    config.ingress.push(newHostname);
    backupConfig(CONFIG_PATH);
    writeConfig(CONFIG_PATH, config);

    res.redirect('/painel');
  } catch (err) {
    res.send(`Erro ao adicionar subdomínio: ${err.message}`);
  }
});

// Remove subdomínio (por index)
router.post('/remove', (req, res) => {
  try {
    const index = parseInt(req.body.index);
    const config = readConfig(CONFIG_PATH);

    config.ingress.splice(index, 1);
    backupConfig(CONFIG_PATH);
    writeConfig(CONFIG_PATH, config);

    res.redirect('/painel');
  } catch (err) {
    res.send(`Erro ao remover subdomínio: ${err.message}`);
  }
});

// Botão de reinício do túnel
router.post('/restart', (req, res) => {
  const shell = require('child_process');
  shell.exec('systemctl restart cloudflared', (err, stdout, stderr) => {
    if (err) {
      res.send(`Erro ao reiniciar túnel: ${stderr}`);
    } else {
      res.redirect('/painel');
    }
  });
});

module.exports = router;