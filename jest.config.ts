export {}

module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],

  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/src/styles/', '<rootDir>/src/types/', '<rootDir>/assets/svg/']
}
