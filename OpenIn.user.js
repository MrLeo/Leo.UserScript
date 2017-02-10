// ==UserScript==
// @name         Open in Edge
// @namespace    https://github.com/MrLeo/Leo.UserScript
// @description  使用Edge打开当前页面
// @include      http://*
// @include      https://*
// @grant        GM_registerMenuCommand
// @updateURL    https://github.com/MrLeo/Leo.UserScript/raw/master/OpenIn.user.js
// @downloadURL  https://github.com/MrLeo/Leo.UserScript/raw/master/OpenIn.user.js
// ==/UserScript==

(function(){
    function openIn(){
        window.location.href = "Microsoft-edge:"+ window.location.href;
    }

    GM_registerMenuCommand('Open in Edge', openIn);
})();
