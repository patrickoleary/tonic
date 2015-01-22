/**
 * DataModel tonic Model Class.
 *
 * @class tonic.Model.DataModel
 * @extends {tonic.Model} from tonic.Model
 */
tonic.Model.DataModel = tonic.Model.extend(function () {

    /**
     * Overloaded constructor for tonic.Model.DataModel class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {String} settings.basePath the root path to the data, and
     * @param {String} settings.infoFile the json filename.
     */
    this.constructor = function(settings) {
        this.super({
            basePath: settings.basePath,
            baseFile: settings.infoFile
        });
        this.infoFile = settings.infoFile;
    };

    /**
     * Overloaded initialize for tonic.Application.StandaloneApp class.
     *
     * @method initialize
     */
    this.initialize = function() {
        this.super();
    };

    /**
     * getDataType for tonic.Model.DataModel class.
     *
     * @method getDataType
     * @return {String} the type of data.
     */
    this.getDataType = function () {
        if (this.isLoaded()) {
            return this.getValue('metadata').type;
        }
        return 'no-match';
    };

    /**
     * getFilePattern for tonic.Model.DataModel class.
     *
     * @method getFilePattern
     * @param {Object} keySetList a list of key value pairs
     * @param {Array} ignoreList an array keys to ignore
     * @return {String} the file path based on the updated keySetList.
     */
    this.getFilePattern = function(keySetList, ignoreList) {
        if (this.isLoaded()) {
            var keySet = keySetList || {},
                result = this.getValue('name_pattern'),
                kp = ['{', '}'],
                ignore = ignoreList || [];

            for (var i = 0; i < keySet.length; i++) {
                var item = keySet[i];
                if (!(item.key in ignore)) {
                    result = result.replace(kp.join(item.key), item.value);
                }
            }
            return result;
        }
        return null;
    };

});