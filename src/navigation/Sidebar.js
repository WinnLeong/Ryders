import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';
import { Text } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';
import Styles from './styles';

const { topSidebarStyle, sidebarImage } = Styles;

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar:
        'http://www.futuredigitaltechnology.com/images/myprofile/person.png',
      username: ''
    };

    this._userDataAsync();
  }

  _userDataAsync = async () => {
    const user_data = await AsyncStorage.getItem('user_data');

    this.setState({
      username: JSON.parse(user_data).result.username,
      avatar: JSON.parse(user_data).result.avatar
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={topSidebarStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Image source={{ uri: this.state.avatar }} style={sidebarImage} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            {this.state.username}
          </Text>
        </View>
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
