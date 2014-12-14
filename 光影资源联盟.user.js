// ==UserScript==
// @name       		光影资源联盟
// @namespace  		http://use.i.E.your.homepage/
// @version    		0.1
// @description  	光影资源联盟链接优化显示
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/光影资源联盟.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/光影资源联盟.user.js
// @match			http://www.etdown.net/*
// @include			http://www.etdown.net/*
// @require     	http://code.jquery.com/jquery-latest.js
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

$(function () {
    var $side1 = $('#side1');
    var $inputs = $side1.find('input[type="checkbox"]');
    $inputs.each(function () {
        var url = $(this).val();
        var $top = $(this).closest('li');
        $top.append('<input type="text" value="' + url + '" style="width:100%;">');
    });
    $('input[type="text"]').focus(function () { $(this).select(); });
});




