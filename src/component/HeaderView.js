import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	rightItems: PropTypes.func, 
	leftItems: PropTypes.func,
	headerTitle: PropTypes.string,
	showShadow: PropTypes.bool,
};

const defaultProps = {
	headerTitle: '',
	showShadow: false,
};
  


const styles = StyleSheet.create({
	container: {
		width: ScreenWidth,
		height: IsIOS ? 44 : 56,
		backgroundColor: COLOR.primaryColor,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	left: {
		bottom: 0,
		left: 0,
		position:'absolute',
		height: IsIOS ? 44 : 56,
		flexDirection: 'row',
		alignItems: 'center',
	},
	right: {
		bottom: 0,
		right: 0,
		position:'absolute',
		height: IsIOS ? 44 : 56,
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		fontSize:FONTSIZE.large,
		color:COLOR.whiteColor,
		maxWidth:ScreenWidth*0.6,
		textAlign:'center'
	},
	shadow: {
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray',
		elevation:1
	}
});


export default class HeaderView extends Component {
	render() {
		let {
			leftItems,
			rightItems,
			headerTitle,
			showShadow
		} = this.props;

		let headerViewStyle = [styles.container,showShadow?styles.shadow:{}];

		return (
			<View style={headerViewStyle}>
				<View style={styles.left}>
					{leftItems && leftItems()}
				</View>
				<View style={styles.title}>
					<Text style={styles.text}
								numberOfLines={1}>{headerTitle}</Text>
				</View>
				<View style={styles.right}>
					{rightItems && rightItems()}
				</View>
			</View>
		);
	}
}
HeaderView.propTypes = propTypes;
HeaderView.defaultProps = defaultProps;