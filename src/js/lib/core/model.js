/**
 * tonic Model Class.
 *
 * @class tonic.Model
 * @extends {Class} from ExtendJS
 */
tonic.Model = Class.extend(function(){

    /**
     * initializer is executed before the constructor for tonic.Model class.
     *
     * @method initializer
     */    this.initializer = function(){
        //...
    };

    /**
     * constructor for tonic.Model class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {String} settings.basePath the root path to the data, and
     * @param {String} settings.baseFile the json filename.
     */
    this.constructor = function(settings){
        this.basePath = settings.basePath;
        this.baseFile = settings.baseFile;
        this.url = this.basePath + this.baseFile;
        this.model = null;
        this.loaded = false;
    };

    /**
     * destructor for tonic.Model class.
     *
     * @method destructor
     */
    this.destructor = function(){
        this.basePath = null;
        this.baseFile = null;
        this.url = null;
        this.model = null;
        this.loaded = null;
    };

    /**
     * fetch for tonic.Model class.
     *
     *    Load the model json file.
     *
     * @method initialize
     */
    this.fetch = function () {
        var self = this;

        reqwest({
            url: this.url,
            type: 'json',
            error: function (e) {
                console.log("Error: Model json file read - error == ", e);
            },
            success: function (response) {
                self.model = response;
                self.loaded = true;
                bean.fire(document, 't:model-ready', { 'detail': 'model is now available' });
            }
        });

    };

    /**
     * getHash for tonic.Model class.
     *
     * @method getHash
     * @return {String} the url of model file to be used as part of a unique id.
     */
    this.getHash = function() {
        return this.url;
    };

    /**
     * geturl for tonic.Model class.
     *
     * @method geturl
     * @return {String} the url of model file.
     */
    this.geturl = function () {
        return this.url;
    };

    /**
     * getValue for tonic.Model class.
     *
     * @method getValue
     * @param {String} key the id of the requested value.
     * @return {Object} the value associated with the key.
     */
    this.getValue = function(key) {
        if (this.isLoaded()) {
            if (key in this.model) {
                return this.model[key];
            }
            return null;
        }
        return null;
    };

    /**
     * hasValue for tonic.Model class.
     *
     * @method getValue
     * @param {String} key the id of the requested value.
     * @return {Object} the value associated with the key.
     */
    this.hasValue = function(key) {
        if (this.isLoaded()) {
            if (key in this.model) {
                return true;
            }
            return false;
        }
        return false;
    };

    /**
     * initialize tonic.Model class.
     *
     * @method initialize
     */
    this.initialize = function(){
        //...
    };

    /**
     * loaded for tonic.Model class.
     *
     * @method initialize
     * @return {bool} true if the model has been loaded, otherwise false.
     */
    this.isLoaded = function() {
        return this.loaded;
    };

});
