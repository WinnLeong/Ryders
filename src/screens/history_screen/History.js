import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Header,
  Card,
  Icon,
  Button,
  Text,
  Divider
} from 'react-native-elements';
import { connect } from 'react-redux';
import { getOrderHistory } from '../../actions';
import { bindActionCreators } from 'redux';
import Style from './styles';

export class History extends Component {
  constructor(props) {
    super(props);

    //this._getUserId();
  }

  _getUserId = async () => {
    try {
      const user_data = await AsyncStorage.getItem('user_data');
      const user_id = JSON.parse(user_data).result.user_id;

      this.props.getOrderHistory(user_id);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { titleStyle, titleFont, subtitleContainer, subtitle } = Style;

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
            text: 'History',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />
        {/* <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text> History Screen </Text>
        </View> */}
        <View>
          {this.props.historyReducer.map((history, i) => (
            <Card key={i}>
              <View style={titleStyle}>
                <Text style={titleFont}>{history.status}</Text>
                <Text style={titleFont}>{history.date}</Text>
              </View>
              <Divider />
              <View style={subtitleContainer}>
                <Icon
                  containerStyle={{ alignItems: 'flex-start' }}
                  name="fiber-manual-record"
                  color="blue"
                  size={20}
                />
                <Text style={subtitle}>{history.location}</Text>
              </View>
              <View style={subtitleContainer}>
                <Icon
                  containerStyle={{ alignItems: 'flex-start' }}
                  name="location-on"
                  color="red"
                  size={20}
                />
                <Text style={subtitle}>{history.destination}</Text>
              </View>
              <View style={{ marginTop: 10 }}>{history.ratings}</View>
            </Card>
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { historyReducer } = state;

  return {
    historyReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getOrderHistory }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
