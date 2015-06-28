// ==UserScript==
// @name        	Mr.Leo 
// @namespace   	https://raw.githubusercontent.com/MrLeo/Leo.UserScript/master/Mr.Leo.js
// @description 	userscript for mr. leo
// @match       	*
// @include     	*
// @require     	http://code.jquery.com/jquery-latest.js
// @require		    http://jeromeetienne.github.io/jquery-qrcode/src/jquery.qrcode.js
// @require		    http://jeromeetienne.github.io/jquery-qrcode/src/qrcode.js
// @updateURL		https://raw.githubusercontent.com/MrLeo/Leo.UserScript/master/Mr.Leo.js
// @downloadURL		https://raw.githubusercontent.com/MrLeo/Leo.UserScript/master/Mr.Leo.js
// @version      	0.1
// ==/UserScript==
//http://userscripts.org:8080/scripts/edit_src/175449

//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
    return false;
}
//在head引入JQuery
; (function () {
    //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof window.jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();
//*******************************************************************************************************************//
//页面右下角生成地址二维码
$(function () {
    createScriptLink('//jeromeetienne.github.io/jquery-qrcode/src/jquery.qrcode.js');
    createScriptLink('//jeromeetienne.github.io/jquery-qrcode/src/qrcode.js');

    var css = '<style>';
    css += '#QRcode,#QRcode_hover,#gotop{width:36px;height:48px;background:url(http://www.17sucai.com/preview/1093/2013-08-22/%E6%88%91%E5%96%9C%E6%AC%A2%E5%8F%B3%E4%BE%A7%E5%BE%AE%E4%BF%A1%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/images/icon.png) no-repeat;position:fixed;right:50px;cursor:pointer;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}';
    css += '#QRcode{background-position:-276px -258px;bottom:120px;_margin-bottom:120px;}';
    css += '#QRcode_hover{background-position:-316px -258px;bottom:120px;_margin-bottom:120px;}';
    css += '#gotop{background-position:-276px -310px;bottom:67px;_margin-bottom:67px;} ';
    css += '#QRcode_img{width:256px;height:256px;/*background:url(http://www.17sucai.com/preview/1093/2013-08-22/%E6%88%91%E5%96%9C%E6%AC%A2%E5%8F%B3%E4%BE%A7%E5%BE%AE%E4%BF%A1%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/images/icon.png) -4px -3px no-repeat;*/position:fixed;right:90px;bottom:120px;cursor:pointer;display:none;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));_margin-bottom:67px;}';
    css += '</style>';
    css += '<div id="QRcode" title="扫描二维码"></div>';
    css += '<div id="QRcode_img"></div>';
    css += '<a id="gotop" href="javascript:void(0)"></a>';
    $('body').eq(0).append(css);

    var h = $(window).height();
    var t = $(document).scrollTop();
    if (t > h) {
        $('#gotop').show();
    } else {
        $('#gotop').hide();
    }
    $('#gotop').click(function () {
        $(document).scrollTop(0);
    });
    $('#QRcode').hover(function () {
        $(this).attr('id', 'code_hover');
        $('#QRcode_img').css('width', '0px').show();
        $('#QRcode_img').animate({
            width: '256px'
        }, 500);
    }, function () {
            $(this).attr('id', 'code');
            //$('#QRcode_img').hide(); 
            $('#QRcode_img').animate({
                width: '0px'
            }, 500, function () {
                    $('#QRcode_img').hide();
                });
        })
    $(window).scroll(function (e) {
        h = $(window).height();
        t = $(document).scrollTop();
        if (t > h) {
            $('#gotop').show();
        } else {
            $('#gotop').hide();
        }
    });
    //右下角二维码 eg.http://www.17sucai.com/pins/demoshow/2003
    $('#QRcode_img').append('<div id="qrcodeTable" style="position: fixed; bottom: 120px; right: 100px; width: 256px; text-align: right; z-index: 99999;></div> ');
    jQuery('#qrcodeTable').qrcode({
        text: "" + window.location.href
        //width:100,
        //height:100
    });
    /*
    $('#qrcodeTable').hover(
        function(){
            $(this).animate({
                left: '0px'
            }, 500);
        },
        function(){
            $(this).animate({
                left: '-290px'
            }, 500);
        }
    );
    */
    //删除iFrame中的二维码
    try {
        if (self.frameElement.tagName == "IFRAME") {
            $('#qrcodeTable').remove();
            $('#QRcode').remove();
            $('#QRcode_img').remove();
            $('#gotop').remove();
        }
    } catch (e) { }
});

//*******************************************************************************************************************//
//jquery操作cookie
/*
 * $.cookie('the_cookie'); // 获得cookie
 * $.cookie('the_cookie', 'the_value'); // 设置cookie
 * $.cookie('the_cookie', 'the_value', { expires: 7 }); //设置带时间的cookie  7天
 * $.cookie('the_cookie', '', { expires: -1 }); // 删除
 * $.cookie('the_cookie', null); // 删除 cookie 
 */
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie  
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE  
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie  
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);  
                // Does this cookie string begin with the name we want?  
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1,(cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    expires.setTime(expires.getTime() + seconds);
    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
    + (expires ? '; expires=' + expires.toGMTString() : '')
    + (path ? '; path=' + path : '/')
    + (domain ? '; domain=' + domain : '')
    + (secure ? '; secure' : '');
} 
//*******************************************************************************************************************//
