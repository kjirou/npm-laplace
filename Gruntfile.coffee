module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-notify'
  grunt.loadNpmTasks 'grunt-testem'
  grunt.loadNpmTasks 'grunt-text-replace'

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    constants:
      js:
        src: '<%= pkg.main %>'
        mocha_test_index: 'test/index.js'
        mocha_tests: 'test/mocha-tests.js'
      builded:
        minified: 'laplace.min.js'

    jshint:
      files: [
        '<%= constants.js.src %>'
        '<%= constants.js.mocha_tests %>'
      ]
      options: {
        jshintrc: '.jshintrc'
      }

    mochaTest:
      options:
        grep: '<%= grunt.cli.options.grep ? grunt.cli.options.grep : "" %>'
      main:
        src: ['<%= constants.js.mocha_test_index %>']

    replace:
      version:
        src: [
          'package.json'
          '<%= constants.js.src %>'
        ]
        overwrite: true
        replacements: [
          from: /(['"])0\.0\.1(['"])/
          to: '$10.0.2$2'
        ]

    testem:

      options:
        launch_in_ci: ['PhantomJS']

      _src: 'webtest/index.html'
      _dest: 'log/tests.tap'

      main:
        src: '<%= testem._src %>'
        dest: '<%= testem._dest %>'

      xb:
        options:
          launch_in_ci: [
            'PhantomJS'
            'Chrome'
            'Firefox'
            'Safari'
          ]
        src: '<%= testem._src %>'
        dest: '<%= testem._dest %>'

      travis:
        src: '<%= testem._src %>'

    uglify:
      production:
        files:
          '<%= constants.builded.minified %>': '<%= constants.js.src %>'


  # Custom tasks
  grunt.registerTask 'test:mocha', [
    'mochaTest:main'
  ]

  grunt.registerTask 'test:web', [
    'testem:main'
  ]

  grunt.registerTask 'test:xb', [
    'testem:xb'
  ]

  grunt.registerTask 'travis', [
    'testem:travis'
  ]

  grunt.registerTask 'release', [
    'replace:version'
    'uglify:production'
  ]


  # Aliases
  grunt.registerTask 'test', ['test:mocha']


  # Shortcuts
  grunt.registerTask 't', ['test']
  grunt.registerTask 'h', ['jshint']
  grunt.registerTask 'default', ['test']
