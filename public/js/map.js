function initMap() {
  // Extract coordinates from the listing object
  const coordinates = listing.geometry.coordinates;
  const mapCenter = { lat: coordinates[1], lng: coordinates[0] };

  // Create a new map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: mapCenter,
  });

  // Create a marker
  const marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
  });

  // Create an info window
  const infoWindowContent = `<div class="map-click">
      <h4><b>${listing.title}</b></h4> 
      <p>Exact location will be provided after booking.</p>
      </div>`;

  const infowindow = new google.maps.InfoWindow({
    content: infoWindowContent,
  });

  // Show info window when marker is clicked
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
}