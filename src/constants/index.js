/**
 * Created by clude on 6/13/17.
 */

var BaseStyle = require('./styles');
var lookups = require('./lookup');

module.exports = {
    Lookups: lookups,
    COLOR:  BaseStyle.COLOR,
    STYLE:  BaseStyle.STYLE,
    FONTSIZE :BaseStyle.FONTSIZE,
    ScreenWidth: BaseStyle.ScreenWidth,
    ScreenHeight: BaseStyle.ScreenHeight,
    GlobalPixelRatio: BaseStyle.GlobalPixelRatio,
	IsIOS:BaseStyle.IsIOS
};