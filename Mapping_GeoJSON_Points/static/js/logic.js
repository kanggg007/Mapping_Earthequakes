console.log("working")


// Create the map object with center and zoon level


let map = L.map('mapid').setView([30, 30], 2);
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
});


let airportData = "https://raw.githubusercontent.com/kanggg007/Mapping_Earthquakes/Mapping_geojson/majorAirports.json";

streets.addTo(map);

d3.json(airportData).then(function(data){
    console.log(data);
    L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup();
     }
  }).addTo(map);
});