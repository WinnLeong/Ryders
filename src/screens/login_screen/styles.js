import { StyleSheet } from 'react-native';

let themeColor = '#2B7EFF';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  appLogo: {
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 400,
    height: 199
  },
  loginButtonContainer: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  loginInputContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%'
  },
  loginInput: {
    width: 328,
    marginTop: 20
  },
  loginButton: {
    backgroundColor: themeColor,
    paddingTop: 2,
    paddingBottom: 2
  },
  registerButton: {
    backgroundColor: themeColor,
    marginTop: 20,
    paddingTop: 2,
    paddingBottom: 2
  },
  forgetPwdButton: {
    alignItems: 'center',
    marginTop: 13
  }
});
