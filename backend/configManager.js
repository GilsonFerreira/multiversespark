const fs = require('fs');
const yaml = require('js-yaml');
const path = '/mnt/cloudflared/config.yml';

function lerConfig() {
  try {
    const file = fs.readFileSync(path, 'utf8');
    return yaml.load(file);
  } catch (err) {
    return { error: 'Erro ao ler config.yml' };
  }
}

function adicionarSubdominio(data) {
  try {
    const file = fs.readFileSync(path, 'utf8');
    const config = yaml.load(file);

    config.ingress.push({
      hostname: data.hostname,
      service: data.service
    });

    fs.copyFileSync(path, path + '.bak');
    fs.writeFileSync(path, yaml.dump(config));
    return { success: true };
  } catch (err) {
    return { error: 'Erro ao salvar subdomínio' };
  }
}

module.exports = { lerConfig, adicionarSubdominio };
