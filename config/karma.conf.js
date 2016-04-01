junitReporter: {
  outputFile: 'results/TEST-units.xml',
  suite: ''
},
coverageReporter: {
  type : 'lcov',
  dir : 'results/',
  subdir: '.'
},


preprocessors: {
  'app/**/*.js': ['coverage']
}


plugins: [
  'karma-junit-reporter',
  'karma-coverage'
}


karma: {
  junit: {
    singleRun: true,
    reporters: ['junit', 'coverage']
  }
},


grunt.registerTask('junit', [ 'clean:dist', 'jshint', 'karma:junit' ]);