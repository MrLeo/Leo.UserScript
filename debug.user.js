// ==UserScript==
// @name            #Debug# Userscript
// @namespace       https://xuebin.me
// @version         1.0.0
// @description     This is a debug script to load userscripts from local file system. NOTICE, you need to turn on Allow access to file URLs to @require local file https://www.tampermonkey.net/documentation.php
// @author          Leo
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/debug.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/debug.user.js
// @match           http*://*
// @include         http://*
// @include         https://*
// @include         *
// @grant           GM_xmlhttpRequest
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @require         https://code.jquery.com/jquery-3.6.0.js
// @require         https://unpkg.com/dexie@latest/dist/dexie.js
// @require         https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @require         file:///Users/leo/www/Leo.UserScript/localhost.user.js
// ==/UserScript==

(function () {
  'use strict';
  console.log("debug script start here");
})();
//*******************************************************************************************************************//
// 监听AJAX请求
function listenAllAjax({ filterUrl = '', openCallback = () => { }, sendCallback = () => { }, onReadyStateChangeCallback = () => { } } = {}) {
  const reg = new RegExp(filterUrl)
  const filter = (url) => reg.test(url)

  var open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send,
      onReadyStateChange;

  function openReplacement(method, url, async, user, password) {
      // console.info('[xhr] Preparing ' + (async !== false ? 'async' : 'sync') + ' HTTP request : ' + method + ' ' + url);
      if (filter(url)) openCallback.call(this, method, url, async, user, password)
      return open.apply(this, arguments);
  }

  function sendReplacement(data) {
      // console.info('[xhr] Sending HTTP request data : ', data);
      if (this.__sentry_xhr__ && filter(this.__sentry_xhr__.url)) sendCallback.call(this, data)
      if (this.onreadystatechange) this._onreadystatechange = this.onreadystatechange;
      this.onreadystatechange = onReadyStateChangeReplacement;
      return send.apply(this, arguments);
  }

  function onReadyStateChangeReplacement() {
      // this.readyState === XMLHttpRequest.DONE && console.info('[xhr] HTTP request ready state changed : ', this);
      if (filter(this.responseURL) && this.readyState === XMLHttpRequest.DONE && this.status === 200) onReadyStateChangeCallback.call(this, this.responseText)
      if (this._onreadystatechange) return this._onreadystatechange.apply(this, arguments);
  }

  window.XMLHttpRequest.prototype.open = openReplacement;
  window.XMLHttpRequest.prototype.send = sendReplacement;
}
//*******************************************************************************************************************//
// 安装NPM包
async function npmInstall(originName) {
  const name = originName.trim();

  // 三种引入方式
  // 如果是一个有效的URL，直接通过<script />标签插入
  if (/^https?:\/\//.test(name)) return await injectScript(name);

  // 如果指定了版本，尝试使用unpkg加载
  if (name.indexOf('@') !== -1) return await injectScript(`https://unpkg.com/${name}`);

  // 否则，尝试使用cdnjs搜索
  const searchPromise = await fetch(
      `https://api.cdnjs.com/libraries?search=${name}`,
      { referrerPolicy: 'no-referrer' } // 不显示referrer的任何信息在请求头中
  );
  const { results, total } = await searchPromise.json();
  if (total === 0) {
      console.error('Sorry, ', name, ' not found, please try another keyword.');
      return;
  }
  // 取结果中最相关的一条
  const { name: exactName, latest: url } = results[0];
  if (name !== exactName) {
      console.log(name, ' not found, import ', exactName, ' instead.');
  }
  // 通过<script />标签插入
  return await injectScript(url);
}
//*******************************************************************************************************************//
// 在页面中插入<script />标签
function injectScript(url) {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
          console.log(url, ' 安装成功。');
          resolve(url);
      };
      script.onerror = () => {
          console.log(url, ' 安装失败。');
          reject(url);
      };
      document.body.appendChild(script);
      // document.body.removeChild(script);
  })
}
