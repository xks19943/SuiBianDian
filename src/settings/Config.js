/**
 * Created by clude on 6/13/17.
 */

const ENV = {
	DEVELOP: 'dev',
	UAT: 'uat',
	PRODUCT: 'prd',
}

var env = ENV.UAT;

const base_config = {
	version: 'api',
	api: {
		host: ''
	},
	appVersion: '1.0'
}

const dev = {
	env: ENV.DEVELOP,
	api: {
		host: `http://localhost:3001/guide/${base_config.version}`
	},
	imageHost: 'https://3y.api.yoorstore.cn',
	h5Host: 'https://qa.wx.yoorstore.com',
}

const uat = {
	env: ENV.UAT,
	api: {
		host: `https://3y.api.yoorstore.cn/3y-cvs/${base_config.version}`
	},
	imageHost: 'https://3y.api.yoorstore.cn',
	h5Host: 'https://ysd-qa.wx.yoorstore.com',
}

const prd = {
	env: ENV.PRODUCT,
	api: {
		host: `https://3y.api.yoorstore.com/3y-cvs/${base_config.version}`
	},
	imageHost: 'https://3y.api.yoorstore.com',
	h5Host: 'https://nsp.wx.yoorstore.com',
}

const getConf = function(){
  switch (env) {
    case ENV.DEVELOP:
      return Object.assign(base_config, dev);
    case ENV.UAT:
      return Object.assign(base_config, uat);
    case ENV.PRODUCT:
      return Object.assign(base_config, prd);
  }
}

const configuration = getConf();
module.exports = configuration;
