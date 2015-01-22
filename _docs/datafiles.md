---
layout: docs
title: Data Files
prev_section: collections
next_section: migrations
permalink: /docs/datafiles/
---

The data files are organized in a hierarchy with an _info.json_ file at the top,
which describes the data files conforming to the API described here.

# API

##1 - arguments

{% highlight json %}
    "arguments": {
{% endhighlight %}

Contains a list of arguments for Tonic where only **filename** required. We
provide _default_ for the argument, _label_ to possibly be used in a graphical
user interface, _type_ equal to **item**, **list** or **range** that applies
to _values_, which is the actual argument.

###filename

{% highlight json %}
        "filename": {
            "default": "rgb.jpg",
            "label": "filename",
            "type": "list",
            "values": [  "rgb.jpg", "composite.json" ]
        },
{% endhighlight %}

Defines the filenames of the files to be pulled into Tonic.

###field

{% highlight json %}
        "field": {
            "default": "bottomDepth",
            "label": "field",
            "type": "list",
            "values": [ "bottomDepth", "temperature", "salinity" ]
        },
{% endhighlight %}

Defines the fields available to color map the visualization objects.

###layer

{% highlight json %}
        "layer": {
            "default": "_",
            "label": "layer",
            "type": "list",
            "values": [ "_", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" ]
        },
{% endhighlight %}

List of the layers that could be composited by Tonic. The convention is to
use "_" for the background layer and base64 characters ("A", ..., "Z", "a", ..., "z", ...)
for the additional layers.

###phi

{% highlight json %}
        "phi": {
            "default": "0.0",
            "label": "phi",
            "type": "range",
            "values": [ "0.0", "20.0", "40.0", "60.0", "80.0", "100.0", "120.0", "140.0", "160.0", "180.0", 
                        "200.0", "220.0", "240.0", "260.0", "280.0", "300.0", "320.0", "340.0" ]
        },
{% endhighlight %}

List of the phi (longitude) samplings for the camera.

###theta

{% highlight json %}
        "theta": {
            "default": "15.0",
            "label": "theta",
            "type": "range",
            "values": [ "15.0", "40.0", "65.0", "90", "115.0", "140.0", "165.0" ]
        },
{% endhighlight %}

List of the theta (latitude) samplings for the camera.

###time

{% highlight json %}
        "time": {
            "default": "0",
            "label": "time",
            "type": "range",
            "values": [ "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" ]
        }
    },
{% endhighlight %}

List of the time (temporal) samplings the data files.

##2 - cost

{% highlight json %}
    "cost": {
        "image-width": 500,
        "images": 1386,
        "space": 2971263922,
        "time": 13566.501937627792
    },
{% endhighlight %}

Contains cost measurements for data files construction. _image-width_ is the width of
the images. _images_ is the number of images contained in the data files. _space_ is
the bytes used to hold the data files. _time_ is the compute wall clock time used to
create the data files.

##3 - metadata

{% highlight json %}
  "metadata": {
{% endhighlight %}

Contains the core metadata that describes the data files to Tonic.

###description

{% highlight json %}
        "description": "MPAS 120KM simulation collecting contours on salinity and temperature.",
{% endhighlight %}

A description of the analysis and data files.

###dimensions

{% highlight json %}
        "dimensions": [ 500, 500 ],
{% endhighlight %}

Size of the imagery in the data files.

###fields

{% highlight json %}
        "fields": {
            "A": "salinity",
            "B": "temperature",
            "C": "bottomDepth"
        },
{% endhighlight %}

Defines the RGB fields available to color map the visualization objects.

###scalars

{% highlight json %}
        "scalars": {
            "D": "vRTData",
            "E": "vBrownianVectorsX",
            "F": "vBrownianVectorsY"
        },
{% endhighlight %}

Defines the scalar fields available for the visualization objects.

###id

{% highlight json %}
        "id": "composite-contours",
{% endhighlight %}

Like any other identification, _id_ is intended to be used to distinguish this data files
from another data files in the **_In Situ_ Tonic** setting, but has been, typically,
set to the same value as the _path_ and working directory (_working_dir_). We should find
another way to identify the individual data files and remove this key from the metadata.

###layer_fields

{% highlight json %}
        "layer_fields": {
                          "A": [ "C" ],
                          "B": [ "B", "A" ],
                          "C": [ "B", "A" ],
                          "D": [ "B", "A" ],
                          "E": [ "B", "A" ],
                          "F": [ "B", "A" ],
                          "G": [ "B", "A" ],
                          "H": [ "B", "A" ],
                          "I": [ "B", "A" ],
                          "J": [ "B", "A" ],
                          "K": [ "B", "A" ]
        },
{% endhighlight %}

_layer_fields_ defines the mapping between layers and fields or scalars for color mapping.
The layer key is associated with a list of fields to color the layer or scalars that can be
used to compute colors dynamically.

###layers

{% highlight json %}
        "layers": "ABCDEFGHIJK",
{% endhighlight %}

_layers_ defines a string of layers by a single character (64 layers).

###offset

{% highlight json %}
        "offset": {
                "AC": 1,  "BB": 2,
                "BA": 3,  "CB": 4,
                "CA": 5,  "DB": 6,
                "DA": 7,  "EB": 8,
                "EA": 9,  "FB": 10,
                "FA": 11, "GB": 12,
                "GA": 13, "HB": 14,
                "HA": 15, "IB": 16,
                "IA": 17, "JB": 18,
                "JA": 19, "KB": 20,
                "KA": 21
        },
{% endhighlight %}

_offset_ defines offset of each image layer into the image sprite.

###path

{% highlight json %}
        "path": "composite-contours",
{% endhighlight %}

_path_ was intended to provide the base path prepend the _name_pattern_. Over time,
the _name_pattern_ was assumed to be relative to the _info.json_ file. In this example,
the _path_ is the same as the _id_, which is the same as the _working_dir_.

###pipeline

{% highlight json %}
        "pipeline": [
{% endhighlight %}

_pipeline_ is a list that describes the grouping of layers to use in defining a graphical
user interface (GUI).

**_type=layer_**

{% highlight json %}
{
    "ids": [ "A" ],
    "name": "Earth core",
    "type": "layer"
},
{% endhighlight %}

_ids_ is a single layer list associating a visualization object layer with this pipeline layer.
_name_ provides a label of this layer to use for a graphical user interface element.
_type_ is _layer_.

**_type=directory_**

{% highlight json %}
{
    "children": [...],
    "ids": [ "B", "C", "D", "E", "F" ],
    "name": "Contour by temperature",
    "type": "directory"
},
{% endhighlight %}

_ids_ and _name_ are defined similarly as with _type=layer_. _type_ is _directory_.

**_children_ of _type=directory_**

{% highlight json %}
{
    "ids": [ "B" ],
    "name": "t=5.0",
    "type": "layer"
},
{
    "ids": [ "C" ],
    "name": "t=10.0",
    "type": "layer"
},
{
    "ids": [ "D" ],
    "name": "t=15.0",
    "type": "layer"
},
{
    "ids": [ "E" ],
    "name": "t=20.0",
    "type": "layer"
},
{
    "ids": [ "F" ],
    "name": "t=25.0",
    "type": "layer"
}
{% endhighlight %}

_children_ is a list of the individual children layers in the directory, and are
described as _type=layer_ above.

###title

{% highlight json %}
        "title": "Composite contours",
{% endhighlight %}

_title_ is a short name of the analysis and data files.

###type

{% highlight json %}
        "type": "composite-image-stack"
{% endhighlight %}

_type_ is the overall class of the analysis set. Examples include: "_parametric-image-stack_",
"_image-data-stack_", "_line-prober-csv-stack_", "_point-series-prober-csv-stack_",
"_time-csv-stack_", "_composite-image-stack_", and "_catalyst-viewer_".

##4 - name_pattern

{% highlight json %}
    "name_pattern": "{time}/{theta}/{phi}/{filename}",
{% endhighlight %}

_name_pattern_ is a string that describes the data files hierarchy. "{}" bracketed **arguments**
are separated by "/"'s to indicate directory/subdirectory order. Each individual argument
corresponds to one of the arguments. For example "{time}".

##5 - working_dir

{% highlight json %}
        "working_dir": "composite-contours",
{% endhighlight %}

_working_dir_ was intended to provide the base path prepend the _name_pattern_. Over time, the
_name_pattern_ was assumed to be relative to the _info.json_ file. In this example, the
_working_dir_ is the same as the _id_, which is the same as the _path_.

# example

{% highlight json %}
{
    "arguments": {
        "filename": {
            "default": "rgb.jpg",
            "label": "filename",
            "type": "list",
            "values": [  "rgb.jpg", "composite.json" ]
        },
        "field": {
            "default": "bottomDepth",
            "label": "field",
            "type": "list",
            "values": [ "bottomDepth", "temperature", "salinity" ]
        },
        "layer": {
            "default": "_",
            "label": "layer",
            "type": "list",
            "values": [ "_", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" ]
        },
        "phi": {
            "default": "0.0",
            "label": "phi",
            "type": "range",
            "values": [ "0.0", "20.0", "40.0", "60.0", "80.0", "100.0", "120.0", "140.0", "160.0", "180.0", 
                        "200.0", "220.0", "240.0", "260.0", "280.0", "300.0", "320.0", "340.0" ]
        },
        "theta": {
            "default": "15.0",
            "label": "theta",
            "type": "range",
            "values": [ "15.0", "40.0", "65.0", "90", "115.0", "140.0", "165.0" ]
        },
        "time": {
            "default": "0",
            "label": "time",
            "type": "range",
            "values": [ "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" ]
        }
    },
    "cost": {
        "image-width": 500,
        "images": 1386,
        "space": 2971263922,
        "time": 13566.501937627792
    },
    "metadata": {
        "description": "MPAS 120KM simulation collecting contours on salinity and 
                       temperature.",
        "dimensions": [ 500, 500 ],
        "fields": {
            "A": "salinity",
            "B": "temperature",
            "C": "bottomDepth"
        },
        "id": "composite-contours",
        "layer_fields": { "A": [ "C" ],
                          "B": [ "B", "A" ],
                          "C": [ "B", "A" ],
                          "D": [ "B", "A" ],
                          "E": [ "B", "A" ],
                          "F": [ "B", "A" ],
                          "G": [ "B", "A" ],
                          "H": [ "B", "A" ],
                          "I": [ "B", "A" ],
                          "J": [ "B", "A" ],
                          "K": [ "B", "A" ]
        },
        "layers": "ABCDEFGHIJK",
        "offset": { "AC": 1,
                    "BA": 3,  "BB": 2,
                    "CA": 5,  "CB": 4,
                    "DA": 7,  "DB": 6,
                    "EA": 9,  "EB": 8,
                    "FA": 11, "FB": 10,
                    "GA": 13, "GB": 12,
                    "HA": 15, "HB": 14,
                    "IA": 17, "IB": 16,
                    "JA": 19, "JB": 18,
                    "KA": 21, "KB": 20
        },
        "path": "composite-contours",
        "pipeline": [
            {
                "ids": [ "A" ],
                "name": "Earth core",
                "type": "layer"
            },
            {
                "children": [
                    {
                        "ids": [ "B" ],
                        "name": "t=5.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "C" ],
                        "name": "t=10.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "D" ],
                        "name": "t=15.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "E" ],
                        "name": "t=20.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "F" ],
                        "name": "t=25.0",
                        "type": "layer"
                    }
                ],
                "ids": [ "B", "C", "D", "E", "F" ],
                "name": "Contour by temperature",
                "type": "directory"
            },
            {
                "children": [
                    {
                        "ids": [ "G" ],
                        "name": "s=34.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "H" ],
                        "name": "s=35.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "I" ],
                        "name": "s=35.5",
                        "type": "layer"
                    },
                    {
                        "ids": [ "J" ],
                        "name": "s=36.0",
                        "type": "layer"
                    },
                    {
                        "ids": [ "K" ],
                        "name": "s=36.5",
                        "type": "layer"
                    }
                ],
                "ids": [ "G", "H", "I", "J", "K" ],
                "name": "Contour by salinity",
                "type": "directory"
            }
        ],
        "title": "Composite contours",
        "type": "composite-image-stack"
    },
    "name_pattern": "{time}/{theta}/{phi}/{filename}",
    "working_dir": composite-contours"
}
{% endhighlight %}

# proposed changes

Proposed changes attempt to maintain backwards compatibility while both clarifying
the data model API and enabling new features.

##1 - arguments

### files

{% highlight json %}
    "files": {
      "image": "rgb.jpg",
      "composite": "composite.json"
    },
{% endhighlight %}

Either _files_ or the old argument _filename_ is required to define the filenames of the files
to be pulled into Tonic. In the case of compositing, Tonic requires an image sprite,
_image_, and a layer ordering file, _composite_.

##3 - metadata

###fields

{% highlight json %}
    "fields": {
      "A": "temperature",
      ...
    },
{% endhighlight %}

_fields_ maintains the same format, but is to be strictly for rgb-based image color mapping.

###scalars

{% highlight json %}
    "scalars": {
      "B": "x position",
      ...
    },
{% endhighlight %}

_scalars_ is a new metadata item that uses 24-bit float-based images for interactive color mapping.
