tonic.Widget.ControlWidget = tonic.Widget.extend(function () {

    /**
     * objectExtend for tonic.Widget.ControlWidget class.
     *
     *    Create a new dictionary that is extended by one or more dictionaries.
     *
     * @method objectExtend
     * @param  {Array} out dictionary plus argument dictionaries.
     * @return {Array} out a dictionary that extends arguments.
     */
    function objectExtend(out) {
        var out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    }

    /**
     * arrayDifference for tonic.Widget.ControlWidget class.
     *
     *    Find difference in two arrays.
     *
     * @method arrayDifference
     * @param  {Array} a1 one array.
     * @param  {Array} a2 another array.
     * @return {Array} diff the elements that are not in both.
     */
    function arrayDifference(a1, a2) {
        var a=[], diff=[];
        for(var i=0;i<a1.length;i++) {
            a[a1[i]] = true;
        }
        for(var i=0;i<a2.length;i++) {
            if (a[a2[i]]) delete a[a2[i]];
            else a[a2[i]] = true;
        }
        for(var k in a) {
            diff.push(k);
        }
        return diff;
    }

    /**
     * Overloaded constructor for tonic.Widget.ControlWidget class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {Element} settings.el the document element that will hold the StandaloneApp,
     * @param {tonic.Decorator.ControlDecorator} settings.controlDecorator decorated data model for control t-widgets, and
     * @param {Array} settings.exclude the arguments to be excluded in the control t-widgets.
     */
    this.constructor = function (settings) {
        this.super();
        this.el = qwery(settings.el)[0];
        this.controlDecorator = settings.controlDecorator;
        this.exclude = settings.exclude || [];
        this.order = null;
        this.initialize();
    };

    /**
     * Overloaded destructor for tonic.Widget.ControlWidget class.
     *
     * @method destructor
     */
    this.destructor = function(){
        this.super();
        bean.on(this.controlDecorator, 't:control-change', this.updateWidget);
        bean.on(this.el, 'input', 'input', this.updateIndex);
        bean.on(this.el, 'change', 'select', this.updateValue);
        bean.on(this.el, 'click', '.t-control-widget-button', this.buttonAction);

        this.el = null;
        this.controlDecorator = null;
        this.exclude = null;
        this.order = null;
    };

    /**
     * Overloaded initialize for tonic.Widget.ControlWidget class.
     *
     * @method initialize
     */
    this.initialize = function () {
        this.super();
        if(this.controlDecorator.getModel().isLoaded()) {
            this.decoratorReady();
        } else {
            bean.on(document, 't:model-ready', this.decoratorReady);
        }
    };

    /**
     * Overloaded render for tonic.Widget.ControlWidget class.
     *
     * @method render
     */
    this.render = function () {
        if (this.controlDecorator.getModel().isLoaded()) {
            this.super();
            this.el.innerHTML = tonic.templates.controlWidget({
                controlMap: this.annotateControlMap(this.controlDecorator.getControlMap()),
                order: this.order
            });
        }
    };

    /**
     * buttonAction for tonic.Widget.ControlWidget class.
     *
     *    Redirect button clicks to handlers.
     *
     * @method buttonAction
     * @param {Event} e the event.
     */
    this.buttonAction = function(e) {
        var el = e.target,
            control = el.parentNode.parentNode.getAttribute('control_id'),
            action = el.getAttribute('action');
        this[action](control);
    };

    /**
     * annotateControlMap for tonic.Widget.ControlWidget class.
     *
     *    Annotate a few common controls with labels and icons.
     *
     * @method annotateControlMap
     * @param {Dictionary} controlMap the map of the controls.
     * @return {Dictionary} newControlMapWithIcons the annotated control map.
     */
    this.annotateControlMap = function(controlMap) {
        var newControlMapWithIcons = objectExtend({}, controlMap),
            iconMap = {
                phi: 'fa fa-arrows-h',
                theta: 'fa fa-arrows-v',
                time: 'fa fa-clock-o',
                contourIdx: 'fa fa-bars'
            },
            iconLabelMap = {
                phi: 'Phi',
                theta: 'Theta',
                time: 'Tau'
            };

        for (var key in newControlMapWithIcons) {
            if (key in iconMap) {
                newControlMapWithIcons[key].icon = iconMap[key];
                if (key in iconLabelMap) {
                    newControlMapWithIcons[key].iconlabel = iconLabelMap[key];
                } else {
                    newControlMapWithIcons[key].iconlabel = 'nbsp';
                }
            }
        }

        return newControlMapWithIcons;
    };

    /**
     * decoratorReady for tonic.Widget.ControlWidget class.
     *
     *    Update the controls, add listeners when the decorator is ready.
     *
     * @method decoratorReady
     * @param {Event} e the event.
     */
    this.decoratorReady = function(e) {
        if(this.controlDecorator.getModel().hasValue("control")) {
            this.order = this.controlDecorator.getModel().getValue("control").order;
        } else {
            this.order = arrayDifference(this.controlDecorator.getControlNames(), this.exclude);
        }
        var j,
            control;
        for (j = 0; j < this.exclude.length; j++) {
            control = this.exclude[j];
            var i = this.order.indexOf(control);
            if(i != -1) {
                this.order.splice(i, 1);
            }
        }
        bean.on(this.controlDecorator, 't:control-change', this.updateWidget);
        bean.on(this.el, 'input', 'input', this.updateIndex);
        bean.on(this.el, 'change', 'select', this.updateValue);
        bean.on(this.el, 'click', '.t-control-widget-button', this.buttonAction);
    };

    /**
     * first for tonic.Widget.ControlWidget class.
     *
     *    Update control to the first element.
     *
     * @method first
     * @param {String} controlName the name of the control.
     */
    this.first = function (controlName) {
        this.controlDecorator.setFirstControlValue(controlName);
    };

    /**
     * last for tonic.Widget.ControlWidget class.
     *
     *    Update control to the last element.
     *
     * @method last
     * @param {String} controlName the name of the control.
     */
    this.last = function (controlName) {
        this.controlDecorator.setLastControlValue(controlName);
    };

    /**
     * next for tonic.Widget.ControlWidget class.
     *
     *    Update control to the next element.
     *
     * @method next
     * @param {String} controlName the name of the control.
     */
    this.next = function (controlName) {
        this.controlDecorator.incrementControlValue(controlName, false);
    };

    /**
     * previous for tonic.Widget.ControlWidget class.
     *
     *    Update control to the previous element.
     *
     * @method previous
     * @param {String} controlName the name of the control.
     */
    this.previous = function (controlName) {
        this.controlDecorator.decrementControlValue(controlName, false);
    };

    /**
     * updateWidget for tonic.Widget.ControlWidget class.
     *
     *    Update the control widget when changes have been made to the control decorator of the data model.
     *
     * @method updateWidget
     */
    this.updateWidget =  function () {
        var i,
            control;

        for (i = 0; i < this.order.length; i++) {
            control = this.order[i];
            var group = qwery('.t-control-widget[control_id="' + control + '"]'),
                value = this.controlDecorator.getControl(control),
                index = this.controlDecorator.getControlIndex(control),
                type = this.controlDecorator.getControlType(control);
            qwery('label.t-control-widget-value', group)[0].innerText = value;
            if (type === "range") {
                qwery('input', group)[0].value = index;
            } else if (type === "list") {
                qwery('select', group)[0].value = value;
            }
        }
    };

    /**
     * updateIndex for tonic.Widget.ControlWidget class.
     *
     *    Update the control widget when changes have been made to the control
     *    decorator of the data model via input[type=range] (i.e. slider).
     *
     * @method updateIndex
     * @param {Event} e the event from the input[type=range] (i.e. slider).
     */
    this.updateIndex = function (e) {
        var el = e.target,
            control = el.parentNode.parentNode.getAttribute('control_id'),
            index = el.value;
        this.controlDecorator.setControlIndex(control, index);
    };

    /**
     * updateValue for tonic.Widget.ControlWidget class.
     *
     *    Update the control widget when changes have been made to the control
     *    decorator of the data model via select (i.e. drop down selector/menu).
     *
     * @method updateValue
     * @param {Event} e the event from the select (i.e. drop down selector/menu).
     */
    this.updateValue = function (e) {
        var el = e.target,
            control = el.parentNode.parentNode.getAttribute('control_id'),
            value = el.value;
        this.controlDecorator.setControl(control, value, true);
    };
});
