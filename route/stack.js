import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from '@ui-kitten/components';
import TabNavigator from './tabs';
import AddScreen from '../screen/add';

const { Navigator, Screen } = createStackNavigator();
// const StarIcon = (props) => (
//     <Icon {...props} name='star'/>
// );

const HomeNavigator = () => {
    return (
        <Navigator>
            <Screen options={{headerShown: false, tabBarHideOnKeyboard: true}} name='Main' component={TabNavigator}/>
            <Screen name='Add' component={AddScreen}/>
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