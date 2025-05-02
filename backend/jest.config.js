module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Set the test environment to Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize TypeScript files
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Optional: Map module paths if you're using aliases
  },
};