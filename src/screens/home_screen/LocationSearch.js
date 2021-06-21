import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class LocationSearch extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 30 }}>
          <Icon name="fiber-manual-record" color="blue" size={20} />
        </View>
        <GooglePlacesAutocomplete
          placeholder="Current Location"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="false" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={this.props.onPress}
          getDefaultValue={this.props.getDefaultValue}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyB4zltzteAZKBodkd_IcKvuChbgMorfFtY',
            language: 'en', // language of the results
            region: 'my'
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: 'white',
              borderBottomColor: 'white'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance'
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3'
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    );
  }
}
