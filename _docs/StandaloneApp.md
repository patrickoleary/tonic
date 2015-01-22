---
layout: docs
title: StandaloneApp.js
prev_section: DivApp
next_section: init
permalink: /docs/StandaloneApp/
---

# Global





* * *

## Class: StandaloneApp
StandaloneApp Tonic Application Class.

### StandaloneApp.constructor(settings, settings.el, settings.dataRoot, settings.staticRoot) 

Overloaded constructor for tonic.Application.StandaloneApp class.

**Parameters**

**settings**: `Object`, an object that contains:

**settings.el**: `Element`, the document element that will hold the StandaloneApp,

**settings.dataRoot**: `String`, the root path to the data, and

**settings.staticRoot**: `String`, the root path to the Tonic distribution.


### StandaloneApp.destructor() 

Overloaded destructor for tonic.Application.StandaloneApp class.


### StandaloneApp.initialize() 

Overloaded initialize for tonic.Application.StandaloneApp class.

   Create the data model,
   add a listener for when the data model is ready to be used, and
   fetch the model.


### StandaloneApp.render() 

Overloaded render for tonic.Application.StandaloneApp class.

   If the model is loaded,
   load the layout for the StandaloneApp, and
   add the header templates.


### StandaloneApp.render(e) 

modelReady an event handler for notification of when the data model is available.

   When the model is loaded, remove the listener, and render the StandaloneApp.

**Parameters**

**e**: `CustomEvent`, the event triggered from loading the data model




* * *
