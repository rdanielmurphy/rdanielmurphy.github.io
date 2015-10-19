---
layout: page
title: SenTy
permalink: /projects/senty.html
backgroundpic: sentymap.jpg
includeLeaflet: true
---

<label for="usr">Public Sentiment Query:</label>
<div class="input-group">
   	<input type="text" class="form-control" id="query" value="Uber">
   	<span class="input-group-btn">
    	<button class="btn btn-default" id="runQueryBtn" type="button">Go!</button>
   	</span>
</div>
<br>
<div id="map" style="height: 700px;"></div>