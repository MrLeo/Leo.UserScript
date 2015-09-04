// ==UserScript==
// @name            迅播影院
// @namespace       https://github.com/MrLeo
// @description     userscript for mr.leo
// @match           http://*xiamp4.com/*
// @include         http://*xiamp4.com/*
// @exclude         http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @require         http://www.helloweba.com/demo/zclip/js/jquery.zclip.min.js
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

createScriptLink('//www.helloweba.com/demo/zclip/js/jquery.zclip.min.js');

var style = '<style type="text/css">';
style += '.demo{width:760px; margin:40px auto 0 auto; min-height:150px;}';
style += 'textarea{width:100%; height:80px; border:1px solid #ddd; color:#666}';
style += '#para{line-height:24px; background:#f7f7f7; padding:10px}';
style += '.copy{line-height:32px}';
style += '#msg{margin-left:10px; color:green; border:1px solid #3c3; background:url(http://www.helloweba.com/demo/zclip/checkmark.png) no-repeat 2px 3px; padding:3px 6px 3px 20px}';
style += '</style>';
$('head').append(style);

$('.ndownlist')
.append("<textarea class=\"uri\" rows=\"10\" cols=\"20\"></textarea>")
.find('li i input').each(function(){
    $('.uri',$(this).closest('.ndownlist')).append($(this).val() + '\n').css({
        'width': '905px',
        'overflow': 'auto',
        'line-height': '25px',
        'word-wrap': 'break-word'
    }).select();
});

var $CopyToClip = $('.ckbox p').find('a').eq(0);
console.log($CopyToClip[0].outerHTML);
$CopyToClip.zclip({
    path: 'http://www.helloweba.com/demo/zclip/js/ZeroClipboard.swf',
    copy: function(){
        var $selected = $(this).closest('ul').find('i input:checked');
        var selected ="";
        $selected.each(function(index){
            console.log(this.value);
            selected += this.value;
        });
        return selected;
    },
    afterCopy: function(){
        $("<span id='msg'/>").insertAfter($CopyToClip).text('复制成功').fadeOut(2000);
    }
});




