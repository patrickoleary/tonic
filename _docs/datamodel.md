---
layout: docs
title: datamodel.js
prev_section: model
next_section: collections
permalink: /docs/datamodel/
---

# Global





* * *

## Class: DataModel
DataModel Tonic Model Class.

### DataModel.constructor(settings, settings.basePath, settings.infoFile) 

Overloaded constructor for tonic.Model.DataModel class.

**Parameters**

**settings**: `Object`, an object that contains:

**settings.basePath**: `String`, the root path to the data, and

**settings.infoFile**: `String`, the json filename.


### DataModel.initialize() 

Overloaded initialize for tonic.Application.StandaloneApp class.


### DataModel.getDataType() 

getDataType for tonic.Model.DataModel class.

**Returns**: `String`, the type of data.

### DataModel.getFilePattern(keySetList, ignoreList) 

getFilePattern for tonic.Model.DataModel class.

**Parameters**

**keySetList**: `Object`, a list of key value pairs

**ignoreList**: `Array`, an array keys to ignore

**Returns**: `String`, the file path based on the updated keySetList.



* * *
