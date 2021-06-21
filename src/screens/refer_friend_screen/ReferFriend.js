import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, Card, Icon, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

export class ReferFriend extends Component {
  render() {
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
            text: 'Refer a Friend',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text> Refer a Friend </Text>
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
)(ReferFriend);
