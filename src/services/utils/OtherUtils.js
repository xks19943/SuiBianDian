/**
 * Created by liaoye on 2017/3/10.
 */

let OtherUtils = {
	/**
	 * 检查输入的价格是否合规
	 * @param money
	 * @returns {boolean}
	 */
	checkPrice(money){
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		return reg.test(money);
	},

	/**
	 * 对象的深拷贝
	 * @param source
	 * @returns {*}
	 */
	deepCopy:function (source) {
		var k, ret= source, b;
		if(source && ((b = (source instanceof Array)) || source instanceof Object)) {
			ret = b ? [] : {};
			for(k in source){
				if(source.hasOwnProperty(k)){
						ret[k] = this.deepCopy(source[k]);
				}
			}
		}
		return ret;
	},

	/**
	 * 检查是否为数值
	 * @param val
	 * @returns {boolean}
	 */
	isNumber(val){
		if(!val || isNaN(Number(val))){
			return false
		}else{
			return true
		}
	},


	/**
	 * 判断输入的值是否为正整数和0
	 * @param val
	 * @returns {boolean}
	 */
	checkInteger(val){
		var reg= /^[0-9]+$/;
		return reg.test(val)
	},

	/**
	 * 判断输入的值是否为正整数
	 * @param val
	 * @returns {boolean}
	 */
	checkIntNum(val){
		var reg = /^[0-9]*[1-9][0-9]*$/;
		return reg.test(val)
	},

	/**
	 * 将手机号码中间4位用*代替
	 * @param phone
	 * @returns {string}
	 */
	replaceStar(phone){
		return phone.substring(0,3) + '****' + phone.substring(7,11);
	},

	/**
	 * 检测密码是否为6到20位的字母或数字
	 * @param password
	 * @returns {boolean}
	 */
	checkPassword(password){
		let reg = /^[a-zA-Z0-9]{6,20}$/;
		return reg.test(password);
	},

  checkValidPhone(phone){
    let reg = /^1[0-9][0-9]\d{4,8}$/;
    return reg.test(phone)
  },


	/**
	 * 过滤是否显示的列表并且按照weight从小到大排列
	 * @param list
	 */
	sortWeightDisplayList(list){
		let newList = list.filter(function (item,index) {
			return item.display
		});
		newList.sort((a,b) => {
			return a.weight - b.weight;
		});
		return newList;
	}


};
export default OtherUtils;
