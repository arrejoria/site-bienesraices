console.log("Map Scripts Initialized");

(function () {
  const lat = -34.6037,
    lng = -58.3816,
    map = L.map("map").setView([lat, lng], 12);
  let marker;

  //Utilize Provider and Geocoder
  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Add Pin in map
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(map);

  // Listen to pin movement on map
  marker.on("moveend", function (e) {
    marker = e.target;
    const position = marker.getLatLng();
    map.panTo(new L.latLng(position.lat, position.lng));

    // Get Streets information when the pin is released
    geocodeService
      .reverse()
      .latlng(position, 13)
      .run(function (error, result) {
        marker.bindPopup(result.address.LongLabel);
        // Set fields
        document.querySelector(".street").textContent =
          `${result?.address?.Address}` ?? "";
        document.querySelector("#street").value =
          `${result?.address?.Address}` ?? "";
        document.querySelector("#lat").value = `${result?.latlng?.lat}` ?? "";
        document.querySelector("#lng").value = `${result?.latlng?.lng}` ?? "";
      });
  });
})();
