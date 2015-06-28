// ==UserScript==
// @name            Localhost
// @namespace       http://use.i.E.your.homepage/
// @description     userscript for mr.leo
// @match           http://*/*
// @include         http://*/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       http://localhost:1234/localhost.user.js
// @downloadURL     http://localhost:1234/localhost.user.js
// @version         0.1
// ==/UserScript==
//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
}
//在head引入JQuery
;(function(){
    //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();
//*******************************************************************************************************************//

$(function(){
    var local = {
        url : window.location.href,
        checkrul : function(){
            var url = this.url;
            console.log("当前访问的URL",url);
            //debugger;
            if(~url.indexOf('http://360unicom.oicp.net:8888/login_toLogin')){
                console.log('登录万金先生后台');
                this.wjxsAdmin();
            }else if(~url.indexOf('http://360unicom.oicp.net:8888/login_toZfLogin')){
                console.log('登录万金先生');
                this.wjxs();
            }
        },
        wjxsAdmin:function(){
            $('#loginname').val('admin');
            $('#password').val('1');
            $('#code').focus();
        },
        wjxs:function(){
            //$('#loginname').val('wjxs');
            $('#loginname').val('admin');
            $('#password').val('12345678');
            severCheck();
        }
    };
    local.checkrul();
});