import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from custom .env file
const envPath = path.resolve(__dirname, 'src/auth/.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

for (const k in envConfig) {
  process.env[`VITE_${k}`] = envConfig[k];
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
    },
  },
  define: {
    'process.env': process.env,
  },
});