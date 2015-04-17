/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
          files: ['js/*.js'],
          options: { jshintrc: '.jshintrc',
            globals: {  
               
            },
            ignores : []
          }
      },

      sass: {
      build: {
          files: {
              'build/css/master.css': 'assets/sass/master.scss'
          }
      }
    },

    gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    
    htmlhint: {
        build: {
            options: {
                'tag-pair': true,
                'tagname-lowercase': true,
                'attr-lowercase': true,
                'attr-value-double-quotes': true,
                'doctype-first': true,
                'spec-char-escape': true,
                'id-unique': true,
                'head-script-disabled': true,
                'style-disabled': true
            },
            src: ['index.html']
        }
    },

    uglify: {
        build: {
            files: {
                'build/js/base.min.js': ['js/*.js']
            }
        }
    },

    watch: {
      html: {
            files: ['index.html'],
            tasks: ['htmlhint']
          },
        js: {
            files: ['/js/*.js'],
            tasks: ['uglify']
        }
    }
    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('js', ['jshint','jsdoc', 'uglify']);
  grunt.registerTask('html', ['htmlhint']);

};
