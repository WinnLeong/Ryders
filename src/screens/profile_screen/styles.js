import { StyleSheet } from 'react-native';
let themeColor = '#2B7EFF';

export default StyleSheet.create({
  profileTopStyle: {
    backgroundColor: themeColor,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: themeColor
  },
  profileBottomStyle: { width: '90%', alignSelf: 'center', marginVertical: 20 },
  imageStyle: { height: 144, width: 144 },
  titleNameStyle: { fontSize: 24, color: '#ffffff', marginTop: 10 },
  locationStyle: { fontSize: 20, color: '#ffffff', marginTop: 10 },
  textContainer: { marginVertical: 7 },
  inputTitle: { fontSize: 16, marginBottom: 5 },
  textContent: { fontSize: 16 },
  buttonStyle: { marginTop: 20, backgroundColor: themeColor }
});
