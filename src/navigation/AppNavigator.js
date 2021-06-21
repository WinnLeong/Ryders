import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import AuthLoadingScreen from '../screens/auth_loading_screen/AuthLoading';
import RegisterScreen from '../screens/register_screen/Register';
import LoginScreen from '../screens/login_screen/Login';
import HomeScreen from '../screens/home_screen/Home';
import SettingsScreen from '../screens/settings_screen/Settings';
import AddPaymentScreen from '../screens/add_payment_screen/AddPayment';
import EmergencyScreen from '../screens/emergency_screen/Emergency';
import HistoryScreen from '../screens/history_screen/History';
//import ReferFriendScreen from '../screens/refer_friend_screen/ReferFriend';
import ProfileScreen from '../screens/profile_screen/Profile';
import NotificationScreen from '../screens/notifications_screen/Notifications';
import Sidebar from './Sidebar';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Profile: {
      screen: ProfileStack
    },
    AddPayment: {
      screen: AddPaymentScreen
    },
    History: {
      screen: HistoryScreen
    },
    Notifications: {
      screen: NotificationScreen
    },
    Emergency: {
      screen: EmergencyScreen
    },
    /*ReferFriend: {
      screen: ReferFriendScreen
    },*/
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    contentComponent: Sidebar,
    drawerBackgroundColor: '#2B7EFF',
    contentOptions: {
      activeTintColor: '#F9CE0B', //#EFB613
      activeBackgroundColor: '#1E62CE',
      activeLabelStyle: { fontSize: 17 },
      inactiveLabelStyle: { color: '#FFFFFF', fontSize: 17 }
    }
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitle: 'Register'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontSize: 20
      },
      headerStyle: {
        backgroundColor: '#2B7EFF'
      },
      headerTintColor: '#FFFFFF'
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: { screen: AuthLoadingScreen },
    Login: {
      screen: LoginStack
    },
    App: { screen: AppDrawerNavigator }
  },
  { initialRouteName: 'Auth' }
);

export const AppContainer = createAppContainer(AppSwitchNavigator);
