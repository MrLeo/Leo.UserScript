// ==UserScript==
// @name         Open in Edge
// @namespace    https://github.com/MrLeo/Leo.UserScript
// @version      0.1
// @description  使用Edge打开当前页面
// @author       You
// @match        http://*/*
// @match        https://*/*
// @include      http://*
// @include      https://*
// @grant        GM_registerMenuCommand
// @updateURL    https://github.com/MrLeo/Leo.UserScript/raw/master/OpenIn.user.js
// @downloadURL  https://github.com/MrLeo/Leo.UserScript/raw/master/OpenIn.user.js
// ==/UserScript==

(function() {
    'use strict';
    function open(){
        window.location.href = "Microsoft-edge:"+ window.location.href;
    }

    //在“用户脚本命令”添加命令
    GM_registerMenuCommand('Open in Edge', Open);
})();
