import { StyleSheet, Platform } from 'react-native';

let themeColor = '#2B7EFF';

export default StyleSheet.create({
  card: {
    /*paddingVertical: 2,*/
    width: 340,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginHorizontal: '9%',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1
      },
      android: {
        elevation: 4
      }
    })
  },
  searchInput: {
    width: 320,
    borderBottomWidth: 0
  },
  bgColor: {
    backgroundColor: themeColor
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10
  },
  overlayContainer: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  overlayButtonContainer: {
    marginBottom: 50,
    width: '80%'
  },
  overlayButton: {
    backgroundColor: themeColor
  },
  driverDetailStyle: {
    alignItems: 'center',
    padding: 10
  },
  driverDetailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  blueColor: {
    color: themeColor
  }
});
