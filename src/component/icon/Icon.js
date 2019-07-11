/**
 * Created by xiaoming on 2017/6/12.
 * 自定义的图标库  （使用自定义的图标库）
 */
import { createIconSetFromIcoMoon,createIconSet } from 'react-native-vector-icons';
import glyphMap from './iconfont.json';
const IconFont = createIconSet(glyphMap,'iconfont','iconfont.ttf');
export default IconFont;


