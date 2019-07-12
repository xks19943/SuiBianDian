
var {$http, $log, $ui, LSN, $cookie, $store, $filter, DesignConvert} = require('../services');
var { $config } = require('../settings');
var {URL, COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio, IsIOS} = require('../constants');


// register global methods 注册最常用的全局通用方法
global.$http = $http;
global.$log = $log;
global.$cookie = $cookie;
global.$store = $store;
global.$filter = $filter;
global.DesignConvert = DesignConvert;

// broadcast center 注册全局时间中心
global.LSN = LSN;

// ui 注册ui组件
global.$ui = $ui;
// global.alert = $ui.alert;

// setting 注册配置文件
global.$config = $config;

// CONSTANT 注册全局常量
global.COLOR = COLOR;
global.STYLE = STYLE;
global.FONTSIZE = FONTSIZE;
global.URL = URL;

global.ScreenWidth = ScreenWidth;
global.ScreenHeight = ScreenHeight;
global.GlobalPixelRatio = GlobalPixelRatio;

global.salesChannel = 2;
global.companyCode = 'C1001';
global.outletId = '12110';
global.audienceId = '1022443232520601600';

global.zoneId = 2017;
global.areaId = 1013;
global.regionId = 2000;



global.getSmallDP = (dp) => {
	if (dp * GlobalPixelRatio < 1) {
			return 1.0 / GlobalPixelRatio;
	} else {
			return dp;
	}
};
global.IsIOS = IsIOS;

global.X_WIDTH = 375;
global.X_HEIGHT = 812;

global.isIphoneX = ()=> {
	return (
		IsIOS &&
		((ScreenHeight === X_HEIGHT && ScreenWidth === X_WIDTH) ||
			(ScreenHeight === X_WIDTH && ScreenWidth === X_HEIGHT))
	)
};

module.exports = {};
