
// Store our API endpoint as url  
  var url = "http://localhost:8891/edit/DU_Project_3/outputMT.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });

function createFeatures(COfireData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the fire size and cause of the fire.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.FIRE_SIZE}</h3><hr><p>${(feature.properties.STAT_CAUSE_DESCR)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the COfireData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var CoFire = L.geoJSON(COfireData, {
      onEachFeature: onEachFeature
    });
  
    // Send our fire layer to the createMap function/
    createMap(CoFire);
  }  


 
  function createMap(CoFire) {
  
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      COwildfires: CoFire
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        39.113014, -105.358887
      ],
      zoom: 7,
      layers: [street, CoFire]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  