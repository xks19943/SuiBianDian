import React from 'react';
import {
	View
} from 'react-native';
import {
	createStackNavigator
} from "react-navigation";
import NavButton from '../../component/NavButton';
import AppTabs from './AppTabs';

const StackNavigator = createStackNavigator(
	{
		Tabs: {
			screen: AppTabs,
			navigationOptions: {
				header: null
			}
		},
	},
	{
		initialRouteName:'Tabs',
		headerMode:'screen',
		headerLayoutPreset: 'center',
    defaultNavigationOptions:({navigation}) => {
			let {state,goBack} = navigation;
			// 用来判断是否隐藏或显示header
			// console.log(navigation)
			let title = '';
			let onLeftPress;
			if(state.params){
				if(state.params.name){
					title = state.params.name   //是否显示标题
				}
				if(state.params.onLeftPress){
					onLeftPress= state.params.onLeftPress;  //是否自定义左边按钮的响应事件
				}
			}
			return {
				headerTitle: title,
				headerStyle :{
					backgroundColor: COLOR.normalColor,
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
					width: ScreenWidth
				},
				headerLeft:(
					<NavButton
						data={{
							type:'icon',
							onPress: onLeftPress
								? onLeftPress
								:()=>{
									goBack();
								}
						}}/>
				),
				headerBackTitle: null,
				headerRight:(
					<View style={{width: 54,height: 48}}/>
				),
				headerTitleStyle:{
					fontSize:FONTSIZE.large,
					color:COLOR.whiteColor,
					fontWeight:'normal'
				},
			}
		}
	}
);

export default StackNavigator;