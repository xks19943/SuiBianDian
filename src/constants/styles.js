/**
 * Created by clude on 1/11/16.
 */

import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const COLOR = {
    primaryDarkColor:'#0097A7',
    primaryColor:'#00BCD4',
    secondaryColor:'#03A9F4',
    normalColor:'#00BCD4',
    primaryTextColor:'#333',
    normalTextColor:'#555',
    grayTextColor:'#888',
    bgColor:'#f2f2f2',
    diverColor:'#eee',
    whiteColor:'#fff',
    EMPTY: 'rgba(0,0,0,0)'
}

const FONTSIZE = {
    large:18,
    primary:16,
    normal:14,
    small:12,
};

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const GlobalPixelRatio = PixelRatio.get();
const IsIOS = Platform.OS === 'ios';
const STYLE = {
  BACKGROUND: {
    flex: 1,
    backgroundColor: COLOR.bgColor,
  },
  ROOT:{
    flex: 1,
		backgroundColor: COLOR.primaryDarkColor
  }
}

const CONST = { COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio, IsIOS}

module.exports = CONST;
