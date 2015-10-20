

var map = L.map('map').setView([37.09024, -95.712891], 4);

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
      type: 'map',
      ext: 'jpg',
      subdomains: '1234'
}).addTo(map);

$( "#runQueryBtn" ).click(function() {
	var search = $( "#query" ).val();
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
	  	beforeSend:function(){
	  	},
	  	success:function(data){
	    	renderSentiment(data, eastMarkersList);

	    	//center
	    	$.ajax({
				type: 'GET',
			  	dataType: 'jsonp',
			  	jsonpCallback: 'callback',
			  	url: centerqueryurl,
			  	data: { },
			  	beforeSend:function(){
			  	},
			  	success:function(data){
			    	renderSentiment(data, centerMarkersList);

			    	//west
			    	$.ajax({
						type: 'GET',
					  	dataType: 'jsonp',
					  	jsonpCallback: 'callback',
					  	url: westqueryurl,
					  	data: { },
					  	beforeSend:function(){
					  	},
					  	success:function(data){
					  		spinner.stop();
					    	renderSentiment(data, westMarkersList);
					  	},
					  	error:function(jqxhr){
					  		spinner.stop();
					    	alert("There was an error.  Try a different search.");
					  	}
					});
			  	},
			  	error:function(jqxhr){
			  		spinner.stop();
			    	alert("There was an error.  Try a different search.");
			  	}
			});
	  	},
	  	error:function(jqxhr){
	  		spinner.stop();
	    	alert("There was an error.  Try a different search.");
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