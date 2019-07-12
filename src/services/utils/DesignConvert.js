'use strict';

import {
    Platform,
    NativeModules,
    StatusBar,
    Dimensions,
    NativeEventEmitter,
} from 'react-native';

let c_width;// = Dimensions.get('window').width;
let c_height;// = Dimensions.get('window').height;
let c_scale;// = Dimensions.get('window').scale;
let c_fontScale;// = Dimensions.get('window').fontScale;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

const i5_WIDTH = 320;
const i5_HEIGHT = 568;

function _updateCacheConstants() {
    const dimWin = Dimensions.get('window');

    c_width = dimWin.width;
    c_height = dimWin.height;
    c_scale = dimWin.scale;
    c_fontScale = dimWin.fontScale;
}

_updateCacheConstants();

let IOS_StatusBar_Height = (() => {
    if (
        Platform.OS === 'ios' &&
        (
            (c_height === X_HEIGHT && c_width === X_WIDTH)
            || (c_height === X_WIDTH && c_width === X_HEIGHT)
            || (c_height === X_MAX_HEIGHT && c_width === X_MAX_WIDTH)
            || (c_height === X_MAX_WIDTH && c_width === X_MAX_HEIGHT)
        )
    ) {
        return 44;
    }
    return 20;
})();

//react native 目前使用的版本不存在这个属性的
// function _getMinor() {
// 	// if (
// 	// 	!NativeModules.PlatformConstants ||
// 	// 	!NativeModules.PlatformConstants.reactNativeVersion ||
// 	// 	!NativeModules.PlatformConstants.reactNativeVersion.minor
// 	// ) {
// 	// 	return 0;
// 	// }
// 	// return NativeModules.PlatformConstants.reactNativeVersion.minor;

// 	const { PlatformConstants = {} } = NativeModules;
// 	const { minor = 0 } = PlatformConstants.reactNativeVersion || {};
// 	return minor;
// }
// const minor = _getMinor();


// Dimensions.addEventListener(
// 	'change',
// 	() => {
// 		// console.warn(
// 		// 	Date.now(),
// 		// 	'========2',
// 		// 	c_height,
// 		// 	Dimensions.get('window').height,
// 		// 	DesignConvert.getStatusBarHeight(),
// 		// );

// 		_updateCacheConstants();

// 		_printParams();
// 	}
// )


if (Platform.OS === 'ios') {
    let IOS_StatusBarManager = new NativeEventEmitter(NativeModules.StatusBarManager);
    IOS_StatusBarManager.addListener(
        'statusBarFrameWillChange',
        (e) => {
            IOS_StatusBar_Height = e.height;

            _printParams();
        }
    );
    IOS_StatusBarManager._nativeModule.getHeight((e) => {
        IOS_StatusBar_Height = e.height;

        _printParams();
    });
}

