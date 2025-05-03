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
      include: ["**/*.test.ts", "**/*.test.tsx"],
      exclude: ["./ShoppingCart-Frontend/e2e_tests/app.test.ts", "./node_modules"]
    }
});