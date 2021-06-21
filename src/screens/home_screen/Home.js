import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import {
  Button,
  Icon,
  Text,
  ListItem,
  Overlay,
  Rating
} from 'react-native-elements';
import Header from '../../components/Header';
import { MapView, Location, Permissions } from 'expo';
import Styles from './styles';
import {
  saveUserCoord,
  assignDriver,
  setAssignDriverStatus,
  getNearest
} from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocationSearch from './LocationSearch';
import DestinationSearch from './DestinationSearch';
import MapViewDirections from '../../react-native-maps-directions/MapViewDirections';
import { phonecall } from 'react-native-communications';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      userCoord: {
        latitude: 0,
        longitude: 0
      },
      destCoord: {
        latitude: 0,
        longitude: 0
      },
      locationAddress: '',
      order: {
        renderSearch: true,
        renderBookNowState: false,
        locateDriver: false,
        reviewAndRatings: false,
        loadDriverDetail: false
      },
      assignDriver: {
        message: 'Locating Driver...',
        cancelButton: true
      },
      drawPolyline: '',
      destinationMarker: '',
      distance: '',
      duration: '',
      fare: '',
      currentLocationButton: true,
      followsUserLocation: false
    };

    this._getLocationAsync();
  }

  static navigationOptions = {
    header: null
  };

  /*static navigationOptions = {
    headerTitle: 'Ride',
    headerTitleStyle: {
      color: '#FFFFFF',
      fontSize: 20
    },
    headerLeft: (
      <Button
        icon={<Icon name="menu" size={35} color="white" />}
        clear
        title=""
        onPress={() => this.props.navigation.openDrawer()}
        buttonStyle={{
          marginLeft: 4
        }}
      />
    ),
    headerStyle: {
      backgroundColor: '#2B7EFF'
    }
  };*/

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') alert('Permission to access location was denied');

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.922 / 40,
      longitudeDelta: 0.0421 / 40
    };

    let userCoord = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    this.setState({
      region,
      userCoord
    });

    this.props.saveUserCoord(
      location.coords.latitude,
      location.coords.longitude
    );

    // this.props.getNearest(location.coords.latitude, location.coords.longitude);

    this._reverseGeocode();
  };

  _reverseGeocode = async () => {
    const { user_coord } = this.props;
    let location = {
      latitude: user_coord.userLat,
      longitude: user_coord.userLng
    };

    let reverseGeocodeAddress = await Location.reverseGeocodeAsync(location);
    let locationAddress = `${reverseGeocodeAddress[0].street}, ${
      reverseGeocodeAddress[0].postalCode
    }, ${reverseGeocodeAddress[0].city}`;
    this.setState({ locationAddress });
  };

  //Called when user sets new current location
  _geocodeLocation = async address => {
    let geocodeAddress = await Location.geocodeAsync(address);
    let locationCoord = geocodeAddress[0];

    this.setState({
      region: {
        latitude: locationCoord.latitude,
        longitude: locationCoord.longitude,
        latitudeDelta: 0.922 / 40,
        longitudeDelta: 0.0421 / 40
      },
      userCoord: {
        latitude: locationCoord.latitude,
        longitude: locationCoord.longitude
      }
    });

    this.props.saveUserCoord(locationCoord.latitude, locationCoord.longitude);
  };

  //Called when user sets destination location
  _geocodeDestination = async address => {
    let geocodeAddress = await Location.geocodeAsync(address);
    let destinationCoord = geocodeAddress[0];

    let destCoord = {
      latitude: destinationCoord.latitude,
      longitude: destinationCoord.longitude
    };

    this.setState({
      destCoord,
      order: {
        renderSearch: false,
        renderBookNowState: true
      },
      currentLocationButton: false
    });

    this.drawPolyline();
  };

  currentLocationButton() {
    if (this.state.currentLocationButton) {
      return (
        <View
          style={{
            position: 'absolute',
            right: 20,
            bottom: 40,
            backgroundColor: 'white',
            padding: 7,
            opacity: 0.7,
            borderRadius: 3
          }}
        >
          <Icon name="gps-fixed" size={22} onPress={this._getLocationAsync} />
        </View>
      );
    }
    return <View />;
  }

  drawPolyline() {
    this.setState({
      drawPolyline: (
        <MapViewDirections
          origin={this.state.userCoord}
          destination={this.state.destCoord}
          apikey="AIzaSyB4zltzteAZKBodkd_IcKvuChbgMorfFtY"
          strokeWidth={5}
          strokeColor="#2B7EFF"
          onReady={result => {
            this.setState({
              distance: `${Math.round(result.distance)} km`,
              duration: `${Math.round(result.duration)} min`
            });

            this.calcFare(result);
          }}
        />
      ),
      destinationMarker: <MapView.Marker coordinate={this.state.destCoord} />
    });
  }

  calcFare(result) {
    const BASE_FARE = 2;
    const COST_PER_KM = 0.8;
    const COST_PER_MIN = 0.2;
    let distance = Math.round(result.distance * 100) / 100;
    let duration = Math.round(result.duration);

    let fare = BASE_FARE + COST_PER_MIN * duration + COST_PER_KM * distance;

    // with 2 decimals
    //this.setState({ fare: (Math.round(fare * 10) / 10).toFixed(2) });
    this.setState({ fare: Math.round(fare) });
  }

  renderBookNow() {
    const { card, bgColor } = Styles;

    if (this.state.order.renderBookNowState) {
      //console.log('renderBookNowState: ' + this.state.order.renderBookNowState);

      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 30
          }}
        >
          <View style={card}>
            {this.props.paymentTypeReducer.map((payment, i) => (
              <ListItem
                key={i}
                leftIcon={{
                  name: payment.left_icon,
                  type: payment.icon_type,
                  color: payment.icon_color,
                  size: 40
                }}
                title={payment.payment_type}
                chevron
              />
            ))}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 15
              }}
            >
              <Text>{this.state.distance}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                MYR {this.state.fare}
              </Text>
              <Text>{this.state.duration}</Text>
            </View>
            <View
              style={{
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingBottom: 20
              }}
            >
              <Button
                buttonStyle={bgColor}
                title="BOOK Now"
                onPress={() => {
                  //The actual intended method for assigning
                  this.props.getNearest(
                    this.state.userCoord.latitude,
                    this.state.userCoord.longitude
                  );
                  // Assign driver for order
                  setTimeout(
                    () =>
                      this.setState({
                        order: { loadDriverDetail: true, locateDriver: false }
                      }),
                    5000
                  );

                  this.setState({
                    order: {
                      renderSearch: '',
                      renderBookNowState: false,
                      locateDriver: true
                    }
                  });
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  locateDriver() {
    const { overlayContainer, overlayButtonContainer } = Styles;

    return (
      <Overlay
        isVisible={this.state.order.locateDriver}
        windowBackgroundColor="rgba(140, 140, 140, .5)"
        overlayBackgroundColor="#fff"
        overlayStyle={overlayContainer}
        fullScreen
      >
        <View
          style={{
            width: 300,
            height: 300,
            borderRadius: 300 / 2,
            borderColor: '#27E2A4',
            borderWidth: 12
          }}
        >
          <View
            style={{
              borderColor: '#33FFFF',
              borderWidth: 12,
              width: '100%',
              height: '100%',
              borderRadius: 300 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {this.state.assignDriver.message}
            </Text>
          </View>
        </View>
        <View style={overlayButtonContainer}>{this.cancelOrderButton()}</View>
      </Overlay>
    );
  }

  // Cancel processing order
  cancelOrderButton() {
    if (this.state.assignDriver.cancelButton) {
      return (
        <Button
          buttonStyle={Styles.bgColor}
          title="Cancel"
          onPress={() => {
            this.setState({
              order: {
                renderSearch: true,
                locateDriver: false
              },
              drawPolyline: '',
              destinationMarker: '',
              currentLocationButton: true
            });
          }}
        />
      );
    }
  }

  driverDetail() {
    const { card, driverDetailStyle, driverDetailText, blueColor } = Styles;

    if (this.state.order.loadDriverDetail) {
      //console.log('loadDriverDetail: ' + this.state.order.loadDriverDetail);

      setTimeout(() => {
        this.setState({ order: { loadDriverDetail: false } });
      }, 5000);

      setTimeout(() => {
        this.setState({
          order: { reviewAndRatings: true },
          drawPolyline: '',
          destinationMarker: ''
        });
      }, 10000);

      return (
        <View style={{ position: 'absolute', left: 0, bottom: 30 }}>
          <View style={[card, driverDetailStyle]}>
            <Icon name="person" size={120} />
            <Text style={driverDetailText}>Mohd. Alif</Text>
            <Text style={driverDetailText}>PJY 4822</Text>
            <TouchableOpacity onPress={() => phonecall('0142915876', true)}>
              <Text style={[driverDetailText, blueColor]}>014-2915876</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return <View />;
  }

  reviewAndRatings() {
    const { bgColor, overlayContainer, driverDetailText } = Styles;

    return (
      <Overlay
        isVisible={this.state.order.reviewAndRatings}
        windowBackgroundColor="rgba(140, 140, 140, .5)"
        overlayBackgroundColor="#fff"
        width="80%"
        height="40%"
        overlayStyle={overlayContainer}
        onBackdropPress={() => {
          this.setState({
            order: { renderSearch: true, reviewAndRatings: false },
            currentLocationButton: true
          });
        }}
      >
        <Icon name="person" size={100} />
        <Text style={driverDetailText}>Mohd. Alif</Text>
        <Rating
          type="star"
          startingValue={0}
          imageSize={25}
          onFinishRating={this.ratingCompleted}
        />
        <View style={{ width: '90%' }}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            maxLength={140}
            placeholder="Tell us what you think."
            style={{ borderColor: '#4e4f51', borderWidth: 1 }}
          />
        </View>
        <View style={{ width: '60%' }}>
          <Button
            title="Submit"
            buttonStyle={bgColor}
            onPress={() =>
              this.setState({
                order: { renderSearch: true, reviewAndRatings: false },
                currentLocationButton: true
              })
            }
          />
        </View>
      </Overlay>
    );
  }

  ratingCompleted(rating) {
    //console.log('Rating: ' + rating);
  }

  renderLocationSearch(bool) {
    if (bool) {
      return (
        <LocationSearch
          onPress={(data, details = null) => {
            this._geocodeLocation(data.description);
          }}
          getDefaultValue={() => this.state.locationAddress}
        />
      );
    }
    return (
      <LocationSearch
        onPress={(data, details = null) => {
          this._geocodeLocation(data.description);
        }}
        getDefaultValue={() => ''}
      />
    );
  }

  renderSearch() {
    const { card, backButton } = Styles;

    if (this.state.order.renderSearch) {
      return (
        <View style={card}>
          {this.state.locationAddress !== '' && this.renderLocationSearch(true)}
          {this.state.locationAddress === '' &&
            this.renderLocationSearch(false)}
          <View
            style={{
              width: '100%',
              borderBottomColor: '#5D5D5D',
              borderBottomWidth: 0.7
            }}
          />
          <DestinationSearch
            onPress={(data, details = null) => {
              this._geocodeDestination(data.description);
            }}
          />
        </View>
      );
    } else if (this.state.order.renderSearch === false) {
      //Cancel button
      return (
        <Icon
          raised
          name="chevron-left"
          size={20}
          onPress={() =>
            this.setState({
              order: { renderSearch: true, renderBookNowState: false },
              drawPolyline: '',
              destinationMarker: '',
              currentLocationButton: true
            })
          }
          style={backButton}
        />
      );
    } else {
      return <View />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Ryders" />

        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={this.state.followsUserLocation}
            showsMyLocationButton={false}
            rotateEnabled={false}
            provider={MapView.PROVIDER_GOOGLE}
          >
            {this.state.drawPolyline != '' ? this.state.drawPolyline : <View />}
            {this.state.destinationMarker != '' ? (
              this.state.destinationMarker
            ) : (
              <View />
            )}
          </MapView>
          <MapView.Callout>{this.renderSearch()}</MapView.Callout>
          {this.currentLocationButton()}
          {this.renderBookNow()}
          {this.locateDriver()}
          {this.driverDetail()}
          {this.reviewAndRatings()}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { paymentTypeReducer } = state;
  const { user_coord } = state.coordinateReducer;
  const { assigned_driver } = state.orderReducer;

  return { paymentTypeReducer, user_coord, assigned_driver };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveUserCoord,
      assignDriver,
      setAssignDriverStatus,
      getNearest
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

//customMapStyle={mapStyle}
//provider={MapView.PROVIDER_GOOGLE}
//text.Object.description
