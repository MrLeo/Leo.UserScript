// ==UserScript==
// @name            MyUserScript Temp
// @namespace       https://github.com/MrLeo
// @description     userscript for mr.leo
// @match           http://*/*
// @include         http://*/*
// @exclude 　　　　 http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       更新地址（UserScript.meta.js)
// @downloadURL     更新地址（UserScript.user.js）
// @version         0.1
// ==/UserScript==

function createScriptLink(url){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    //console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
}
;(function(){
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    
    var url = window.location.href;

    if(localStorage[url]){
        var saw = localStorage[url].split("^");
        for(var url in saw){
            var href = saw[url];
            $('a[href='+href+']').css({
                'color': '#999',
                'text-decoration': 'none'
            }).wrap("<del></del>");
        }
    }
    $('#content .entry a').click(function(e){
        var selected = [];
        if(localStorage[url])
            selected = localStorage[url].split("^");
        selected.push($(this).attr('href'));
        localStorage[url] = selected.join("^");
        $(this).css({
            'color': '#999',
            'text-decoration': 'none'
        }).wrap("<del></del>");
    });

})();
