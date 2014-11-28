// ==UserScript==
// @name        	喜马拉雅
// @description 	喜马拉雅专辑列表浏览记录添加Cookie记录
// @namespace   	http://use.i.E.your.homepage/
// @match       	http://www.ximalaya.com/*
// @include     	http://www.ximalaya.com/*
// @require     	http://code.jquery.com/jquery-latest.js
// @require			http://raw.githubusercontent.com/carhartl/jquery-cookie/master/src/jquery.cookie.js
// @version      	0.1
// ==/UserScript==
// @updateURL       
// @downloadURL     

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
    //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();

//*******************************************************************************************************************//

$(function () {
    //获取url中的音频主页id
    //url = location.href;
    //key = url.replace(/http:.*#?\/(\d+)\/.*/gmi,'$1');
    key = location.href;
    console.log("指定Cookie的Key：" + key);

    //获取 Cookie
    var sound = $.cookie(key);

    //页面初始化，为专辑设置红色边框
    $album = $('.album_soundlist');
    $album.find('li[sound_id=' + sound + ']').addClass('focus').css('border', '1px solid red');

    //专辑
    var AlbumFunc = function () {
        //重新获取专辑
        $album = $('.album_soundlist');
        if ($album.length > 0) {
            key = location.href;
            sound = $.cookie(key);//根据Cookie键获取值
            console.log("根据Cookie的键：" + key + "，获取值SoundID：" + sound);
            var sound_id = parseInt($album.find('li[class="focus"]').attr('sound_id'));//获取当前页面中被激活的音频
            console.log("当前页面被激活的SoundID：" + sound_id);
            if (typeof sound != "undefined") {
                if (!isNaN(sound_id)) {
                    $album.find('li[sound_id!=' + sound_id + ']').css('border', '0');
                    $album.find('li[sound_id=' + sound_id + ']').css('border', '1px solid red');
                    $.cookie(key, sound_id, { expires: 30 });
                    console.log("设置Cookie，Key：" + key + ",Value：" + sound_id);
                } else {
                    $album.find('li[sound_id=' + sound + ']').addClass('focus').css('border', '1px solid red');
                }
            } else {
                if (!isNaN(sound_id)) {
                    $.cookie(key, sound_id, { expires: 30 });
                    console.log("初次设置Cookie，Key：" + key + ",Value：" + sound_id);
                }
            }
        }
    };

    //定时循环
    setInterval(function soundCookie() {
        AlbumFunc();
    }, 1000);
})
