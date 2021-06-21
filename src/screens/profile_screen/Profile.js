import React, { Component } from 'react';
import { Platform, View, Image, AsyncStorage } from 'react-native';
import { Header, Button, Icon, Text, Input } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import Styles from './styles';
import { bindActionCreators } from 'redux';
import { updateUserProfile } from '../../actions';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editContent: false,
      user_data: '',
      username: ''
    };

    this._userDataAsync();
  }

  _userDataAsync = async () => {
    const user_data = await AsyncStorage.getItem('user_data');

    this.setState({ user_data: JSON.parse(user_data).result });
  };

  updateUser() {
    const user_id = this.state.user_data.user_id;

    if (this.state.username != '') {
      this.props.updateUserProfile(user_id, this.state.username);
    }

    this.setState({ editContent: false });
  }

  renderContent() {
    const { textContainer, inputTitle, textContent, buttonStyle } = Styles;
    const { user_data } = this.state;

    if (!this.state.editContent) {
      return (
        <View>
          <View style={textContainer}>
            <Text style={inputTitle}>Mobile Number</Text>
            <Text style={textContent}>
              {user_data.country_code} {user_data.mobileno}
            </Text>
          </View>
          <View style={textContainer}>
            <Text style={inputTitle}>Email Address</Text>
            <Text style={textContent}>{user_data.email}</Text>
          </View>
          <Button
            title="Edit"
            buttonStyle={buttonStyle}
            onPress={() => this.setState({ editContent: true })}
          />
        </View>
      );
    }
    return (
      <View>
        <View style={textContainer}>
          <Text style={inputTitle}>Username</Text>
          <Input
            inputStyle={textContent}
            onChangeText={value => this.setState({ username: value })}
            value={this.state.username}
          />
        </View>
        <Button
          title="Save"
          buttonStyle={buttonStyle}
          onPress={this.updateUser.bind(this)}
        />
      </View>
    );
  }

  render() {
    const {
      profileTopStyle,
      profileBottomStyle,
      imageStyle,
      titleNameStyle,
      locationStyle
    } = Styles;

    const { user_data } = this.state;

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
            text: 'Profile',
            style: { color: '#FFFFFF', fontSize: 20 }
          }}
          containerStyle={{
            backgroundColor: '#2B7EFF',
            paddingTop: getStatusBarHeight(),
            height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight()
          }}
        />

        <View style={profileTopStyle}>
          <Image source={{ uri: user_data.avatar }} style={imageStyle} />
          <Text style={titleNameStyle}>{user_data.username}</Text>
          <Text style={locationStyle}>{user_data.email}</Text>
        </View>
        <View style={profileBottomStyle}>{this.renderContent()}</View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserProfile }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

/*
<View style={textContainer}>
  <Text style={inputTitle}>Mobile Number</Text>
  <View style={{ flexDirection: 'row' }}>
    <View style={{ width: '20%' }}>
      <Input inputStyle={textContent} value={user_data.country_code} />
    </View>
    <View style={{ width: '70%', alignItems: 'flex-end' }}>
      <Input inputStyle={textContent} value={user_data.mobileno} />
    </View>
  </View>
</View>
<View style={textContainer}>
  <Text style={inputTitle}>Email Address</Text>
  <Input inputStyle={textContent} value={user_data.email} />
</View>
*/
