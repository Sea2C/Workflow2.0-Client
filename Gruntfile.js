var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    glob = require('glob'),
    dust = require('dustjs-linkedin');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
               options: {
                 name: 'app',
                 baseUrl: 'src',
                 mainConfigFile: 'src/app.js',
                 out: 'build/<%= pkg.name %>.js',
                 optimize: 'none'
               }
            }
        },
        jshint: {
            files: [
                'src/models/*.js',
                'src/collections/*.js',
                'src/views/**/*.js',
                'src/routers/*.js',
                'src/*.js'
            ]
        },
        uglify: {
            options: {
                compress: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                wrap: true
            },
            build: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= requirejs.compile.options.out %>']
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'src/models/*.js',
                    'src/collections/*.js',
                    'src/views/**/*.js',
                    'src/routers/*.js',
                    'src/*.js',
                    'src/templates/**/*.dust'
                ],
                tasks: ['default']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dust', 'Compiles LinkedIn flavored dust', function () {
        var promise = this.async();
        
        glob('src/templates/**/*.dust', function (error, templates) {
            if (error) {
                return promise(false);
            }

            templates.forEach(function (template) {
                var dir = path.dirname(template),
                    parents = dir.split(path.sep),
                    name = path.basename(template, path.extname(template)),
                    compiledName = util.format('%s.%s', parents[parents.length - 1], name.toLowerCase()),
                    compiled = dust.compile(fs.readFileSync(template, 'utf8'), compiledName);
                fs.writeFileSync(path.join(dir, util.format('%s.js', name)), compiled);
            });

            grunt.log.writeln(util.format('%d templates compiled.', templates.length));
            return promise();
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'dust', 'requirejs', 'uglify']);
    grunt.registerTask('dev', ['watch']);
};