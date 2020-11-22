console.log("working!!!!")


// Create the map object with center and zoon level

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
});


let airportData = "https://raw.githubusercontent.com/kanggg007/Mapping_Earthequakes/Mapping_geojson/Mapping_GeoJSON_Points/majorAirports.json";


let map = L.map('mapid').setView([30, 30], 2);

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

streets.addTo(map);

d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJson(data,{
        onEachFeature: function(feature, layer){
            console.log(layer);
            layer.bindPopup('<h2>' +'Airport Code: '+feature.properties.faa+'</h2><p> Airport Name: '+feature.properties.name+'</p>')
        
        }
        }).addTo(map);
})