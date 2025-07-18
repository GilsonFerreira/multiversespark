const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Função para ler o YAML
function readConfig(filePath) {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    return yaml.load(file);
  } catch (err) {
    throw new Error(`Erro ao ler YAML: ${err.message}`);
  }
}

// Função para validar e salvar
function writeConfig(filePath, configObject) {
  try {
    const yamlStr = yaml.dump(configObject, { noRefs: true });
    fs.writeFileSync(filePath, yamlStr, 'utf8');
  } catch (err) {
    throw new Error(`Erro ao salvar YAML: ${err.message}`);
  }
}

// Função para backup automático
function backupConfig(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(path.dirname(filePath), `backup-${timestamp}.yml`);
  try {
    fs.copyFileSync(filePath, backupPath);
  } catch (err) {
    console.warn(`Falha ao criar backup: ${err.message}`);
  }
}

module.exports = {
  readConfig,
  writeConfig,
  backupConfig
};
