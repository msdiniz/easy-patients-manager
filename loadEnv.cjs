const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

console.log('Loading environment variables from src/auth/.env');

const envPath = path.resolve(__dirname, 'src/auth/.env');
console.log(`Resolved .env path: ${envPath}`);

if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  console.log('Parsed environment variables:', envConfig);

  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }

  console.log('Environment variables loaded successfully');
} else {
  console.error(`.env file not found at path: ${envPath}`);
}