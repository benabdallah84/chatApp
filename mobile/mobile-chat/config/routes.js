import React from 'react';

import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'


let config = {headerMode:'None'}

export default AppNavigation = createAppContainer(
    createStackNavigator({
        Login: LoginScreen,
        Register: RegisterScreen,
        Home: HomeScreen
    }, config)
)