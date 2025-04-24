import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [
      react()
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        './setup.ts'
      ],
    }
});