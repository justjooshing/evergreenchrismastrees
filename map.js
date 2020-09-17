//Load Google Maps Location
function initMap() {
  let location = { lat: -38.042662, lng: 145.145659 };
  let map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 14,
    passive: true,
  });
  let marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}
