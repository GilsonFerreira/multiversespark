const config = {
  get: (key) => process.env[key],
};

module.exports = config;
