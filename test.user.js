// ==UserScript==
// @name            MyUserScript
// @namespace       http://use.i.E.your.homepage/
// @description     userscript for mr.leo
// @version         0.1
// @updateURL       ���µ�ַ��UserScript.meta.js)
// @downloadURL     ���µ�ַ��UserScript.user.js��
// @match           http://*/*
// @include         http://*/*
// @exclude         http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//���ݴ����URL����head������script����DOM����
function createScriptLink(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    console.log('������ã�' + (new XMLSerializer()).serializeToString(scriptElement));
}
//��head����JQuery
; (function () {
    //if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
})();
//*******************************************************************************************************************//