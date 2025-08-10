 
const config = {
  setupFiles: ['jest-canvas-mock', '<rootDir>/tests/setup.ts'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '\\.m?jsx?$': [
      'babel-jest',
      {
        plugins: ['@babel/plugin-transform-modules-commonjs']
      }
    ],
    '\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
  ],
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)']
};

export default config;
