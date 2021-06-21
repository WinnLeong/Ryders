import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Input, Icon, Text } from 'react-native-elements';
import Styles from './styles';
import { connect } from 'react-redux';
import { login, setLoginError } from '../../actions';
import { bindActionCreators } from 'redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
    email_error: '',
    password_error: ''
  };

  login() {
    const { email, password } = this.state;

    if (email !== '' && password !== '') {
      this.props.login(email, password, this.props.navigation);
      this.props.setLoginError('');
      this.setState({ email_error: '', password_error: '' });
    } else if (email === '' && password === '') {
      this.props.setLoginError('');
      this.setState({
        email_error: 'Email field is required.',
        password_error: 'Password field is required.'
      });
    } else if (email === '') {
      this.props.setLoginError('');
      this.setState({
        email_error: 'Email field is required.',
        password_error: ''
      });
    } else if (password === '') {
      this.props.setLoginError('');
      this.setState({
        email_error: '',
        password_error: 'Password field is required.'
      });
    }
  }

  renderLoginButton() {
    const { login_process } = this.props;

    if (!login_process) {
      return (
        <Button
          buttonStyle={Styles.loginButton}
          title="Sign In"
          onPress={this.login.bind(this)}
        />
      );
    }
    return (
      <Button
        buttonStyle={Styles.loginButton}
        title="Sign In"
        onPress={() => {}}
      />
    );
  }

  render() {
    const {
      container,
      appLogo,
      loginButtonContainer,
      loginInputContainer,
      loginInput,
      registerButton,
      forgetPwdButton
    } = Styles;

    const { email, password } = this.state;

    return (
      <View style={container}>
        <Image
          style={appLogo}
          source={require('../../../assets/images/ride-logo.png')}
        />

        <View style={loginInputContainer}>
          <Input
            inputContainerStyle={loginInput}
            leftIcon={<Icon name="email" size={22} />}
            placeholder="Email"
            onChangeText={value => this.setState({ email: value })}
            errorMessage={this.state.email_error}
            errorStyle={{ color: 'red' }}
            value={email}
          />

          <Input
            secureTextEntry
            inputContainerStyle={loginInput}
            leftIcon={<Icon name="lock" size={22} />}
            placeholder="Password"
            onChangeText={value => this.setState({ password: value })}
            errorMessage={this.state.password_error}
            errorStyle={{ color: 'red' }}
            value={password}
          />
          <Text
            style={{ color: 'red', fontSize: 12, marginTop: 4, marginLeft: 5 }}
          >
            {this.props.login_error}
          </Text>
        </View>

        <View style={loginButtonContainer}>
          {this.renderLoginButton()}
          <Button
            buttonStyle={registerButton}
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('Register')}
          />
          <TouchableOpacity style={forgetPwdButton}>
            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '500' }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => {
  const { login_error, login_process } = loginReducer;

  return { login_error, login_process };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, setLoginError }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
