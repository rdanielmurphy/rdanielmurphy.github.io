

var map = L.map('map').setView([37.09024, -95.712891], 4);

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
      type: 'map',
      ext: 'jpg',
      subdomains: '1234'
}).addTo(map);

L.marker([37.09024, -95.712891]).addTo(map)
	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	.openPopup();
