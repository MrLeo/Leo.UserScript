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

    if(localStorage[url]){
        var saw = localStorage[url].split("^");
		console.log(`${saw}`);
        for(var url in saw){
            var href = saw[url];
            $('a[href="'+href+'"]').css({
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
		//selected = unique(selected);
        localStorage[url] = selected.join("^");
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

