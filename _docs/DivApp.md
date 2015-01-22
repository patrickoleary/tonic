---
layout: docs
title: DivApp.js
prev_section: configuration
next_section: StandaloneApp
permalink: /docs/DivApp/
---

# Global





* * *

## Class: DivApp
DivApp Tonic Application Class.

### DivApp.constructor(settings, settings.el, settings.dataRoot, settings.staticRoot)

Overloaded constructor for tonic.Application.DivApp class.

**Parameters**

**settings**: `Object`, an object that contains:

**settings.el**: `Element`, the document element that will hold the DivApp,

**settings.dataRoot**: `String`, the root path to the data, and

**settings.staticRoot**: `String`, the root path to the Tonic distribution.


### DivApp.destructor()

Overloaded destructor for tonic.Application.DivApp class.


### DivApp.initialize()

Overloaded initialize for tonic.Application.DivApp class.

   Create the data model,
   add a listener for when the data model is ready to be used, and
   fetch the model.


### DivApp.render()

Overloaded render for tonic.Application.DivApp class.

   If the model is loaded,
   load the layout for the DivApp.


### DivApp.render(e)

modelReady an event handler for notification of when the data model is available.

   When the model is loaded, remove the listener, and render the DivApp.

**Parameters**

**e**: `CustomEvent`, the event triggered from loading the data model




* * *
