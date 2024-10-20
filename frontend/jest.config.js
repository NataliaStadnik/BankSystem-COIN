module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(svg|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },

  testEnvironment: 'jsdom',
};
