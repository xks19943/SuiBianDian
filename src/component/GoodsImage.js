/**
 * Created by Ming on 2018/6/14.
 */

import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
	Image
} from 'react-native';
import propTypes from 'prop-types';
import goods_image from '../resource/icon/icon_default_item_pic.png';

export default class GoodsImage extends Component {

	static propTypes = {
		imageUrl: propTypes.string.isRequired
	};

	constructor(props){
		super(props);
		this.state = {
			showDefault: false
		}
	}

	render() {
		return (
			<Image
				{...this.props}
				onError={(e)=>{
					console.log(e.nativeEvent.error);
					this.setState({
						showDefault: true
					})
				}}
				source={this.state.showDefault ?  goods_image :  {uri:this.props.imageUrl}}/>
		)
	}
}