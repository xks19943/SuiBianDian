/**
 * Created by Ming on 2018/7/31.
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
  Keyboard
} from 'react-native';


export default class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			account: '',
			password: '',
		};
		this.updateAccount = this.updateAccount.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.toRegister = this.toRegister.bind(this);
	}

	updateAccount(account){
		this.setState({
			account: account.trim()
		})
	}

	updatePassword(password){
		this.setState({
			password: password.trim()
		})
	}


  async toRegister(){
		try {
			let {account, password} = this.state;
			if (!account || account.length < 6){
				$ui.toast('请输入六位以上账号');
				return;
			}
			if (!password || password.length < 8) {
				$ui.toast('请输入八位以上密码');
				return;
			}
      Keyboard.dismiss();
			$ui.showLoading();
			$ui.hideLoading();
      $ui.toast('注册成功');
			this.props.navigation && this.props.navigation.goBack();
		}catch(e){
			$ui.hideLoading();
			console.log(e);
		}
  }


	render() {
		let { account, password } = this.state;
		return (
			<View style={styles.container}>
				<View style={[styles.item,{marginTop:24}]}>
					<Text style={styles.itemTitle}>
						{'账号：'}
					</Text>
					<TextInput
						value={account}
						style={styles.input}
						maxLength={16}
						placeholder={'请输入六位以上账号'}
						placeholderTextColor={COLOR.grayTextColor}
						underlineColorAndroid={'transparent'}
						onChangeText={this.updateAccount}/>
				</View>

				<View style={[styles.item,{marginTop: 24}]}>
					<Text style={styles.itemTitle}>
						{'密码：'}
					</Text>
					<TextInput
						value={password}
						style={styles.input}
						maxLength={16}
						placeholder={'请输入八位以上密码'}
						placeholderTextColor={COLOR.grayTextColor}
						underlineColorAndroid={'transparent'}
						onChangeText={this.updatePassword}
						secureTextEntry={true}/>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={this.toRegister}>
					<Text style={styles.buttonTitle}>注册</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
		paddingTop: IsIOS ? 20 : 0,
	},
	item:{
		width: ScreenWidth - 32,
		alignSelf: 'center',
		flexDirection: 'row',
		height: 44,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: COLOR.primaryColor
	},
	itemTitle:{
		marginHorizontal: 16,
		fontSize: FONTSIZE.primary,
		color: COLOR.primaryTextColor,
	},
	input:{
		fontSize: FONTSIZE.primary,
		color: COLOR.normalTextColor,
		flex: 1,
		padding: 0
	},
	button:{
		alignSelf: 'center',
		marginTop: 32,
		backgroundColor: COLOR.normalColor,
		borderRadius: 10,
		minWidth: 240,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTitle: {
		fontSize: FONTSIZE.primary,
		color: COLOR.whiteColor
	},
});