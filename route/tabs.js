import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { Navigator, Screen } = createBottomTabNavigator();
import { BottomNavigation, BottomNavigationTab, Icon, Text } from '@ui-kitten/components';
import HomeScreen from '../screen/home';
import ListScreen from '../screen/list';

const homeIcon = (props) => (<Icon {...props} name='home'/>);
const birthdayIcon = (props) => (<Icon {...props} name='gift'/>);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='Home' icon={homeIcon}/>
      <BottomNavigationTab title='Birthdays' icon={birthdayIcon}/>
    </BottomNavigation>
  );

  const TabNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='Home' component={HomeScreen}/>
      <Screen name='List' component={ListScreen}/>
    </Navigator>
  );

// const AppNavigator = () => (
//     <NavigationContainer>
//       <TabNavigator/>
//     </NavigationContainer>
// );

//   export default AppNavigator;

export default TabNavigator;