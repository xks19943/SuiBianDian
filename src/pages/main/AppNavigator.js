/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import Splash from '../splash/Splash';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


const AppNavigator = createSwitchNavigator({
	Splash: {screen: Splash},
	AuthStack: {screen: AuthStack},
  AppStack: {screen: AppStack}
},{
	initialRouteName: 'Splash',
});


export default createAppContainer(AppNavigator);









