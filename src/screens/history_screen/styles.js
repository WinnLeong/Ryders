import { StyleSheet } from 'react-native';

let themeColor = '#2B7EFF';

export default StyleSheet.create({
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  titleFont: {
    fontSize: 18
  },
  subtitleContainer: { flexDirection: 'row', marginTop: 10 },
  subtitle: {
    fontSize: 16,
    marginLeft: 15
  }
});
