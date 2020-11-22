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


let TorontNeighbothoodData = "https://raw.githubusercontent.com/kanggg007/Mapping_Earthequakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

let map = L.map('mapid').setView([30, 30], 2);

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

streets.addTo(map);

d3.json(TorontNeighbothoodData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
      onEachFeature: function(feature, layer){
          layer.bindPopup("<h3> Neighboorhood:" + feature.properties.AREA_NAME + "</h3>")}
  }).addTo(map);
});