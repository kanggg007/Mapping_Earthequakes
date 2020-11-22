console.log("working")


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key 
});

//Create satelliteSreee 

let satellitestreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_Key
    });

//Create map with objedt with center
let map = L.map('mapid', {
  center: [39.5,-98.50],
  zoom: 3,
  layers: [streets]
});

//Create a base layer that holds both maps

let basemap = {
    "Street": streets,
    "Satellie": satellitestreet
};
// adding third layer for the major earthquake data
let earthquakes = new L.layerGroup();
//adding a reference to the major earthquake data
let overlays ={
    Earthquakes: earthquakes
};

L.control.layers(basemap, overlays).addTo(map)


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
  //declare a function of style info
  function styleInfo(feature){
    return {
      opactity: 1,
      fillOpcaity:  1,
      fillColor: get_color(feature.properties.mag),
      color: "#000000",
      radius: get_radius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  //declare an antoher function for color 

  function get_color(magnitude){
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// decalare an another function for radius

function get_radius(magnitude){
  if (magnitude ===0){
    return 1;
  }
  return magnitude*4;
}


///
L.geoJson(data,{
  pointTolayer: function(feature, latlng){
    console.log(latlng);
    return L.circleMarker(latlng);
  },
  sytle: styleInfo,
  onEachFeature: function(feaure, layer){
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }

}).addTo(earthquakes);

earthquakes.addTo(map);

let legend = L.control({
  postion: "bottomright"
});

legend.onAdd = funciton(){
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
    return div;
};
  














legend.addTo(map);









});