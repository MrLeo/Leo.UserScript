# Leo.UserScript

- Chrome userscript 模本

```js
// ==UserScript==
// @name            MyUserScript Template
// @namespace       http://use.i.E.your.homepage/
// @description     userscript for mr.leo
// @match           http://*/*
// @include         http://*/*
// @require         http://code.jquery.com/jquery-latest.js
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
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if($){$ = window.jQuery;}
    
})();
//*******************************************************************************************************************//
```
