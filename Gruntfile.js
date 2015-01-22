module.exports = function (grunt) {
    var staticRoot;
    var fs = require('fs');
    var jade = require('jade');
    var path = require('path');

    // Pass a "--env=<value>" argument to grunt. Default value is "dev".
    var environment = grunt.option('env') || 'dev';
    if (['dev', 'prod'].indexOf(environment) === -1) {
        grunt.fatal('The --env argument must be either "dev" or "prod".');
    }

    // Pass a "--port=<value>" argument to grunt to change the server port.
    var port = Number(grunt.option('port') || '8081');

    // Project configuration.
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            uses_defaults: {}
        },

        copy: {
            ext: {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/css/font-awesome.min.css',
                    'node_modules/bootstrap/dist/css/bootstrap.min.css'],
                dest: 'dist/css/'
            },
            dist: {
                expand: true,
                flatten: false,
                src: ['dist/**'],
                dest: 'examples/'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/fonts/fontawesome-webfont.*'],
                dest: 'dist/fonts/'
            }
        },

        doxx: {
            custom: {
                src: 'src',
                target: 'docs',
                options: {
                    title: 'Tonic',
                    ignore: 'stylesheets,templates'
                }
            }
        },

        jsdox: {
            generate: {
                options: {
                    contentsTitle: 'Tonic API Documentation'
                },

                src: ['src/js/app/**/*.js', 'src/js/lib/**/*.js', 'src/js/*.js'],
                dest: 'docs/markdown'
            }
        },

        express: {
            server: {
                options: {
                    port: port,
                    bases: ['dist']
                }
            }
        },

        extend: {
            options: {
                defaults: {
                    staticRoot: '',
                    dataRoot: '/data',
                    title: 'Tonic'
                }
            },
            config: {
                files: {
                    'config.json': ['config.json']
                }
            }
        },

        jade: {
            options: {
                client: true,
                compileDebug: false,
                processName: function (filename) {
                    return path.basename(filename, '.jade');
                }
            },
            app: {
                files: {
                    'dist/lib/tonic.app.templates.js': [
                        'src/templates/app/**/*.jade'
                    ]
                },
                options: {
                    namespace: 'tonic.app.templates'
                }
            },
            lib: {
                files: {
                    'dist/lib/tonic.templates.js': [
                        'src/templates/lib/**/*.jade'
                    ]
                },
                options: {
                    namespace: 'tonic.templates'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['src/js/app/**/*.js', 'src/js/lib/**/*.js', 'src/js/*.js', 'src/tests/unit/lib/**/*.js']
        },

        stylus: {
            app: {
                files: {
                    'dist/css/tonic.app.min.css': [
                        'src/stylesheets/app/**/*.styl'
                    ]
                }
            },
            lib: {
                files: {
                    'dist/css/tonic.min.css': [
                        'src/stylesheets/lib/**/*.styl'
                    ]
                }
            }
        },

        exec: {
            jasmine: {
                command: 'node_modules/phantomjs/bin/phantomjs RunJasmine.js http://0.0.0.0:8000/SpecRunner.html'
            }
        },

        uglify: {
            options: {
                sourceMap: environment === 'dev',
                sourceMapIncludeSources: true,
                report: 'min',
                beautify: {
                    ascii_only: true
                },
                mangle: environment !== 'dev'
            },
            app: {
                files: {
                    'dist/lib/tonic.app.min.js': [
                        'dist/lib/tonic.app.templates.js',
                        'src/js/app/**/*.js'
                    ]
                }
            },
            ext: {
                files: {
                    'dist/lib/tonic.ext.min.js': [
                        'node_modules/jade/runtime.js',
                        'node_modules/bean/bean.js',
                        'node_modules/qwery/qwery.js',
                        'node_modules/reqwest/reqwest.js',
                        'vendor/lib/extend.js'
                    ]
                }
            },
            lib: {
                files: {
                    'dist/lib/tonic.min.js': [
                        'src/js/init.js',
                        'dist/lib/tonic.templates.js',
                        'src/js/lib/**/*.js'
                    ]
                }
            }
        },

        watch: {
            stylus_app: {
                files: ['src/stylesheets/app/**/*.styl'],
                tasks: ['stylus:app']
            },
            stylus_lib: {
                files: ['src/stylesheets/lib/**/*.styl'],
                tasks: ['stylus:lib']
            },
            js_app: {
                files: ['src/js/app/**/*.js'],
                tasks: ['uglify:app']
            },
            js_lib: {
                files: ['src/js/lib/**/*.js', 'src/js/init.js'],
                tasks: ['uglify:lib']
            },
            jade_app: {
                files: ['src/templates/app/**/*.jade'],
                tasks: ['jade:app', 'uglify:app']
            },
            jade_lib: {
                files: ['src/templates/lib/**/*.jade'],
                tasks: ['jade:lib', 'uglify:lib']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-doxx');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-extend');
    grunt.loadNpmTasks('grunt-jsdox');

    grunt.registerTask(
        'serve',
        'Serve the content at http://localhost:8081, ' +
        'use the --port option to override the default port',
        ['express', 'watch']
    );
    grunt.registerTask('build-js', ['jade', 'uglify:app', 'uglify:lib']);
    grunt.registerTask('init', ['copy:ext', 'copy:fonts', 'extend', 'uglify:ext']);
    grunt.registerTask('default', ['stylus', 'build-js']);
    grunt.registerTask('doc', ['doxx', 'jsdox:generate']);
    grunt.registerTask('examples', ['copy:dist']);
    grunt.registerTask('test', ['jshint', 'connect', 'exec:jasmine']);

};
