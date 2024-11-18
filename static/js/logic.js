// URL to fetch the GeoJSON earthquake data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude ? magnitude * 4 : 1; // Default size for very small magnitudes
}

// Function to determine marker color based on depth
function depthColor(depth) {
  if (depth < 10) return "green";
  else if (depth < 30) return "yellow";
  else if (depth < 70) return "orange";
  else return "red";
}

// Function to create the map
function createMap(earthquakeLayer) {
  // Create the base layer (street map)
  const streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  });

  // Define baseMaps object to hold the base layer
  const baseMaps = {
    "Street Map": streetmap
  };

  // Define overlayMaps object to hold the earthquake layer
  const overlayMaps = {
    "Earthquakes": earthquakeLayer
  };

  // Create the map object
  const map = L.map("map", {
    center: [20, 0], // Set center to a global view
    zoom: 2,
    layers: [streetmap, earthquakeLayer]
  });

  // Add layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Add a legend to the map
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "info legend");
    const depths = [0, 10, 30, 70];
    const colors = ["green", "yellow", "orange", "red"];

    div.innerHTML = "<h4>Earthquake Depth (km)</h4>";
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        `<i style="background: ${colors[i]}"></i> ${depths[i]}${depths[i + 1] ? `–${depths[i + 1]}<br>` : "+"}`;
    }
    return div;
  };

  legend.addTo(map);
}

// Function to create markers and the earthquake layer
function createMarkers(data) {
  // Array to hold earthquake markers
  const earthquakeMarkers = [];

  // Loop through each feature in the GeoJSON data
  data.features.forEach(feature => {
    const coords = feature.geometry.coordinates;
    const properties = feature.properties;

    // Extract longitude, latitude, depth, and magnitude
    const [longitude, latitude, depth] = coords;
    const magnitude = properties.mag;
    const place = properties.place;

    // Create a circle marker for each earthquake
    const earthquakeMarker = L.circleMarker([latitude, longitude], {
      radius: markerSize(magnitude), // Size based on magnitude
      fillColor: depthColor(depth), // Color based on depth
      color: "#000",
      weight: 0.5,
      fillOpacity: 0.8
    }).bindPopup(`
      <h3>${place}</h3>
      <hr>
      <p><b>Magnitude:</b> ${magnitude}</p>
      <p><b>Depth:</b> ${depth} km</p>
    `);

    // Add the marker to the array
    earthquakeMarkers.push(earthquakeMarker);
  });

  // Create a layer group from the earthquake markers
  const earthquakeLayer = L.layerGroup(earthquakeMarkers);

  // Call the createMap function and pass the earthquake layer
  createMap(earthquakeLayer);
}

// Fetch the GeoJSON data and pass it to createMarkers
d3.json(url).then(createMarkers);
