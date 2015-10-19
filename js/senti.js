

var map = L.map('map').setView([37.09024, -95.712891], 4);

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
      type: 'map',
      ext: 'jpg',
      subdomains: '1234'
}).addTo(map);

L.marker([37.09024, -95.712891]).addTo(map)
	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	.openPopup();


/*
makeCorsRequest();

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
// Make the actual CORS request.
function makeCorsRequest() {
  var url = 'http://sentiment-meltingpotapp.rhcloud.com/asciimo';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    alert(text);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
*/


$.ajax({
  type: 'GET',
  dataType: 'jsonp',
  jsonpCallback: 'callback',
  url: 'http://sentiment-meltingpotapp.rhcloud.com/asciimo',
  data: { },
  beforeSend:function(){
  },
  success:function(data){
    alert(data);
  },
  error:function(){
    alert("ERROR");
  }
});
