'use strict';
/**
 *
 * 通用http调用类
 * 默认情况下此类已在Global中注册， 代码中可直接调用 $http
 *
 * 演示代码
 options 参数可不传，options 默认值为
 {
    showLoading： true,   // 是否再发送请求时显示等待符;  如不需要显示，或需要定值等待则可传false
    showError: true       // 是否在出现错误时，提示错误信息;  如需要定值错误信息，则可传false
 }

 // Get请求
 $http.get(url, params, options);
 -- 例子
 $http.get('/api/name', {id: 100});
 $http.get('/api/name', {id: 100}, {showLoading: false});

 // Post请求
 $http.post(url, params, options);
 -- 例子
 $http.post('/api/name/update', {id: 100, name:'dev'});

 // Post Form请求 (此方法目前只有登录中用到，其它地方可暂时不用）
 $http.postForm(url, params, options);
 -- 例子
 $http.postForm('/api/auth', {account: 'admin', password:'123456'});

 */

var _ = require('lodash');
// var {$config} = require('../../settings');
var $config = require('../../settings/Config');
var $cookie = require('../cookie');
var $log = require('../log');
var $ui = require('../ui');
var {LSN} = require('../listeners');

var STATUS = require('./status');

var MAX_RETRIEVE_COUNT = 3;

import {Platform,DeviceEventEmitter} from 'react-native';
import GetDeviceInfo from '../../services/utils/GetDeviceInfo';

var deviceInfo = GetDeviceInfo.getDeviceInfo();



//just do nothing
var noop = () => {};

var $httpHelper = {
  wrapHostForUrl(url) {
    return ( url.indexOf('/') == 0 )? $config.api.host + url : url;
  },

  setDefaultHeaders(options) {
    var defaultHeader = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Requested-By': 'mobile',
      'X-Requested-DeviceInfo': `${Platform.OS},${deviceInfo.deviceAppVersion},${deviceInfo.deviceUId}`,
      'Accept-Language': 'zh-CN'
    }

    if (options.method && options.method.toLowerCase() != 'get') {
      options.headers = options.headers || {};
      options.headers['Accept'] =  options.headers['Accept'] || 'application/json';
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    options.headers = _.extend(defaultHeader, options.headers);
    return options;
  },

  async setAuthorizationHeader(options) {
      options.headers = options.headers || {};
      options.headers['x-csrf-token'] = $cookie.csrf;
      options.headers['X-Basebit-UserId'] = $cookie.userId;
      options.headers['X-MobileAPI-SessionToken'] = await $cookie.getToken();
      options.headers['X-MobileAPI-RememberMe'] = await $cookie.getRefreshToken() || '';
      return options;
  },

  setDefaultBody(options) {
    if (options.method && options.method.toLowerCase() != 'get') {
      options.body = options.body || {};
      if (options.headers['Content-Type'].toLowerCase() == 'application/json') {
        options.body = JSON.stringify(options.body);
      }
    }
    return options;
  },

  paramify(obj) {
    var str = '';
    for (var key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + obj[key];
    }
    return str;
  }
};

class Http {

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }else if(response.status === 404){
      throw 'api not found'
    }
    throw response;
  };

  json(response) {
    return response.json();  //attention: response.json() returns a promise but not a json object
  };


  fetchData(url, options) {
    $log.debug('$http start ', url, options.body);
    options = options ? options : {};
    options.retrieveCount = (options.retrieveCount || 0) + 1;
    options.showLoading = (options.showLoading == null)?true:options.showLoading;
    options.showError = (options.showError == null)?true:options.showError;
    options.skipToken = options.skipToken || false;
    options.skipUser = options.skipUser || false;
    options = $httpHelper.setDefaultHeaders(options);
    options = $httpHelper.setDefaultBody(options);

    url = $httpHelper.wrapHostForUrl(url);

    return new Promise(async(resolve, reject) => {
      resolve = resolve || noop;
      reject = reject || noop;

      options = await $httpHelper.setAuthorizationHeader(options);

      if(options.showLoading){
        $ui.showLoading();
      }

     /* setTimeout(()=>{
        if(options.showLoading){
          $ui.hideLoading();
        }
        var errRst = {errcode: 0, message: '连接服务器超时'};
        if(options.showError){
          $ui.toast(errRst.message);
        }
        reject(errRst);
      },15000);*/


      fetch(url, options)
        .then(this.status)
        // .then(this.json)
        .then(async response => {


          var result = await response.json();

          $log.debug('$http result ', url, result);



          // set cookie csrf and token
          $cookie.setToken(result.session, result.csrf || null);

          // set remember token if it exists
          if (response.headers && response.headers.get('x-mobileapi-rememberme')) {
            $cookie.setRefreshToken(response.headers.get('x-mobileapi-rememberme'));
          }

          // TODO: define some global solution for other status
          if(!result.errcode){
              if(options.showLoading){
                  $ui.hideLoading();
              }
            resolve(result);
          }else{
            if(_.includes([901,990,991,999],result.errcode)){
              $cookie.clear(true);
              DeviceEventEmitter.emit(LSN.SESSION_EXPIRED, result.data);
              throw '';
            }

            // var error = new Error(result.message || '');
            // error.data = result;
            // throw error;
            throw result;
            // reject(result);
          }
        }).catch(async (error) => {
          if(options.showLoading){
              $ui.hideLoading();
          }

          $log.error('$http error ', url, JSON.stringify(error));

          var errRst = {errcode: 0, message: 'error'};
          if(_.isString(error)){
            errRst = {errcode: STATUS.Exception, message: error};
          } else if (error.errcode || error.message) {
            errRst = error;
          } else {
            try {
              errRst = await error.json();
            } catch (e) {
              errRst = {errcode: STATUS.Exception, message:JSON.stringify(error)};
            }
          }
          if(options.showError){
            $ui.toast(errRst.message);
          }

          reject(errRst); //TBD
      });/*.done(()=>{
          if(options.showLoading){
              $ui.hideLoading();
          }
      })*/
    });
  };

  get(url, params, options) {
    options = options ? options : {};
    options.method = 'GET';

    if (params) {
      var getParams = $httpHelper.paramify(params);
      url += `?${getParams}`;
    }

    return this.fetchData(url, options);
  };

  post(url, data, options) {
    options = options ? options : {};
    options.method = 'POST';
    options.body = data;
    return this.fetchData(url, options);
  };


  postQuery(url, data, params, options) {
    options = options ? options : {};
    options.method = 'POST';
    options.body = data;
    if (params) {
      var getParams = $httpHelper.paramify(params);
      url += `?${getParams}`;
    }
    return this.fetchData(url, options);
  };


  postForm(url, data, options) {
    options = options || {};
    options.method = 'POST';
    options.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    options.body = $httpHelper.paramify(data);
    return this.fetchData(url, options);
  };

  delete(url, params, options) {
    options = options ? options : {};
    options.method = 'DELETE';
    if (params) {
        var getParams = $httpHelper.paramify(params);
        url += `?${getParams}`;
    }
    return this.fetchData(url, options);
  };

    /*

     put(url, data, options) {
     options = options ? options : {};
     options.method = 'PUT';
     options.body = data;
     return this.fetch(url, options);
     };

     delete(url, options) {
     options = options ? options : {};
     options.method = 'DELETE';
     return this.fetch(url, options);
     };

     patch(url, data, options) {
     options = options ? options : {};
     options.method = 'PATCH';
     options.body = data;
     return this.fetch(url, options);
     }

     */
};

module.exports = new Http;
