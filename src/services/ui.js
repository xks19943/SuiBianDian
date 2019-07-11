/**
 * Created by clude on 1/9/16.
 */
import React from 'react-native';
import {
	Alert,
  ToastAndroid
} from 'react-native';


class UI {
	constructor() {
		this.MainView = null;
	};


	setRoot(rootView){
		this.MainView = rootView;
	}

	showLoading() {
		this.MainView && this.MainView.showLoading();
	};

	hideLoading() {
		this.MainView && this.MainView.closeLoading();
	};

	toHomePage() {
		this.MainView.toHomePage()
	};

	alert(message){
		Alert.alert(
			'消息',
			message,
			[
					{text: '确定', onPress: () =>{} },
			]
		)
	};

	toast(msg) {
		if(msg && msg.length > 0){
			if(IsIOS){
				alert(msg);
			} else {
				ToastAndroid.showWithGravity(msg,ToastAndroid.SHORT,ToastAndroid.CENTER);
			}
		}
	}
}

module.exports = new UI;
