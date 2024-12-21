// filepath: /C:/Users/Marcelo/source/repos/easy-patients-manager/loadEnv.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, 'src/auth/.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}