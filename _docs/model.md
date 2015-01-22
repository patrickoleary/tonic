---
layout: docs
title: model.js
prev_section: application
next_section: datamodel
permalink: /docs/model/
---

# Global





* * *

## Class: Model
Tonic Model Class.

### Model.initializer()

initializer is executed before the constructor for tonic.Model class.


### Model.constructor(settings, settings.basePath, settings.baseFile)

constructor for tonic.Model class.

**Parameters**

**settings**: `Object`, an object that contains:

**settings.basePath**: `String`, the root path to the data, and

**settings.baseFile**: `String`, the json filename.


### Model.destructor()

destructor for tonic.Model class.


### Model.initialize()

fetch for tonic.Model class.

   Load the model json file.


### Model.getHash()

getHash for tonic.Model class.

**Returns**: `String`, the url of model file to be used as part of a unique id.

### Model.geturl()

geturl for tonic.Model class.

**Returns**: `String`, the url of model file.

### Model.getValue(key)

getValue for tonic.Model class.

**Parameters**

**key**: `String`, the id of the requested value.

**Returns**: `Object`, the value associated with the key.

### Model.initialize()

initialize tonic.Model class.


### Model.initialize()

loaded for tonic.Model class.

**Returns**: `bool`, true if the model has been loaded, otherwise false.



* * *
