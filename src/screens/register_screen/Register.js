import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import Styles from './styles';
import Modal from '../../components/Modal';
import {
  register,
  setOverlay,
  verifyNumber,
  setRegisterError,
  resendVerificationCode,
  setSmsError
} from '../../actions';
import { bindActionCreators } from 'redux';
let counter = 0;
let timer;

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      country_code: '+60',
      phone_number: '',
      role: '1',
      smsVerifyCode: '',
      username_error: '',
      email_error: '',
      phone_error: '',
      password_error: '',
      confirm_password_error: ''
    };
  }

  register() {
    const {
      name,
      email,
      password,
      confirm_password,
      country_code,
      phone_number,
      role
    } = this.state;

    if (name === '') {
      this.setState({ username_error: 'Username field is required.' });
      this.props.setRegisterError('');
    } else if (email === '') {
      this.setState({ email_error: 'Email field is required.' });
      this.props.setRegisterError('');
    } else if (phone_number === '') {
      this.setState({ phone_error: 'Phone number is required.' });
      this.props.setRegisterError('');
    } else if (password === '') {
      this.setState({ password_error: 'Password field is required.' });
      this.props.setRegisterError('');
    } else if (confirm_password === '') {
      this.setState({
        confirm_password_error: 'Confirm password field is required.'
      });
      this.props.setRegisterError('');
    } else if (password !== confirm_password) {
      this.setState({ confirm_password_error: 'Password is not equal' });
      this.props.setRegisterError('');
    } else {
      this.setState({
        username_error: '',
        email_error: '',
        phone_error: '',
        password_error: '',
        confirm_password_error: ''
      });

      this.props.setRegisterError('');

      this.props.register(
        name,
        email,
        password,
        confirm_password,
        country_code,
        phone_number,
        role
      );
    }
  }

  resendNewCode() {
    const { country_code, phone_number } = this.state;

    if (counter == 0) {
      this.props.resendVerificationCode(country_code, phone_number);
    } else {
      this.props.setSmsError('You cannot resend new code yet');
    }

    timer = setInterval(() => {
      counter += 1;
      if (counter === 120) {
        clearInterval(timer);
        counter = 0;
      }
    }, 1000);
  }

  smsDialog() {
    const { user_data, sms_code_error, verifyNumber, sms_overlay } = this.props;
    const { country_code, phone_number, smsVerifyCode } = this.state;

    return (
      <Modal visible={sms_overlay}>
        <View
          style={{
            width: '80%',
            marginBottom: 20,
            alignItems: 'center'
          }}
        >
          <Input
            placeholder="Enter SMS Code"
            onChangeText={value => this.setState({ smsVerifyCode: value })}
            errorStyle={{ color: 'red' }}
            errorMessage={sms_code_error}
          />
        </View>
        <View style={{ width: '40%' }}>
          <Button
            buttonStyle={{ backgroundColor: '#2B7EFF' }}
            onPress={() =>
              verifyNumber(country_code, phone_number, smsVerifyCode, user_data)
            }
            title="Submit"
          />
        </View>
        <View>
          <TouchableOpacity
            style={Styles.resendVerification}
            onPress={() => this.resendNewCode.bind(this)}
          >
            <Text style={{ fontSize: 14, color: '#2B7EFF' }}>
              Resend Verification code
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  renderOverlay() {
    const { overlayContainer, overlayButtonContainer, overlayButton } = Styles;

    return (
      <Overlay
        isVisible={this.props.overlayVisible}
        windowBackgroundColor="rgba(140, 140, 140, .5)"
        overlayBackgroundColor="#fff"
        width="80%"
        height="30%"
        overlayStyle={overlayContainer}
      >
        <Text style={{ fontSize: 20 }}>Success!</Text>
        <Text style={{ marginVertical: 10 }}>Welcome to Ryders.</Text>
        <View style={overlayButtonContainer}>
          <Button
            buttonStyle={overlayButton}
            title="Complete"
            onPress={this.completeRegistration.bind(this)}
          />
        </View>
      </Overlay>
    );
  }

  completeRegistration() {
    this.props.setOverlay(false);
    //this.props.navigation.goBack();
    this.props.navigation.navigate('App');
  }

  renderButton() {
    const { register_process } = this.props;

    if (!register_process) {
      return (
        <Button
          buttonStyle={Styles.buttonStyle}
          title="Sign up"
          onPress={this.register.bind(this)}
        />
      );
    }
    return (
      <Button
        buttonStyle={Styles.buttonStyle}
        title="Sign up"
        onPress={() => {}}
      />
    );
  }

  render() {
    const { container, inputStyle, mobileInputContainer, textStyle } = Styles;

    const {
      name,
      email,
      password,
      confirm_password,
      country_code,
      phone_number,
      username_error,
      email_error,
      phone_error,
      password_error,
      confirm_password_error
    } = this.state;

    return (
      <View style={container}>
        {this.smsDialog()}
        {this.renderOverlay()}
        <Input
          inputContainerStyle={inputStyle}
          placeholder="Username"
          onChangeText={value => this.setState({ name: value })}
          value={name}
          errorStyle={{ color: 'red' }}
          errorMessage={username_error}
        />
        <Input
          inputContainerStyle={inputStyle}
          placeholder="Email"
          onChangeText={value => this.setState({ email: value })}
          value={email}
          errorStyle={{ color: 'red' }}
          errorMessage={email_error}
        />
        <View style={mobileInputContainer}>
          <View style={{ width: '20%' }}>
            <Input
              placeholder="+60"
              onChangeText={value => this.setState({ country_code: value })}
              value={country_code}
              editable={false}
            />
          </View>
          <View
            style={{
              width: '70%',
              alignItems: 'flex-end'
            }}
          >
            <Input
              placeholder="Mobile Number"
              onChangeText={value => this.setState({ phone_number: value })}
              value={phone_number}
              keyboardType="numeric"
              errorStyle={{ color: 'red' }}
              errorMessage={phone_error}
            />
          </View>
        </View>
        <Input
          secureTextEntry
          inputContainerStyle={inputStyle}
          placeholder="Password"
          onChangeText={value => this.setState({ password: value })}
          value={password}
          errorStyle={{ color: 'red' }}
          errorMessage={password_error}
        />
        <Input
          secureTextEntry
          inputContainerStyle={inputStyle}
          placeholder="Confirm Password"
          onChangeText={value => this.setState({ confirm_password: value })}
          value={confirm_password}
          errorStyle={{ color: 'red' }}
          errorMessage={confirm_password_error}
        />
        <Text
          style={{ color: 'red', fontSize: 12, marginTop: 4, marginLeft: 5 }}
        >
          {this.props.register_error}
        </Text>

        <View style={{ width: 200 }}>{this.renderButton()}</View>

        <Text style={textStyle}>
          By signing up, you agree to our Terms of Service.
        </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ registerReducer }) => {
  const {
    register_process,
    sms_overlay,
    overlayVisible,
    user_data,
    register_error,
    sms_code_error
  } = registerReducer;

  return {
    register_process,
    sms_overlay,
    overlayVisible,
    user_data,
    register_error,
    sms_code_error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      register,
      setOverlay,
      verifyNumber,
      setRegisterError,
      resendVerificationCode,
      setSmsError
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
