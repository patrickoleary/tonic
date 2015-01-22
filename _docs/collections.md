---
layout: docs
title: Collections
prev_section: datamodel
next_section: datafiles
permalink: /docs/collections/
---

<div class="note warning">
  <h5>Collections support is unstable and may change</h5>
  <p>
    This is an experimental feature and that the API may likely change until the feature stabilizes.
  </p>
</div>

Not every data set stands on its own. Maybe you want to document a set of data products as a collection. 

Collections allow you to define a new types of applications, analysis, visualization, and interaction 
modes. These collections behave like single data products do normally, but also have their own unique 
properties and namespace.

Handling collections is the fundamental goal of the Tonic project. We want to enable comparison,
ensemble, and uncertainty analysis and visualization.

## Using Collections

### Step 1: Tell Tonic to read in your collection

Add the following to the `info.json` file in the directory containing the collection:

{% highlight json %}
  "collection": "true"
{% endhighlight %}

### Step 2: Add new Tonic collection content to your applications

More on this in the near future.