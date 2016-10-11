---
layout: post
title:  "Cesium WMS Custom Template"
date:   2016-06-04 17:31:43
backgroundpic: lapaz3.jpeg
imagedetails: La Paz, Bolivia
categories: cesium wms
excerpt:  First Cesium post.  How I figured out how to connect to a WMS service that was using a custom template
tags:
- cesium
- wms
---

# Typical WMS template

WMS services typically use the format /z/x/y (or /{znum}/{xnum}/{ynum}) to get map tiles.  The WMS service I was trying to connect to was using /x_{xnum}/y_{ynum}/z_{znum}.  

The z number is the zoom level and the x and y make up the axes of the grid of the globe.  Similar to this:  
<img src="/img/globegrid.jpeg" alt="globegrid" style="width: 90%;"/>

# Using WMS in Cesium.js

There is a neat class in Cesium called createTileMapServiceImageryProvider.js.  This will allow you to easily connect to a WMS service and it does all the work for you.  Problem is it assumes that your WMS service is using the standard format of /z/x/y.  So I modified the class to take a tilesUrlTemplate in the options object which will enable you to pass whatever you want for the format.

<br>

So I basically just added this code to the class:

{% highlight html linenos %}
if (!options.tilesUrlTemplate)
    options.tilesUrlTemplate = '{z}/{x}/{reverseY}.' + fileExtension;
var templateUrl = joinUrls(url, options.tilesUrlTemplate);
{% endhighlight %}

<br>

Then you can set the template url like so:

<br>

{% highlight html linenos %}
var viewer = new Cesium.Viewer('cesiumContainer');
var layers = viewer.imageryLayers;
var newLayer = layers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
    url : 'http://wms.url/',
    tilesUrlTemplate : "x_{x}/y_{y}/z_{z}"
}));
{% endhighlight %}

<br>

### Tags you can use in template:
{% highlight html linenos %}
{
		'{x}': xTag,
		'{y}': yTag,
		'{z}': zTag,
		'{s}': sTag,
		'{reverseX}': reverseXTag,
		'{reverseY}': reverseYTag,
		'{reverseZ}': reverseZTag
}
{% endhighlight %}


The branch is on GitHub:
[link](https://github.com/rdanielmurphy/cesium/tree/custom-tile-map-service-template-url "Read here")