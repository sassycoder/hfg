'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-bake');

  grunt.initConfig({
    watch: {
      compass: {
        files: 'sass/**/*.scss',
        tasks: ['compass', 'replace']
      },

      scripts: {
        files: [
          'assets/js/components/*.js',
          'assets/js/framework/*.js',
          'assets/js/lib/*.js'
        ],
        tasks: ['build']
      },

      bake: {
        files: ['templates/**/*.html'],
        tasks: 'bake:build'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: [
        'Gruntfile.js',
        'assets/js/components/*.js'
      ]
    },

    concat: {
      components: {
        src: ['assets/js/components/*.js'],
        dest: 'assets/js/components.js'
      },
      framework: {
        src: ['assets/js/framework/*.js'],
        dest: 'assets/js/framework.js'
      },
      library: {
        src: ['assets/js/lib/single/jquery-1.8.3.js',
              'assets/js/lib/*.js'],
        dest: 'assets/js/lib.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'assets/js/components.min.js': 'assets/js/components.js',
          'assets/js/framework.min.js': 'assets/js/framework.js',
          'assets/js/lib.min.js': 'assets/js/lib.js'
        }
      }
    },

    bake: {
      build: {
        files: {
            'index.html': 'templates/structure/index.html',
            'style-guide.html': 'templates/structure/style-guide.html',
            'template1.html': 'templates/layout/template1.html',
            'template2.html': 'templates/layout/template2.html',
            'template3.html': 'templates/layout/template3.html',
            'template4.html': 'templates/layout/template4.html',
            'template5.html': 'templates/layout/template5.html',
            'template6.html': 'templates/layout/template6.html',
            'breadcrumb.html': 'templates/components/breadcrumb.html',
            'recipe-header.html': 'templates/components/recipe-header.html',
            'recipe-body.html': 'templates/components/recipe-body.html',
            'recipe-list-item.html': 'templates/components/recipe-list-item.html',
            'tabs.html': 'templates/components/tabs.html',
            'tabs-small.html': 'templates/components/tabs-small.html',
            'article-header.html': 'templates/components/article-header.html',
            'article-body.html': 'templates/components/article-body.html',
            'homepage-carousel.html': 'templates/components/homepage-carousel.html',
            'infobox-hero.html': 'templates/components/infobox-hero.html',
            'infobox-square.html': 'templates/components/infobox-square.html',
            'infobox-list.html': 'templates/components/infobox-list.html'
        }
      }
    },

    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    replace: {
      example: {
        src: ['assets/css/*.css'],
        overwrite: true,
        replacements: [{
          from: '/assets/img',
          to: '../../assets/img'
        }]
      }
    }
  });

  grunt.registerTask('build', ['compass:clean', 'compass:dist', 'jshint', 'concat', 'uglify', 'bake:build', 'replace']);
  grunt.registerTask('default', ['build']);
};
