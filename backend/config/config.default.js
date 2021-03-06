/* eslint valid-jsdoc: "off" */

'use strict';
const Crypto = require('crypto');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586423767499_5875';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    key: Crypto.randomBytes(16),
  };

  // config.cors = {
  //   origin: 'http://frontend.nodeseccode:8080',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  //   // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
  //   credentials: true,
  // };
  //
  config.security = {
    domainWhiteList: [ 'http://frontend.nodeseccode.net:8080', 'http://frontend.nodeseccode.net' ],
    csrf: {
      // 因为前后端分离，所以csrftoken放在session中，前端通过csrftoken请求来获取token
      useSession: true,
      // CSRF白名单
      ignore: ctx => ctx.request.url.startsWith('/api/csrf') || ctx.request.url.startsWith('/api/user/login'),
      headerName: 'X-CSRF-TOKEN',
    },
  };
  config.cors = {
    // origin: 'http://nodeseccode.net:8080',
    credentials: true,
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'node_sec_code',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.middleware = [ 'auth' ];
  config.auth = {
    match: '/api',
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/nodeseccode',
      options: {},
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [ createdPlugin, [ updatedPlugin, pluginOptions ] ],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
