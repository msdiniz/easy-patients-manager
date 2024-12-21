// filepath: /C:/Users/Marcelo/source/repos/easy-patients-manager/vite.config.ts
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
  define: {
    'process.env': process.env,
  },
});