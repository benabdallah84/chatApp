import 'react-native-gesture-handler';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {Text} from 'react-native';

import {NativeBaseProvider} from "native-base"
import AppNavigation from './config/routes'

export default class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		isReady: false,
	  };
	}
  
	async componentDidMount() {
	  await Font.loadAsync({
		NotoFont: require('./assets/fonts/NotoKufiArabic-Regular.ttf'),
		Roboto: require('./assets/fonts/Roboto.ttf'),
		Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
		...Ionicons.font,
	  });
	  this.setState({ isReady: true });
	}
  
	render() {
	  if (!this.state.isReady) {
	// 	return <AppLoading />;
		return <Text>Not Ready</Text>
	   }
  
	   return (
			<NativeBaseProvider>
				<AppNavigation/> 
				
			</NativeBaseProvider>
			
		)

    }
}

