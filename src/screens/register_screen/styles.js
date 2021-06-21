import { StyleSheet } from 'react-native';

let themeColor = '#2B7EFF';

export default StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  inputStyle: {
    marginTop: 20
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 20
  },
  buttonStyle: {
    backgroundColor: themeColor,
    marginTop: 20,
    paddingTop: 2,
    paddingBottom: 2
  },
  overlayContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayButtonContainer: {
    width: '70%'
  },
  overlayButton: {
    backgroundColor: themeColor
  },
  textStyle: {
    marginTop: 15
  },
  resendVerification: {
    alignItems: 'center',
    marginTop: 10
  }
});
