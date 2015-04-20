/*global module:false*/
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.

      sass: {
      build: {
          files: {
              'build/css/master.css': 'assets/sass/master.scss'
          }
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

    jshint: {
          files: ['js/*.js'],
          options: { jshintrc: '.jshintrc',
            globals: {  
               
            },
            ignores : []
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('js', ['jshint','jsdoc', 'uglify']);
  grunt.registerTask('html', ['htmlhint']);

};
