/**
 * @flow
 */

import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Login, KeyFob, Manual, LogOut } from './components'
import { Provider } from 'react-redux';
import store from './store';
import { login } from './store/actions/login';

const appTabNavigator = TabNavigator({
  "Key Fob": { screen: KeyFob },
  Manual: { screen: Manual },
  Settings: { screen: LogOut }
}
,
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state
        let iconName;
        if (routeName === 'Key Fob') {
          iconName = `ios-lock${focused ? '' : '-outline'}`;
        } else if (routeName === 'Manual') {
          iconName = `ios-albums${focused ? '' : '-outline'}`;
        }
        else {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
)

const AppNavigator = SwitchNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: appTabNavigator
  }
});

type Props = {};

export default class App extends React.Component<Props> {
  componentDidMount() {
    AsyncStorage.getItem('Auth-Token')
      .then(data => store.dispatch(login(data)));

  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

