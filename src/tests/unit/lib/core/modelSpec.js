define(['jasmine',
        'jasmine-html',
        'bean',
        'extendjs',
        'qwery',
        'reqwest',
        'src/js/init',
        'src/js/lib/core/model'], function() {
        'use strict';

        describe('tonic.Model unit tests', function() {
            var model;

            beforeEach(function() {
                model = new tonic.Model({ basePath: 'data/',
                                              baseFile: 'info.json' });
            });

            it("Constructor - basePath should be data/", function() {
                expect(model.basePath).toEqual('data/');
            });

            it("Constructor - baseFile should be info.json", function() {
                expect(model.baseFile).toEqual('info.json');
            });

            it("Constructor - url should be concatenated basePath + baseFile", function() {
                expect(model.url).toEqual('data/info.json');
            });

            it("Constructor - model should be null", function() {
                expect(model.model).toEqual(null);
            });

            it("Constructor - loaded should be false", function() {
                expect(model.loaded).toEqual(false);
            });
        });
    });