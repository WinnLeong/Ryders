import React from 'react';
import { Platform } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default ({ navigation, title }) => {
  return (
    <Header
      leftComponent={
        <Button
          icon={<Icon name="menu" size={35} color="white" />}
          clear
          title=""
          onPress={() => navigation.openDrawer()}
          buttonStyle={{ marginLeft: 4 }}
        />
      }
      centerComponent={{
        text: title,
        style: { color: '#FFFFFF', fontSize: 20 }
      }}
      containerStyle={{
        backgroundColor: '#2B7EFF',
        paddingTop: getStatusBarHeight(),
        height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
      }}
    />
  );
};
