module.exports = function(grunt) {
  var rewrite = require('connect-modrewrite');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      index: '.'
    },
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "css/renderer.css": "css/renderer.less",
          "css/editor.css": "css/editor.less",
        }
      }
    },
    browserify: {
      
      dev: {
        files: {
          '<%= paths.index %>/js/bundle.js': ['<%= paths.index %>/js/app.js'],
        },

        options: {
          transform: ['reactify'],
          bundleOptions : {
            debug: true 
          },
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= paths.index %>',

          // http://danburzo.ro/grunt/chapters/server/
          middleware: function(connect, options) {

            var middleware = [];

            // 1. mod-rewrite behavior
            var rules = [
                '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
            ];
            middleware.push(rewrite(rules));

            // 2. original middleware behavior
            var base = options.base;
            if (!Array.isArray(base)) {
                base = [base];
            }
            base.forEach(function(path) {
                middleware.push(connect.static(path));
            });

            return middleware;

          }
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      dev: {
        files: [
          '<%= paths.index %>/js/**/*.js',
          '<%= paths.index %>/scripts/**/*.jsx'
        ],
        tasks: ['browserify']
      },
      src: {
        files: ['css/*.less'],
        tasks: ['less'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'connect', 'watch']);
};
