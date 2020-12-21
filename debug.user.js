// ==UserScript==
// @name            Debug Userscript
// @namespace       https://xuebin.me
// @version         0.1
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
// @require         https://unpkg.com/dexie@latest/dist/dexie.js
// @require         file:///Users/leo/www/Leo.UserScript/localhost.user.js
// ==/UserScript==

(function () {
  'use strict';

  console.log("debug script start here");
  // Your code here...
})();
