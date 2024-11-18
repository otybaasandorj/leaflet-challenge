# leaflet-challenge

The United States Geological Survey (USGS) collects extensive data on natural hazards, ecosystems, and climate impacts to provide valuable insights about Earth's processes. However, they currently lack effective tools to visualize their global earthquake data. This challenge involves creating a visualization solution to make their data more accessible and informative, helping to educate the public, assist government organizations, and potentially secure additional funding for addressing environmental and geological issues. The project aimed to make the vast amount of earthquake data more accessible and meaningful by presenting it in a dynamic and user-friendly format. By visualizing earthquakes based on magnitude, depth, and location, the tool supports the USGS mission to inform the public and other stakeholders about seismic activity, contributing to disaster preparedness and awareness.

This visualization was developed in several steps. The USGS GeoJSON feed for all earthquakes in the past week was used as the dataset. The data was fetched dynamically using D3.js. the url is "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson". An example of the data pretty printed in json is as shows.

![json.png](https://github.com/otybaasandorj/leaflet-challenge/blob/main/Images/map/json.png)

Leaflet.js was employed to create an interactive map. Markers were added to represent earthquakes. OpenStreetMap tiles served as the base layer, and interactive controls allowed users to toggle layers and zoom in on regions of interest.

![map.png](https://github.com/otybaasandorj/leaflet-challenge/blob/main/Images/map/map.png)

The completed map effectively visualizes global earthquake activity, highlighting many things. Earthquakes are predominantly clustered along tectonic plate boundaries, particularly in seismically active regions like the Pacific Ring of Fire. Shallow earthquakes (< 10 km depth) were the most frequent. High-magnitude earthquakes (larger marker sizes) were concentrated in tectonically active zones such as the western United States, South America, and parts of Asia. The map successfully integrates depth, magnitude, and location into a cohesive and intuitive visualization, providing users with actionable insights into global seismic trends.
