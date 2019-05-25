module.exports = {
  testEnvironment: 'node',
  expand: true,
  forceExit: true,

  // https://github.com/facebook/jest/pull/6747 fix warning here
  // But its performance overhead is pretty bad (30+%).
  // detectOpenHandles: true

  // setupTestFrameworkScriptFile: './test/utils/setup',
  // coverageDirectory: './coverage',
  // collectCoverageFrom: [],
  // coveragePathIgnorePatterns: [
  //   'node_modules/(?!(@nuxt|nuxt))',
  //   'packages/webpack/src/config/plugins/vue'
  // ],
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
