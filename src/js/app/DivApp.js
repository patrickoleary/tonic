/**
 * DivApp tonic Application Class.
 *
 * @class tonic.Application.DivApp
 * @extends {tonic.Application} from tonic
 */
/*jshint -W079 */
var DivApp = tonic.Application.extend(function () {

    /**
     * Overloaded constructor for tonic.Application.DivApp class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {Element} settings.el the document element that will hold the DivApp,
     * @param {String} settings.dataRoot the root path to the data, and
     * @param {String} settings.staticRoot the root path to the tonic distribution.
     */
    this.constructor = function(settings) {
        this.super();
        this.el = qwery(settings.el)[0];
        this.dataRoot = settings.dataRoot;
        this.staticRoot = settings.staticRoot;
        this.widgetMap = [
            { key: 'controls', id: '#t-controls-panel', icon: 'fa fa-wrench', title: 'Controls' },
            { key: 'another-controls', id: '#t-another-controls-panel', icon: 'fa fa-camera-retro', title: 'Another Controls' }
        ];
    };

    /**
     * Overloaded destructor for tonic.Application.DivApp class.
     *
     * @method destructor
     */
    this.destructor = function() {
        this.super();
        this.el = null;
        this.dataRoot = null;
        this.staticRoot = null;
        this.widgetMap = null;

        bean.off(document, 't:model-ready', this.modelReady);
    };

    /**
     * Overloaded initialize for tonic.Application.DivApp class.
     *
     *    Create the data model,
     *    add a listener for when the data model is ready to be used, and
     *    fetch the model.
     *
     * @method initialize
     */
    this.initialize = function() {
        this.super();
        this.dataModel = new tonic.Model.DataModel({
            basePath: this.dataRoot,
            infoFile: 'info.json'
        });

        bean.on(document, 't:model-ready', this.modelReady);

        this.dataModel.fetch();
    };

    /**
     * Overloaded render for tonic.Application.DivApp class.
     *
     *    If the model is loaded,
     *    load the layout for the DivApp.
     *
     * @method render
     */
    this.render = function () {
        this.super();

        this.el.innerHTML = tonic.app.templates.divLayout({});
        this.controlwidget.render();
        this.anotherControlwidget.render();
    };

    /**
     * modelReady an event handler for notification of when the data model is available.
     *
     *    When the model is loaded, remove the listener, and render the DivApp.
     *
     * @method render
     * @param {CustomEvent} e the event triggered from loading the data model
     */
    this.modelReady = function (e) {
        this.widgetContainer = new tonic.Container.WidgetContainer({
            el: '#t-widget-container-div',
            widgetTitle: "Tools",
            widgetMap: this.widgetMap
        });
        this.controlDecorator = new tonic.Decorator.ControlDecorator({
            dataModel: this.dataModel
        });
        this.controlwidget = new tonic.Widget.ControlWidget({
            el: '#t-controls-panel',
            controlDecorator: this.controlDecorator,
            exclude: ['layer', 'filename', 'field']
        });
        this.anotherControlwidget = new tonic.Widget.ControlWidget({
            el: '#t-another-controls-panel',
            controlDecorator: this.controlDecorator,
            exclude: ['layer', 'filename', 'field']
        });
        this.render();
    };
});
