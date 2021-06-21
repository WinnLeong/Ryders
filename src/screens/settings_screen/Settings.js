import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, ListItem, Icon, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Styles from './styles';
import { bindActionCreators } from 'redux';

class Settings extends Component {
  handleFunction(settings) {
    if (settings.title === 'Sign Out') {
      this._signOutAsync();
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Button
              icon={<Icon name="menu" size={35} color="white" />}
              clear
              title=""
              onPress={() => this.props.navigation.openDrawer()}
              buttonStyle={{ marginLeft: 4 }}
            />
          }
          centerComponent={{
            text: 'Settings',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
        <View>
          {this.props.settingsReducer.map((settings, i) => (
            <ListItem
              key={i}
              title={settings.title}
              subtitle={settings.subtitle}
              chevron
              bottomDivider={true}
              onPress={this.handleFunction.bind(this, settings)}
            />
          ))}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { settingsReducer } = state;

  return {
    settingsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
