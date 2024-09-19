const config = {
  preset: 'ts-jest',
  detectOpenHandles: true,
  forceExit: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
};

export default config;
