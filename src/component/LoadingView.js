/**
 * Created by Ming on 2018/6/7.
 */

import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from './animation/newAnimation';
import PropTypes from 'prop-types';


export default class LoadingView extends Component {

	constructor(props){
		super(props);
		this.state = {
			isPlaying: false,
			zIndex: -1000,
			contentHeight: 0,
			windowHeight: 0
		}
	}
	static propTypes = {
		onClose: PropTypes.func.isRequired,
	};


	show(){
		if(this.state.isPlaying){
			return
		}
		this.setState({
			isPlaying: true,
			contentHeight: ScreenHeight * 0.2,
			windowHeight: ScreenHeight
		});
		this.animateView && this.animateView.play();
	}

	hide(){
		if(this.state.isPlaying){
			this.animateView && this.animateView.reset();
			this.setState({
				isPlaying: false,
				contentHeight: 0,
				windowHeight: 0
			});
		}
	}

	componentWillUnmount() {
		this.animateView && this.animateView.reset();
		this.animateView = null;
	}


	render() {
		return (
			<View style={[styles.root,{height: this.state.windowHeight}]}>
				<TouchableOpacity
					activeOpacity={1}
					style={{flex:1}}
					onPress={()=>{
						this.props.onClose && this.props.onClose();
					}}>
					<View style={{flex:1}}/>
				</TouchableOpacity>
				<View style={styles.container}>
					<LottieView
						ref={r=>this.animateView = r}
						loop={true}
						speed={2}
						style={{width: ScreenWidth * 0.3,height: this.state.contentHeight}}
						source={LoadingAnimation}/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root:{
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		zIndex: 10000,
		backgroundColor: "rgba(0, 0, 0, 0)"
	},
  container: {
    position: 'absolute',
    top: ScreenHeight * 0.4,
    left: ScreenWidth * 0.3,
    width: ScreenWidth * 0.4,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: 'center',
    alignItems: 'center'
  },
});