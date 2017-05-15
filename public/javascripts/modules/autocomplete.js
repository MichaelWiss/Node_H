function autocomplete(input, latInput, lngInput) {
    console.log(input, latInput, lngInput);
    if(!input) return; 
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.add.Listener('place_changed', () => {
       const place = dropdown.getPlace();
       console.log(place);
       latInput.value = place.geometry.location.lat();
       lngInput.value = place.geometry.location.lng();
    });
}

export default autocomplete;