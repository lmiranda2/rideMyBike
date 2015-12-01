var jsonPlace, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, create an JSON object
  //  that will be sent to the server in order to perform the database search.
  autocomplete.addListener('place_changed', createJSONPlace);
}

function createJSONPlace() {
  var place = autocomplete.getPlace();
  jsonPlace = place.geometry.location.toJSON();
  /*
  var json = '{';
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var value = place.address_components[i][componentForm[addressType]];
      json += '\"' + addressType + '\": \"' + value + '\"';
      if (i < place.address_components.length-1) json += ', ';
    }
  }
  //jsonPlace = JSON.parse(json + '}');
  jsonPlace = json + '}';
  */
}