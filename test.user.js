// ==UserScript==
// @name            MyUserScript
// @namespace       http://use.i.E.your.homepage/
// @description     userscript for mr.leo
// @version         0.1
// @updateURL       更新地址（UserScript.meta.js)
// @downloadURL     更新地址（UserScript.user.js）
// @match           http://*/*
// @include         http://*/*
// @exclude         http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
}
//在head引入JQuery
; (function () {
    //if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
})();
//*******************************************************************************************************************//