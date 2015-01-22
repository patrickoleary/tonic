/**
 * DataModel tonic Model Class.
 *
 * @class tonic.Model.DataModel
 * @extends {tonic.Model} from tonic.Model
 */
tonic.Decorator.ControlDecorator = tonic.Decorator.extend(function () {

    /**
     * Overloaded constructor for tonic.Decorator.ControlDecorator class.
     *
     * @method constructor
     * @param {Object} settings an object that contains:
     * @param {tonic.Model.DataModel} settings.dataModel the data model.
     */
    this.constructor = function(settings) {
        this.super();
        this.dataModel = settings.dataModel;
        this.controlMap = {};
        this.controlNames = [];
        this.initialize();
    };

    /**
     * Overloaded destructor for tonic.Decorator.ControlDecorator class.
     *
     * @method destructor
     */
    this.destructor = function(){
        this.super();
        this.dataModel = null;
        this.controlMap = null;
        this.controlNames = null;
    };

    /**
     * Overloaded initialize for tonic.Decorator.ControlDecorator class.
     *
     * @method initialize
     */
    this.initialize = function() {
        this.super();
        if(this.dataModel.isLoaded()) {
            this.dataModelReady();
        } else {
            bean.on(document, 't:model-ready', this.dataModelReady);
        }
    };


    /**
     * dataModelReady for tonic.Decorator.ControlDecorator class.
     *
     *    Update the controls map and controls names.
     *
     * @method dataModelReady
     * @return {Object} controlMap which contains values, active index, label and default value.
     */
    this.dataModelReady = function() {
        var arguments = this.dataModel.getValue('arguments');

        this.controlMap = {};
        this.controlNames = [];
        for (var key in arguments) {
            if (arguments.hasOwnProperty(key)) {
                // Store arguments
                this.controlNames.push(key);
                this.controlMap[key] = arguments[key];

                // Set the active index
                var index = arguments[key].values.indexOf(arguments[key]['default']);
                this.controlMap[key].activeIndex = Number((index < 0) ? 0 : index);
            }
        }
    };

    /**
     * getControl for tonic.Decorator.ControlDecorator class.
     *
     *    Get control value base on its name.
     *
     * @method getControl
     * @param {String} name of the control.
     * @return {Object} value of the control.
     */
    this.getControl = function (name) {
        return this.controlMap[name].values[this.controlMap[name].activeIndex];
    };

    /**
     * hasControl for tonic.Decorator.ControlDecorator class.
     *
     *    Return true if the control exist
     *
     * @method hasControl
     * @param {String} name of the control.
     * @return {bool} true if the control exist, otherwise false.
     */
    this.hasControl = function (name) {
        return this.controlMap.hasOwnProperty(name);
    };

    /**
     * getControlLabel for tonic.Decorator.ControlDecorator class.
     *
     *    Get control label base on its name.
     *
     * @method getControlLabel
     * @param {String} name of the control.
     * @return {String} label of the control.
     */
    this.getControlLabel = function (name) {
        return this.controlMap[name].label;
    };

    /**
     * getControlType for tonic.Decorator.ControlDecorator class.
     *
     *    Get control type base on its name.
     *
     * @method getControlType
     * @param {String} name of the control.
     * @return {String} type of values of the control.
     */
    this.getControlType = function (name) {
        return this.controlMap[name].type;
    };

    /**
     * getControlIndex for tonic.Decorator.ControlDecorator class.
     *
     *    Get the active index for the given control
     *
     * @method getControlIndex
     * @param {String} name of the control.
     * @return {Integer} activeIndex of the control.
     */
    this.getControlIndex = function (name) {
        return this.controlMap[name].activeIndex;
    };

    /**
     * setControl for tonic.Decorator.ControlDecorator class.
     *
     *    Set a new value to a control.
     *    Fires t:control-change event.
     *
     * @method setControl
     * @param {String} name of the control.
     * @param {Object} newValue of the control.
     * @param {bool} fire true if we fire an event on a control change, otherwise false.
     * @return {bool} true if the control changed, otherwise false.
     */
    this.setControl = function (name, newValue, fire) {
        var newIndex = this.controlMap[name].values.indexOf(newValue),
            changed = false;

        if (newIndex !== -1) {
            changed = this.controlMap[name].activeIndex !== newIndex;
            this.controlMap[name].activeIndex = Number(newIndex);
        } else {
            console.error("Can not set " + newValue + " to " + name);
        }
        if (changed && fire !== false) {
            bean.fire(this, 't:control-change', { 'detail': 'a control changed', 'name': name });
        }
        return changed;
    };

    /**
     * setControls for tonic.Decorator.ControlDecorator class.
     *
     *    Set multiple control values at once using an object, e.g.
     *      {
     *         phi: "...",
     *         theta: "..."
     *      }
     *    Fires t:control-change event.
     *
     * @method setControls
     * @param {Object} object containing multiple control:value pairs.
     */
    this.setControls = function (object) {
        for (var key in object){
            if (object.hasOwnProperty(key)) {
                this.setControl(key, object[key], false);
            }
        }
        bean.fire(this, 't:control-change', { 'detail': 'multiple controls changed', 'object': object });
    };

    /**
     * setControlIndex for tonic.Decorator.ControlDecorator class.
     *
     *    Set a new active index to a control.
     *    Fires t:control-change event.
     *
     * @method setControlIndex
     * @param {String} name of the control.
     * @param {Integer} index the new active index of the control.
     */
    this.setControlIndex = function (name, index) {
        var changed = false;

        if (index >= 0 && index < this.controlMap[name].values.length) {
            changed = this.controlMap[name].activeIndex !== index;
            this.controlMap[name].activeIndex = Number(index);
        } else {
            console.log("index out of range for control " + name);
        }
        if (changed) {
            bean.fire(this, 't:control-change', { 'detail': 'index of control changed', 'index': index });
        }
        return changed;
    };

    /**
     * incrementControlValue for tonic.Decorator.ControlDecorator class.
     *
     *    Update the value of a given control to its next discrete value.
     *    Fires t:control-change event.
     *
     * @method incrementControlValue
     * @param {String} name of the control.
     * @param {bool} wrap whether the list is circular.
     * @return {Object} value of the control.
     */
    this.incrementControlValue = function (name, wrap) {
        this.controlMap[name].activeIndex = Number(this.controlMap[name].activeIndex) + 1;
        if(this.controlMap[name].activeIndex >= this.controlMap[name].values.length) {
            this.controlMap[name].activeIndex = wrap ? 0 : this.controlMap[name].values.length - 1;
        }
        bean.fire(this, 't:control-change', { 'detail': 'increment index of control changed', 'index': this.controlMap[name].activeIndex });
        return this.getControl(name);
    };

    /**
     * decrementControlValue for tonic.Decorator.ControlDecorator class.
     *
     *    Get previous control value base on its name.
     *    Fires t:control-change event.
     *
     * @method decrementControlValue
     * @param {String} name of the control.
     * @param {bool} wrap whether the list is circular.
     * @return {Object} value of the control.
     */
    this.decrementControlValue = function (name, wrap) {
        this.controlMap[name].activeIndex = Number(this.controlMap[name].activeIndex) - 1;
        if (this.controlMap[name].activeIndex < 0) {
            this.controlMap[name].activeIndex = wrap ? this.controlMap[name].values.length - 1 : 0;
        }

        bean.fire(this, 't:control-change', { 'detail': 'decrement index of control changed', 'index': this.controlMap[name].activeIndex });
        return this.getControl(name);
    };

    /**
     * setFirstControlValue for tonic.Decorator.ControlDecorator class.
     *
     *    Update to the first value for the given control parameter.
     *    Fires t:control-change event.
     *
     * @method setFirstControlValue
     * @param {String} name of the control.
     * @return {Object} value of the control.
     */
    this.setFirstControlValue = function (name) {
        this.controlMap[name].activeIndex = 0;
        bean.fire(this, 't:control-change', { 'detail': 'index = first value control changed', 'index': this.controlMap[name].activeIndex });
        return this.getControl(name);
    };

    /**
     * setLastControlValue for tonic.Decorator.ControlDecorator class.
     *
     *    Update to the last value for the given control parameter.
     *    Fires t:control-change event.
     *
     * @method setLastControlValue
     * @param {String} name of the control.
     * @return {Object} value of the control.
     */
    this.setLastControlValue = function (name) {
        this.controlMap[name].activeIndex = this.controlMap[name].values.length - 1;
        bean.fire(this, 't:control-change', { 'detail': 'index = last value control changed', 'index': this.controlMap[name].activeIndex });
        return this.getControl(name);
    };

    /**
     * getControls for tonic.Decorator.ControlDecorator class.
     *
     *    Get the current controls set.
     *
     * @method getControls
     * @return {Object} controls set of the control key value pairs.
     */
    this.getControls = function () {
        var controls = {},
            count = this.controlNames.length;

        while (count--) {
            var name = this.controlNames[count];
            controls[name] = this.getControl(name);
        }
        return controls;
    };

    /**
     * getControlMap for tonic.Decorator.ControlDecorator class.
     *
     *    Get the current controls map.
     *
     * @method getControlMap
     * @return {Object} controlMap which contains values, active index, label and default value.
     */
    this.getControlMap = function () {
        return this.controlMap;
    };

    /**
     * getControlNames for tonic.Decorator.ControlDecorator class.
     *
     *    Get the control names.
     *
     * @method getControlNames
     * @return {Object} controlNames the control names.
     */
    this.getControlNames = function () {
        return this.controlNames;
    };

    /**
     * getModel for tonic.Decorator.ControlDecorator class.
     *
     *    Get data model.
     *
     * @method getModel
     * @return {tonic.Model.DataModel} dataModel the data model.
     */
    this.getModel = function () {
        return this.dataModel;
    };

});
