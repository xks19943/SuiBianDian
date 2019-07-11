/**
 * Created by clude on 1/3/16.
 */

// require("babel-core/register");
// require("babel-polyfill");

import moment from 'moment';
import {$vx} from './utils';

var friendlyLabels = {
  SECOND: '秒前',
  MINUTE: '分前',
  HOUR:   '小时前',
  DAY:    '天前'
};

var weekDays = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];
class Filter{
  date(date, formatter){
    if(!date) return '';
    var fmt = formatter || 'YYYY年MM月DD日';
    return moment(date).format(fmt);
  };

  friendlyDate(date){
    if(!date) return '';
    return $vx.date.friendly(date, true, friendlyLabels);
  }

  formatDateToTarget(date, count=0){
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==date.getDate() + count;
    return result;
  }

  currentDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==date.getDate();
    return result;
  }

  yesterdayDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==(date.getDate()+1);
    return result;
  }

  beforeYesterdayDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==(date.getDate()+2);
    return result;
  }

  formatAstro(m, d){
    return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m*2-(d<"102223444433".charAt(m-1)- -19)*2,2) + '座';
  }


  sleep(times) {
    return new Promise((resolve,reject)=>{
      setTimeout(function () {
        resolve();
      }, times);
    });
  };

  weekDay(date,formatter){
    if(!date) return '';
    let dayOfWeek = moment(date).format('e');
    let weekDay = this.getDayOfWeekDay(dayOfWeek);
    var fmt = formatter || 'YYYY.MM.DD';
    return moment(date).format(fmt) + ' ' + weekDay;
  }

  getDayOfWeekDay(dayOfWeek){
    return weekDays[dayOfWeek];
  }

  getCurrentDay(date){
    if(!date) return '';
    return moment(date).format('D');
  }

  // + - 多少天
  calNsTime( startDate , day){
    return moment(startDate).add(day, 'days').toDate()
  }

  // + - 多少个月
  calNSMonth( startDate , month) {
    return moment(startDate).add(month, 'month').toDate()
  }

  number(num, precision, separator) {
    let parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
      // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
      // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
      // 的值变成了 12312312.123456713
      num = Number(num);
      // 处理小数点位数
      num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
      // 分离数字的小数部分和整数部分
      parts = num.split('.');
      // 整数部分加[separator]分隔, 借用一个著名的正则表达式
      parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

      return parts.join('.');

    }
    return "0";
  };

  getTimestamp(){
    return moment();
  }

  // + - 多少个月
  calNSMonth( startDate , month) {
    return moment(startDate).add(month, 'month').toDate()
  }

  getCurrentMonth(){
    return new Date().getMonth() + 1
  }

  // 数字千分返回
  toThousands(target) {
    let targets = (target + '').split('.');
    let num = (targets[0]*1 || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }

    if (targets.length == 2) { result = result + '.' + targets[1]; }
    return result;
  }

  // 201404 2014第4周
  dateToWeek(target) {
    let year = `${target}`.slice(0,4);
    let week = `${target}`.slice(4,6) * 1;
    return `${year}第${week}周`;
  }
}

module.exports = new Filter;
