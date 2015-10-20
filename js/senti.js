

var map = L.map('map').setView([37.09024, -95.712891], 4);

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
      type: 'map',
      ext: 'jpg',
      subdomains: '1234'
}).addTo(map);

$( "#runQueryBtn" ).click(function() {
	var search = $( "#query" ).val().replace(/\s/g, '').replace(/[^a-z0-9]/gi,'');;
	if (search.length === 0)
		return;
	var apicall = "http://sentiment-meltingpotapp.rhcloud.com/gettweets/";
	var eastqueryurl = apicall + "east/" + search;
	var centerqueryurl = apicall + "center/" + search;
	var westqueryurl = apicall + "west/" + search;

	var spinner = new Spinner().spin();
	$( "#progress" ).append(spinner.el);

	//east
	$.ajax({
		type: 'GET',
	  	dataType: 'jsonp',
	  	jsonpCallback: 'callback',
	  	url: eastqueryurl,
	  	data: { },
	  	success:function(data){
	  		console.log(data.length);
	  	},
	  	error:function(jqxhr){
	    	console.log("No Results in east");
	  	},
	  	complete: function(data) {
	  		renderSentiment(data.responseJSON, eastMarkersList);

	    	//center
	    	$.ajax({
				type: 'GET',
			  	dataType: 'jsonp',
			  	jsonpCallback: 'callback',
			  	url: centerqueryurl,
			  	data: { },
			  	success:function(data) {
			  		console.log(data.length);
			  	},
			  	error:function(jqxhr){
			    	console.log("No Results in center");
			  	},
			  	complete:function(data){
			    	renderSentiment(data.responseJSON, centerMarkersList);

			    	//west
			    	$.ajax({
						type: 'GET',
					  	dataType: 'jsonp',
					  	jsonpCallback: 'callback',
					  	url: westqueryurl,
					  	data: { },
					  	success:function(data){
					  		console.log(data.length);
					  	},
					  	error:function(jqxhr){
					    	console.log("No Results in west");
					  	},
					  	complete:function(data) {
					  		spinner.stop();
					  		renderSentiment(data.responseJSON, westMarkersList);
					  	}
					});
			  	}
			});
	  	}
	});
});

var centerMarkersList = [];
var eastMarkersList = [];
var westMarkersList = [];
function renderSentiment(tweets, markersList) {
    if (markersList.length > 0) {
        for (var i = 0; i < markersList.length; i++) {
         	map.removeLayer(markersList[i]);
        }
    }
    if (tweets) {
    	for (var i = 0; i< tweets.length; i++) {
	        var tweet = tweets[i];
	        if (tweet.score !== undefined) {
	            var markercolor = "#DC143C";
	            if (tweet.score == 0)
	             	markercolor = "#FFFACD";
	            else if (tweet.score > 0)
	             	markercolor = "#32CD32";

	            if (tweet.location) {
	             	var icon = L.MakiMarkers.icon({color: markercolor});
	             	var pin = L.marker([tweet.location.coordinates[0], tweet.location.coordinates[1]], {icon: icon});
	             	pin.bindPopup(tweet.text).addTo(map);
	             	markersList.push(pin);
	            }
	        }
    	}
	}
}

function getColor(d) {
    return d < 0 ? '#DC143C' :
           d > 0 ? '#32CD32' :
           		   '#FFFACD' ;
}

//legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-1,0,1],
        labels = ["Negative Sentiment", "Neutral Sentiment", "Positive Sentiment"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};
legend.addTo(map);