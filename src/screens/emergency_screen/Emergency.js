import React, { Component } from 'react';
import { Platform, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, Card, Icon, Button, Text } from 'react-native-elements';
import { phonecall } from 'react-native-communications';
import { connect } from 'react-redux';
import Styles from './styles';

export class Emergency extends Component {
  render() {
    const { emergencyContainer, imageStyle, buttonStyle, textStyle } = Styles;
    return (
      <View style={{ flex: 1 }}>
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
            text: 'Emergency',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
        <View style={emergencyContainer}>
          <Image
            style={imageStyle}
            source={require('../../../assets/images/sos.png')}
          />
          <View>
            <Button
              buttonStyle={buttonStyle}
              title="Get Help"
              onPress={() => phonecall('999', true)}
            />
          </View>
          <Text style={textStyle}>
            You will be contacting the police for assistance.
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emergency);
