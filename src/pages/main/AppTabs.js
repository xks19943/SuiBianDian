import React from 'react';
import {
	createBottomTabNavigator
} from 'react-navigation';
import Shop from '../shop/Shop';
import Classify from '../classify/Classify';
import Cart from '../cart/Cart';
import Code from '../code/Code';
import My from '../my/My';
import TabIcon from '../../component/TabIcon';
import TabIconWithBadge from '../../component/TabIconWithBadge';

const isShowLine = true;

const TabNavigator = createBottomTabNavigator(
	{
		Shop: {
			screen: Shop,
			navigationOptions: {
				tabBarIcon: ({focused}) => (
					<TabIcon
						isImage={false}
						focused={focused}
						icon={'shop'}
						label={'商城'}/>
				)
			}
		},
    Classify: {
      screen: Classify,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <TabIcon
            isImage={false}
            focused={focused}
            icon={'menu'}
            label={'分类'}/>
        )
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <TabIconWithBadge
            isImage={false}
            focused={focused}
            icon={'shopping-cart'}
            label={'购物车'}/>
        )
      }
    },
    Code: {
      screen: Code,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <TabIcon
            isImage={false}
            focused={focused}
            icon={'code'}
            label={'取货'}/>
        )
      }
    },
    My: {
      screen: My,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <TabIcon
            isImage={false}
            focused={focused}
            icon={'settings'}
            label={'我的'}/>
        )
      }
    },
	},
	{
		tabBarPosition:'bottom',
		swipeEnabled:false,
		animationEnabled:false,
		scrollEnabled:false,
		initialRouteName: 'Shop',
		tabBarOptions: {
			style: {
				padding: 0,
				margin: 0,
				backgroundColor: COLOR.whiteColor,
				borderTopWidth: isShowLine?1:0,
				borderTopColor: isShowLine?COLOR.diverColor:null
			},
			indicatorStyle:{
				height:0,
			},
			iconStyle:{
				margin:0,
				padding:0,
				height:49,
				width:ScreenWidth/3
			},
			showLabel:false,
			showIcon:true,
		},
	}
);


export default TabNavigator;