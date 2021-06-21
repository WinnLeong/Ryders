import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, ListItem, Icon, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

export class AddPayment extends Component {
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
            text: 'Add Payment',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
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
            bottomDivider={true}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { paymentTypeReducer } = state;

  return {
    paymentTypeReducer
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPayment);