const DesignConvert = {
    designWidth: 750,	//设计宽度 1X
    designHeight: 1334,	//设计高度 1X

    get swidth() {
        return c_width;
    },	//本机宽度
    get sheight() {
        return c_height;
    },	//本机高度  包含statusBar，但不包含底部的 NavigationBar(如果有)

    //实际状态栏高度
    statusBarHeight: Platform.select({
        ios: IOS_StatusBar_Height,
        android: StatusBar.currentHeight,
    }),	//状态栏高度

    onLayout(evt) {
        const height = evt.nativeEvent.layout.height + DesignConvert.getStatusBarHeight();
        if (c_height == height) return false;

        // console.warn(
        // 	Date.now(),
        // 	'========1',
        // 	c_height,
        // 	Dimensions.get('window').height,
        // 	evt.nativeEvent.layout.height,
        // 	DesignConvert.getStatusBarHeight(),
        // 	height
        // );

        // c_height = Dimensions.get('window').height;
        c_height = height;

        _printParams();

        return true;
    },

    /**
     * 获得实际显示高度
     * for android 是除去顶部的statusBar 和 和底部的 NavigationBar(如果有)
     * for ios 就是整个屏幕高度
     * @returns {Number}
     */
    getRealViewHeight() {
        // return c_height - (DesignConvert.getHeight(DesignConvert.isIPhoneX()? 22 + 45 : 45) + DesignConvert.statusBarHeight);
        if (Platform.OS === 'android') {
            return c_height - StatusBar.currentHeight;
        } else {
            return c_height;
        }

    },

    /*状态栏实际高度*/
    getStatusBarHeight() {
        if (Platform.OS === 'android') {
            return StatusBar.currentHeight;
        } else {
            return IOS_StatusBar_Height;
        }
    },

    /*宠物主页iphonex下的非安全区底部高度*/
    getIpXPetExHeight() {
        return 23;
    },
    /**
     * 宠物弹窗距离底部高度,
     */
    getPetModelHeight() {
        if (DesignConvert.isIPhoneX()) {
            return 23;
        }
        return 0;
    },
    /**
     * 是否为全面屏
     */
    isFullScreen() {
        if (DesignConvert.isIPhoneX()) {
            return true;
        }
        if ((DesignConvert.sheight / DesignConvert.swidth) >= (18 / 9)) {   //比例高于16:9为全面屏
            return true;
        }
        return false;
    },
    /**
     * 标题部分高度
     * @param {Number} t
     * @returns    {Number}
     */
    getT(t) {
        return t - 18;
    },

    /**
     * 适配宽度
     * @param {Number} w    设计宽度
     * @returns {Number}    适配宽度
     */
    getW(w) {
        // console.log((new Date().getTime()) + '===========================');
        // console.log((c_width / this.designWidth * w));
        // console.log(c_width + ' : ' + c_height);
        // console.log(this.swidth + ' : ' + this.sheight);
        // console.log(c_scale);
        // console.log(c_fontScale);
        // console.log(this.designWidth + ' : ' + this.designHeight);
        // console.log(w);
        // console.log('=======================================================');

        return c_width / this.designWidth * w;
    },

    /**
     * 适配宽度 转为 设计宽度
     * @param {Number} w    适配宽度
     * @returns {Number}    设计宽度
     */
    // revertW(w) {
    // 	return w / c_width * this.designWidth;
    // },

    /**
     * 适配值 转为 像素值
     * @param {Number} t    适配值
     * @returns {Number}    像素值
     */
    toPixel(t) {
        return t / c_width * this.designWidth * c_scale;
    },

    /**
     * 竖屏适配高度
     * @param {Number} h    设计高度
     * @returns {Number}    竖屏适配高度
     */
    getH(h) {
        // return c_height / this.designHeight * h;
        return c_width / this.designWidth * h;
    },

    /**
     * 适配高度
     * @param {Number} h    设计高度
     * @returns {Number}    适配高度
     */
    getHeight(h) {
        //return c_width / this.designWidth * h;
        return DesignConvert.getRealViewHeight() / this.designHeight * h;
    },

    /**
     * Text的lineHeight转换
     * @param {Number} h    设计高度
     * @returns {Number}    适配高度
     */
    getLineHeight(h) {
        return Math.ceil(c_width / this.designWidth * h);
    },

    /**
     * 适配字体大小
     * @param {Number} f    设计字体大小
     * @returns {Number}    本机实际字体大小
     */
    getF(f) {
        return f / 2 / c_fontScale;
    },

    /**
     * 以像素为单位
     */
    getBorderWidth(w) {
        // if (w < 1) return 1 / PixelRatio.get();
        // return w / PixelRatio.get()
        if (w < 1) return 1 / c_scale;
        return w / c_scale
    },

    getSmallDP(dp) {
        // if (dp * PixelRatio.get() < 1) {
        //     return 1.0 / PixelRatio.get();
        // } else {
        //     return dp;
        // }
        if (dp * c_scale < 1) {
            return 1.0 / c_scale;
        } else {
            return dp;
        }
    },

    // isIPhoneX1() {
    // 	const dimen = Dimensions.get('window');
    //     return (
    //         Platform.OS === 'ios' &&
    //         !Platform.isPad &&
    //         !Platform.isTVOS &&
    //         (dimen.height === 812 || dimen.width === 812)
    //     );
    // },


    isIPhoneX() {

        //react native 目前使用的版本不存在这个属性的
        // if (minor >= 50) {
        // 	return DeviceInfo.isIPhoneX_deprecated;
        // }

        return (
            Platform.OS === 'ios' &&
            (
                (c_height === X_HEIGHT && c_width === X_WIDTH)
                || (c_height === X_WIDTH && c_width === X_HEIGHT)
                || (c_height === X_MAX_HEIGHT && c_width === X_MAX_WIDTH)
                || (c_height === X_MAX_WIDTH && c_width === X_MAX_HEIGHT)
            )
        );
    },

    isIPhone5() {
        return (
            Platform.OS === 'ios' &&
            ((c_height === i5_HEIGHT && c_width === i5_WIDTH) ||
                (c_height === i5_WIDTH && c_width === i5_HEIGHT))
        );
    },

    //本机实际宽度 像素（1080p，720p）
    getResolution() {
        return c_width * c_scale;
    },

    /**
     * 获取iPhoneX的底部距离安全区域的间距
     */
    getiXHomeHeight() {
        return DesignConvert.isIPhoneX() ? DesignConvert.getH(34) : 0;
    },

    addIpxBottomHeight() {
        return DesignConvert.isIPhoneX() ? 23 : 0;
    },

    /**
     * 如果Text中包含Image，在样式中设置的width和height在安卓和苹果是完全不一样的。
     */
    getImgSizeInText(size) {
        // const imageScale = Platform.OS === 'ios' ? 1 : PixelRatio.get();
        // return DesignConvert.getW(size) * imageScale;
        const imageScale = Platform.OS === 'ios' ? 1 : c_scale;
        return DesignConvert.getW(size) * imageScale;
    },

    getVerticalMargin(size) {
        if (Platform.OS === 'ios') {
            return DesignConvert.getH(size);
        } else {
            if (size > 3) {
                return DesignConvert.getH(size - 3);
            } else {
                return DesignConvert.getH(size);
            }
        }
    }

};


export default DesignConvert;

//------------- 打印参数 -----------------------------

function _printParams() {
    console.log('本机宽高', c_width, c_height);
    console.log('本机缩放率', c_scale);
    console.log('本机字体缩放率', c_fontScale);
    console.log('本机宽度适配率', (c_width / 375));
    console.log('本机高度适配率', (c_height / 667));
    console.log('本机状态栏高度', DesignConvert.getStatusBarHeight());

    // console.log('minor', minor);//react native 目前使用的版本不存在这个属性的

    console.log('screen.width', Dimensions.get('screen').width);
    console.log('screen.height', Dimensions.get('screen').height);
    console.log('screen.scale', Dimensions.get('screen').scale);
    console.log('screen.fontScale', Dimensions.get('screen').fontScale);
}

_printParams();

//----------------------------------------------------
