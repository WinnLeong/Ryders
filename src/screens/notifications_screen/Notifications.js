import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, Icon, ListItem, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

export class Notifications extends Component {
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
            text: 'Notifications',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
        <View>
          {this.props.notificationReducer.map((notification, i) => (
            <ListItem
              key={i}
              leftIcon={{
                name: notification.left_icon.icon_name,
                color: notification.left_icon.icon_color,
                size: notification.left_icon.icon_size
              }}
              title={notification.title}
              subtitle={notification.subtitle}
              bottomDivider={true}
            />
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { notificationReducer } = state;

  return {
    notificationReducer
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
