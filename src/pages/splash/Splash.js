/**
 * Created by Ming on 2018/8/7.
 */

import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
	Image,
	SafeAreaView,
	StatusBar
} from 'react-native';
import Bg from '../../resource/icon/bg.png';

export default class Splash extends Component {
	componentDidMount() {
		this.timer = setTimeout(()=>{
			this.props.navigation && this.props.navigation.navigate('AppStack');
		},1000);
	}

  componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
	}

	render() {
		return (
			<Image
				source={Bg}
				style={styles.splash}/>
		)
	}
}

const styles = StyleSheet.create({
	splash: {
		width: ScreenWidth,
		height: ScreenHeight
	}
});