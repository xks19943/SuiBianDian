/**
 * Created by Ming on 2018/8/9.
 */

import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	NativeModules
} from 'react-native';
import HeaderView from '../../component/HeaderView';
import {connect} from 'react-redux';
import * as AMapGeolocation from 'react-native-amap-geolocation';
import Permisssions from 'react-native-permissions';


class Shop extends Component {

	constructor(props){
		super(props);
		this.state = {
			currentLocation: ''
		}
	}

  componentDidMount() {
  	this.requestLocationPermissions();
  }

  async requestLocationPermissions(){
    try {
      let checkResult = await Permisssions.check('location');
      if (checkResult == 'restricted'){
        if (IsIOS){
          if (Permisssions.canOpenSettings()){
            Permisssions.openSettings();
          }
        } else {
          NativeModules.AppSetting.open();
        }
      }else if (checkResult == 'authorized'){
        this.getCurrentGeolocation();
      } else  {
        let requestResult = await Permisssions.request('location');
        if (requestResult == 'authorized'){
        	this.getCurrentGeolocation();
        }
      }
    } catch (e) {

    }
  }


  getCurrentGeolocation(){
    AMapGeolocation.init({
      ios: "c6ba016d3c96a9be703ffdffe420fb3f",
      android: "328af7186c5d26f2060c2d9fa54b6498"
    });
    AMapGeolocation.Geolocation.getCurrentPosition(res=>{
    	console.log(res,'====');
      this.setState({
        currentLocation: JSON.stringify(res)
      });
    },error => {

    });
  }








	render() {
		return (
			<SafeAreaView style={STYLE.ROOT}>
        <HeaderView
          headerTitle={'商城'}/>
				<View style={STYLE.BACKGROUND}>
					<Text>{'当前位置：' + this.state.currentLocation}</Text>
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


export default connect(
  state => state.user
)(Shop);



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2'
	}
});