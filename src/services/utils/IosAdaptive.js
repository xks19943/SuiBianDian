import {Platform} from 'react-native';

let info = {
	scrollViewContentInset: ()=>{
		let contentInset = {top: 0, left: 0, bottom: 0, right: 0}
		if (parseFloat(Platform.Version)>=11) {
			contentInset.top = -20;
		}
		return contentInset;
	}
}
export default info