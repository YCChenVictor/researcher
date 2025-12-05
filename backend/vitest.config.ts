import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: [
      './tests/setupEnv.ts',
    ],
    env: {
      ...process.env,
    },
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/console.ts',
        'src/env.ts',
      ],
    //   thresholds: {
    //     branches: 70,
    //     functions: 80,
    //     lines: 80,
    //     statements: 80,
    //   },
    },
  },
});
