import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tabs';
import AddScreen from '../screen/add';
import DeleteScreen from '../screen/delete';

const { Navigator, Screen } = createStackNavigator();
// const StarIcon = (props) => (
//     <Icon {...props} name='star'/>
// );

const HomeNavigator = () => {
    return (
        <Navigator>
            <Screen options={{headerShown: false, tabBarHideOnKeyboard: true}} name='Main' component={TabNavigator}/>
            <Screen name='Add' component={AddScreen}/>
            <Screen name='Delete' component={DeleteScreen}/>
        </Navigator>
    );
    }

const AppNavigator = () => {
    return (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>
)};

export default AppNavigator;