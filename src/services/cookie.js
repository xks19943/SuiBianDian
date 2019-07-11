/**
 * Created by clude on 4/18/17.
 */

import {Platform} from 'react-native'
import GetDeviceInfo from './utils/GetDeviceInfo';
const $store = require('./store');
const $filter = require('./filter');

const SESSION_STORAGE_KEY = '_SESSION_INFO_';
const USER_STORAGE_KEY = '_USER_INFO_';
const REMEMBER_ME_STORAGE_KEY = '_REMEMBER_ME_';
const USER_AVATAR_KEY = '_USER_AVATAR_';
const USER_PHONE_KEY ='_USER_PHONE_';
const UPDATED_CHECKED_KEY ='_UPDATED_CHECKED_';
const MY_FAVORITE_OUTLETS ='_MY_FAVORITE_OUTLETS_';


class Cookie {
  constructor() {
    this.init();
  };

  init() {
    this._tokens = {
      token: null,
      expiredTime: -1,
      deviceId: null,
      csrf: null,
      userId: null
    };
    this.refreshToken = null;
    this.user = {};
    this.setUser({}, false);
  };

  setUser(user, overwriteStore = true) {
    let defaultUser = {
      id: null,
      name: null,
      avatar: false,
      companyCode: null,
      outletId: null,
      registered: false,
      signedIn: false
    };
    this.user = Object.assign(defaultUser, user);
    if (user && user.id) {
      this._tokens.userId = user.id;
    }

    if (overwriteStore) {
        $store.save(USER_STORAGE_KEY, this.user);
    }
  };

  saveToStore() {
    $store.save(SESSION_STORAGE_KEY, this._tokens);
  };

  saveAvatar(avatar){
    $store.save(USER_AVATAR_KEY,avatar);
  }

  async loadFromStore() {
      var _sessionInfo = await $store.get(SESSION_STORAGE_KEY);
      var _currentTime = (new Date()).getTime();
      Object.assign(this._tokens, _sessionInfo);
      var _user = await $store.get(USER_STORAGE_KEY);
      this.setUser(_user, false);
  };

  isEmpty() {
    return (this.csrf == null || this.token == null);
  };

  setSignedIn(isSignedIn) {
    if (this.user) {
      this.user.signedIn = isSignedIn;
    }
  };

  setToken(session, csrf) {
    this._tokens.token = session;
    this._tokens.csrf = csrf;
    //TODO:
    this.saveToStore();
  };

  async getToken() {
    try {
        if (!this._tokens.token) {
            const {token} = await $store.get(SESSION_STORAGE_KEY);
            if (token) {
                this._tokens.token = token;
            }
        }
        return this._tokens.token;
    }catch(e){

    }
  }

  setRefreshToken(token) {
    this.refreshToken = token;
    //TODO:
    $store.save(REMEMBER_ME_STORAGE_KEY, this.refreshToken);
  }

  async getRefreshToken() {
    if (!this.refreshToken) {
      const sToken = await $store.get(REMEMBER_ME_STORAGE_KEY);
      if (sToken) {
        this.refreshToken = sToken;
      }
    }
    return this.refreshToken;
  }

  getUserId() {
    if (this.userId) {
      return this.userId;
    } else if (this.user) {
      return this.user.id;
    }
  }

  setUserId(userId) {
    this.userId = userId;
    if (this.user) {
      this.user.id = userId;
    }
  };

  clear(removeRememberMe = false) {
    this.init();
    $store.delete(SESSION_STORAGE_KEY);
    $store.delete(USER_STORAGE_KEY);

    if (removeRememberMe) {
      $store.delete(REMEMBER_ME_STORAGE_KEY);
    }
  };

  isSignedIn() {
    if (this.user) {
      return this.user.signedIn;
    } else {
      return false;
    }
  };

  async getUser() {
      try{
          const user = await $store.get(USER_STORAGE_KEY);
          return user;
      }catch (e){
          $log.trace('获取用户失败');
      }

  }

  async getAvatar(){
      try {
          const avatar = await $store.get(USER_AVATAR_KEY);
          return avatar;
      }catch (e){
          $log.trace('获取头像失败');
      }

  }

  savePhone(phone){
    $store.save(USER_PHONE_KEY,phone);
  }

  /**
   * 根据账号保存用户信息
   * @param account
   * @param user
   */
  saveAvatarByAccount(account,avatar){
    $store.save(account,avatar);
  }

  /**
   * 根据账号获取用户头像
   * @param account
   * @returns {*}
   */
  async getAvatarByAccount(account){
    try {
      const avatar = await $store.get(account);
      return avatar;
    }catch (e){
      console.log('获取用户头像失败');
    }
  }

  async getPhone(){
    try {
      const phone = await $store.get(USER_PHONE_KEY);
      return phone;
    }catch (e){
      $log.trace('获取手机号码失败');
    }
  }

  /**
   * 第一次打开app显示引导图
   * type:'get'获取，'save'标记
   */
   async showGuide(stype) {
     const app_version = GetDeviceInfo.getDeviceInfo().deviceAppVersion;
     const SHOW_GRID_KEY = `SHOW_GRID_KEY_V3_${app_version}`;
     if (stype=='save') {
       $store.save(SHOW_GRID_KEY,true);
     } else {
       return await $store.get(SHOW_GRID_KEY)
     }
   }

  /**
   * 保存版本更新返回来的版本号
   * @param version
   */
  saveCheckedVersion(version){
     $store.save(UPDATED_CHECKED_KEY,version);
  }

  async getCheckedVersion(){
    try {
      const checkedVersion = await $store.get(UPDATED_CHECKED_KEY);
      if(checkedVersion){
        return checkedVersion;
      }else{
        return '1.0.0';
      }

    }catch (e){
    }
  }

  saveFavoriteOutlets(outlets){
    $store.save(MY_FAVORITE_OUTLETS,outlets);
  }

  async getFavoriteOutlets(){
    try {
      let outlets = await $store.get(MY_FAVORITE_OUTLETS);
      return outlets;
    } catch(e) {
      $log.trace('获取保存的我的关注失败');
    }
  }
  
  /**更新存储的图片*/
  async updateUserAvatar(avatar){
    try {
      let user = await $store.get(USER_STORAGE_KEY);
      user.avatar = avatar;
      this.setUser(user,true);
    }catch (e){
    }
  }

}

module.exports = new Cookie();
