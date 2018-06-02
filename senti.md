---
layout: page
title: SenTy
permalink: /projects/senty.html
backgroundpic: sentymap.jpg
includeLeaflet: true
---

SenTy uses sentiment analysis and social media platforms like Twitter to find positive, neutral, and negative sentiments across the US based on various topics.  Type in a company name, a sports team name, a person's name, even a food and find what the current sentiment of the subject is.  The possibilities really are endless.  

On the backend, SenTy grabs geolocated social media posts inside the continental US that fit the search criteria, and runs sentiment analysis on them.  Then once that's finished, returns it for the frontend to render it on a map.  


### Tech
The backend server is using NodeJs, HP Haven Big Data analytics platform to perform sentiment analysis, and Twitter API to get geolocated tweets inside the continental US.  The frontend is using Leaflet and OpenStreetMap to display the results on a map.

### Future
To improve the tool, more social media platforms could be leveraged.  Currently it only shows tweets from the last 7 days since that's all the Twitter API allows, but it would become a very powerful tool if it could get tweets from further in the past.  Then it could show trends over time, perhaps in a heat map visualization.

<br>
<br>
<br>
<label>Public Sentiment Query:</label>
<div class="input-group">
   	<input type="text" class="form-control" id="query" value="Uber">
   	<span class="input-group-btn">
    	<button class="btn btn-default" id="runQueryBtn" type="button">Go!</button>
   	</span>
</div>
<br>
<div id="map" style="height: 700px;">
    <div id="progress"></div>
</div>

<br>
<br>

