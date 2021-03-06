module.exports = function (grunt) {
    'use strict';

    var config = {
        sass: {
            dev: {
                options: {
                    outputStyle: 'compact'
                },
                files: {
                    'public/css/app.css': 'src/styles/app.scss'
                }
            }
        },
        jshint: {
            dev: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'src/scripts/**/*.js',
                    '!src/scripts/lib/**/*.js'
                ]
            }
        },
        watch: {
            options: {
                spawn: false
            },
            styles: {
                files: [
                    'src/styles/{,*/}*.scss'
                ],
                tasks: ['sass']
            },
            scripts: {
                files: [
                    'src/scripts/**/*.js',
                    '!src/scripts/lib/**/*.js'
                ],
                tasks: ['jshint']
            }
        }
    };
    
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig(config);
    
    // on watch events configure jshint to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        if (filepath.indexOf('.js', filepath.length - '.js'.length) !== -1) {
            grunt.config('jshint.dev.src', filepath);
        }
    });

    grunt.registerTask('build', [
        'sass',
        'jshint',
        'watch'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);
};
