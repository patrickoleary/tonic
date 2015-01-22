/**
 * StandaloneApp tonic Application Class.
 *
 * @class tonic.Application.StandaloneApp
 * @extends {tonic.Application} from tonic
 */
/*jshint -W079 */
var StandaloneApp = tonic.Application.extend(function () {

    /**
     * Overloaded constructor for tonic.Application.StandaloneApp class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {Element} settings.el the document element that will hold the StandaloneApp,
     * @param {String} settings.dataRoot the root path to the data, and
     * @param {String} settings.staticRoot the root path to the tonic distribution.
     */
    this.constructor = function(settings) {
        this.super();
        this.el = qwery(settings.el)[0];
        this.dataRoot = settings.dataRoot;
        this.staticRoot = settings.staticRoot;
        this.title = "Tonic";
    };

    /**
     * Overloaded destructor for tonic.Application.StandaloneApp class.
     *
     * @method destructor
     */
    this.destructor = function() {
        this.super();
        bean.off(document, 't:model-ready', this.modelReady);
        this.el = null;
        this.dataRoot = null;
        this.staticRoot = null;
        this.title = null;
    };

    /**
     * Overloaded initialize for tonic.Application.StandaloneApp class.
     *
     *    Create the data model,
     *    add a listener for when the data model is ready to be used, and
     *    fetch the model.
     *
     * @method initialize
     */
    this.initialize = function() {
        this.super();
        this.model = new tonic.Model.DataModel({
            basePath: this.dataRoot,
            infoFile: 'info.json'
        });

        bean.on(document, 't:model-ready', this.modelReady);

        this.model.fetch();
    };

    /**
     * Overloaded render for tonic.Application.StandaloneApp class.
     *
     *    If the model is loaded,
     *    load the layout for the StandaloneApp, and
     *    add the header templates.
     *
     * @method render
     */
    this.render = function () {
        this.super();
        this.el.innerHTML = tonic.app.templates.bodyLayout({});

        qwery('.header-left')[0].innerHTML = tonic.templates.headerleft({icon: 'fa fa-trello', title: this.title});
    };

    /**
     * modelReady an event handler for notification of when the data model is available.
     *
     *    When the model is loaded, remove the listener, and render the StandaloneApp.
     *
     * @method render
     * @param {CustomEvent} e the event triggered from loading the data model
     */
    this.modelReady = function (e) {
        this.render();
    };
});
