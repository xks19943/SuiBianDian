/**
 * Created by Ming on 2018/8/9.
 */

import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import HeaderView from '../../component/HeaderView';

export default class Shop extends Component {
	render() {
		return (
			<SafeAreaView style={STYLE.ROOT}>
				<View style={STYLE.BACKGROUND}>
					<HeaderView
						headerTitle={'商城'}/>
					<Text>Shop</Text>
					<TouchableOpacity
            onPress={()=>{
            	this.props.navigation && this.props.navigation.navigate('AuthStack')
            }}>
            <Text>退出登录呀</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2'
	}
});