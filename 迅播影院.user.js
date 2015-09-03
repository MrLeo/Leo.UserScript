// ==UserScript==
// @name            迅播影院
// @namespace       https://github.com/MrLeo
// @description     userscript for mr.leo
// @match           http://*xiamp4.com/*
// @include         http://*xiamp4.com/*
// @exclude 　　　　 http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/迅播影院.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/迅播影院.user.js
// @version         0.1
// ==/UserScript==

//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    //console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
}
//在head引入JQuery
;(function(){
    //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();
//*******************************************************************************************************************//
$(function(){
	$('.ndownlist').append("<textarea class=\"uri\" rows=\"10\" cols=\"20\"></textarea>");
	$('.ndownlist').find('li i input').each(function(){
		console.log($(this).val());
		
		$('.uri',$(this).closest('.ndownlist')).append($(this).val() + '\n').css({
			'width': '905px',
			'overflow': 'auto',
			'line-height': '25px',
			'word-wrap': 'break-word'
		}).select();
	});
});







