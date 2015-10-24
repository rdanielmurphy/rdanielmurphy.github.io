---
layout: post
title:  "Using Location in NodeJS and MongoDB"
date:   2015-10-19 15:29:45
backgroundpic: potosi_dinosaur_tracks.jpeg
imagedetails: Dinosaur Tracks Musuem, Potosi, Bolivia
categories: nodejs mongodb javascript
---

I've been slowly working on a dating app as a side project.  Android front end and NodeJs, Express, and Mongodb on the backend.  As with most dating apps, it needs to be able to filter the users by location.  Here's how I did it on the backend.

<br>

## Insert a Document with a Lat/Long field
Create a document with a Lat/Long field, 'pos' here, that has an array with two doubles as the value (longitude THEN latitude).

{% highlight html %}
self.db.collection('users').insert( {'pos' : [lon,lat], 'id' : id } );
{% endhighlight %}

<br>

## Apply Geospacial index 
This code applies a geospatial index to the 'pos' field.

{% highlight html %}
self.db.collection('users').ensureIndex( { pos : "2dsphere" } );
{% endhighlight %}

<br>

## Write get Nearest Users API call
Do a find query and use the $near, $geometry, and $maxDistance operators to get the nearest users at a position.  The API call here is just taking a Lat/Long position and a max distance (in meters) to build a circle around the point.  It returns all documents (users in our case) within that circle.

{% highlight html linenos %}
//returns all the users near a distance 
self.routes['returnNearestUsers'] = function(req, res) {
    var lat = parseFloat(req.query.lat);
    var lon = parseFloat(req.query.lon);
    var distance = parseInt(req.query.distance);

    self.db.collection('users').find( { 'pos' : 
                                            { $near : 
                                              { $geometry :
                                                { type : "Point" ,
                                                  coordinates : [ lon, lat] 
                                                },
                                                $maxDistance : distance
                                              }
                                            }
                                          }
        ).toArray(function(err, names) {
        	res.header("Content-Type:","application/json");
        	res.end(JSON.stringify(names));
    });
};
{% endhighlight %}

<br>

## Calling RESTful endpoint
API call would look something like this:

{% highlight html %}
http://......api/nearestUsers?lat=89.9034&lon=32.6556&distance=50000
{% endhighlight %}