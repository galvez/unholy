module.exports = {
  testEnvironment: 'node',
  expand: true,
  forceExit: true,
  testPathIgnorePatterns: [
    'src/',
    'node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: [
    'js',
    'json'
  ],
  reporters: [
    'default'
  ].concat(process.env.JEST_JUNIT_OUTPUT ? ['jest-junit'] : [])
}
