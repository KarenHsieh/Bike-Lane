const config = {
  env: process.env.API_ENV || "DEV",
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,
};

module.exports = config;
