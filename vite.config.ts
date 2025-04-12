import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [
      react()
    ],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'shoppingcart-frontend-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'shoppingcart-frontend.pem'))      },
      port: 5174,
      host: 'localhost'
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        './setup.ts'
      ]
    }
});