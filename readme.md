Ride V.1.0.0
Initial Release

todo 15/1/2019

- Android clear selected location

I believe you are trying to clear the selected location.
Add a ref to GooglePlacesAutocomplete
ref={(instance) => { this.GooglePlacesRef = instance }}
and invoke the following function inside onPress() of the button
this.GooglePlacesRef.setAddressText("");

- Book now positioning

- Geolocate button

- searching for driver overlay

- Assigned driver with information overlay

- review and ratings overlay
