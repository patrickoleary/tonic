tonic.Container.WidgetContainer = tonic.Container.extend(function () {

    /**
     * Overloaded constructor for tonic.Container.ControlContainer class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {Element} settings.el the document element that will hold the StandaloneApp,
     */
    this.constructor = function (settings) {
        this.super();
        this.el = qwery(settings.el)[0];
        this.widgetTitle = settings.widgetTitle;
        this.widgetMap = settings.widgetMap;
        this.initialize();
    };

    /**
     * Overloaded destructor for tonic.Container.WidgetContainer class.
     *
     * @method destructor
     */
    this.destructor = function(){
        this.super();
        this.el = null;
        this.widgetTitle = null;
        this.widgetMap = null;
    };

    /**
     * Overloaded initialize for tonic.Container.WidgetContainer class.
     *
     * @method initialize
     */
    this.initialize = function () {
        this.super();
        this.render();
        bean.on(this.el, 'click', '.t-widget-container-button', this.buttonClick);
        bean.on(this.el, 'click', '.t-widget-container-close', this.closeClick);
    };

    /**
     * Overloaded render for tonic.Container.WidgetContainer class.
     *
     * @method render
     */
    this.render = function () {
        this.super();
        this.el.innerHTML = tonic.templates.widgetContainer({
            widgetTitle: this.widgetTitle,
            widgetMap: this.widgetMap
        });
    };

    /**
     *  buttonClick for tonic.Container.WidgetContainer class.
     *
     *  maximize and minimize individual widgets.
     *
     * @method buttonClick
     * @param {Event} e the event.
     */
    this.buttonClick = function (e) {
        var el = e.target,
            id = el.getAttribute('key'),
            state = el.getAttribute('state');
        if (state === 'active') {
            el.setAttribute('state', 'inactive');
            qwery(id)[0].setAttribute('state', 'inactive');
            qwery(id)[0].style.display = "none";
        }
        else {
            el.setAttribute('state', 'active');
            qwery(id)[0].setAttribute('state', 'active');
            qwery(id)[0].style.display = "block";
        }
    };

    /**
     *  closeClick for tonic.Container.WidgetContainer class.
     *
     *  maximize and minimize the widget container.
     *
     * @method closeClick
     * @param {Event} e the event.
     */
    this.closeClick = function (e) {
        var el = e.target,
            state = el.getAttribute('state');
        if (state === 'active') {
            el.setAttribute('state', 'inactive');
            var header = qwery('.t-widget-container-panel-header')[0],
                title = qwery('.t-widget-container-panel-title')[0],
                buttons = qwery('.t-widget-container-button'),
                close = qwery('.t-widget-container-close')[0],
                widgets = qwery('.t-widget-container');
            header.classList.add('small');
            title.classList.add('small');
            close.classList.add('small');
            for (var i=0; i<widgets.length; i++) {
                buttons[i].classList.add('small');
                widgets[i].classList.add('small');
                var widgetstate = widgets[i].getAttribute('state');
                if (widgetstate === 'active') {
                    widgets[i].style.display = "none";
                }
            }
        }
        else {
            el.setAttribute('state', 'active');
            var header = qwery('.t-widget-container-panel-header')[0],
                title = qwery('.t-widget-container-panel-title')[0],
                buttons = qwery('.t-widget-container-button'),
                close = qwery('.t-widget-container-close')[0],
                widgets = qwery('.t-widget-container');
            header.classList.remove('small');
            title.classList.remove('small');
            close.classList.remove('small');
            for (var i=0; i<widgets.length; i++) {
                buttons[i].classList.remove('small');
                widgets[i].classList.remove('small');
                var widgetstate = widgets[i].getAttribute('state');
                if (widgetstate === 'active') {
                    widgets[i].style.display = "block";
                }
            }
        }
    };

});