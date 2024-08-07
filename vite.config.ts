import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vitestConfig: VitestUserConfigInterface = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup.ts',
  },
};

export default vitestConfig;