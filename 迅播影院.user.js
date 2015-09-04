// ==UserScript==
// @name            迅播影院
// @namespace       https://github.com/MrLeo
// @description     userscript for mr.leo
// @match           http://*xiamp4.com/*
// @include         http://*xiamp4.com/*
// @exclude         http://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/迅播影院.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/迅播影院.user.js
// @version         0.1
// ==/UserScript==

$(function(){
    //根据传入的URL，在head里生成script引用DOM对象
    function createScriptLink(url){
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', url);
        document.head.appendChild(scriptElement);
        //console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
        return true;
    }

    /**
     * 添加 ZeroClipboard 引用
     * https://github.com/zeroclipboard/ZeroClipboard
     */
    window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    createScriptLink('http://zeroclipboard.org/javascripts/zc/v2.2.0/ZeroClipboard.js');

    $ = jQuery;

    //设置样式
    var styles = '';
    styles += '.copy{float: left;line-height:35px;}';
    styles += '.msg{float: left !important;margin: 5px 5px 5px 20px;color:green; border:1px solid #3c3; background:url(http://www.helloweba.com/demo/zclip/checkmark.png) no-repeat 2px 3px; padding:3px 6px 3px 20px}';
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type','text/css');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    //检测 ZeroClipboard 是否已经加载成功
    function checkedCopyReady(){
        if(typeof ZeroClipboard != "undefined" && ZeroClipboard){
            console.log(ZeroClipboard.version);
            copy();
        }else{
            setTimeout(checkedCopyReady,600);
        }
    }
    checkedCopyReady();

    function copy(){
        // 全局设置 
        ZeroClipboard.config({
          swfPath : 'http://code.ciaoca.com/javascript/zeroclipboard/demo/js/ZeroClipboard.swf' 
        });

        //添加复制链接按钮
        var $ndownlists = $('.ndownlist');
        $ndownlists.append('<a href="javascript:void(0);" class="copy">复制选中的链接</a>');
        console.log("添加按钮：",$ndownlists);

        //绑定监听复制按钮事件
        var clip = new ZeroClipboard($('.copy'));
        clip.on("ready", function (event) {
            console.log("flash ready");
        }).on("copy", function (event) {
            var clipboard = event.clipboardData;
            var links ="";
            $(event.target).parents('.ndownlist').find('ul i input:checked').each(function(i){
                links+=this.value+"\n";
            });
            console.log("复制的链接：",links);

            clipboard.setData("text/plain", links);
            clipboard.setData("text/html", "<div>"+links+"</div>" );
        }).on("aftercopy", function( event ) {
            var $msg = $(".msg",$(event.target).parent()),
                $uris= $(".uris",$(event.target).parent());
            if($msg) $msg.remove();
            if($uris) $uris.remove();
            
            console.log("剪贴板：",event.data['text/plain']);
            if(!event.data['text/plain']){
                $("<span class='msg'/>").insertAfter($(event.target)).text('您没有选择任何链接').fadeOut(2000);
                return;
            }
            $("<span class='msg'/>").insertAfter($(event.target)).text('复制成功').fadeOut(2000);
            $("<textarea class=\"uris\" rows=\"20\" cols=\"30\" style=\"width:100%\"></textarea>").insertAfter($(event.target).next('.msg')).text(event.data['text/plain']);
        }).on("error", function(event) {
            console.log("error:",event);
        });
    }
});
