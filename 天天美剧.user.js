// ==UserScript==
// @name            天天美剧
// @namespace       https://github.com/MrLeo
// @description     userscript for mr.leo
// @match           http://cn163.net/*
// @include         http://cn163.net/*
// @exclude         http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/天天美剧.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/天天美剧.user.js
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
    console.log(`[leo]当前URL => ${url}`);

    if(localStorage[url]){
        var saw = JSON.parse(localStorage[url]);
        console.log('[leo]下载记录 => ',saw);
        for (var i = 0, len = saw.history.length; i < len; i++) {
            $('a:contains("' + saw.history[i] + '")').css({
                'color': '#999',
                'text-decoration': 'none'
            }).wrap("<del></del>");
        }
    }

    $('#primary .single-content, #entry').find('p').on('click', 'a', function(e){
        var selected = {
            'title': $('title').text(),
            'history':[]
        };
        if (localStorage[url]) {
            selected = JSON.parse(localStorage[url]);
        }
        selected.history.push($(this).text());
        console.log('[Leo]更新下载记录 => ',selected);
        localStorage[url] = JSON.stringify(selected);
        $(this).css({
            'color': '#999',
            'text-decoration': 'none'
        }).wrap("<del></del>");
    });
	
	function unique(arr) {
		var result = [], hash = {};
		for (var i = 0, elem; (elem = arr[i]) != null; i++) {
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
		return result;
	}
	
})();

