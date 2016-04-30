// ==UserScript==
// @name         获取Shadowsocks二维码
// @namespace    https://github.com/MrLeo
// @version      0.1
// @description  userscript for mr.leo
// @author       Mr.Leo
// @match        http://*/*
// @grant        GM_registerMenuCommand
// @require      http://code.jquery.com/jquery-latest.js
// @require      http://freeshadowsocks.cf/js/jquery.base64.min.js
// @updateURL    https://github.com/MrLeo/Leo.UserScript/raw/master/Shadowsocks.user.js
// @downloadURL  https://github.com/MrLeo/Leo.UserScript/raw/master/Shadowsocks.user.js
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
})();

//定义二维码转换引擎
var Engine = 'http://qr.liantu.com/api.php?m=7&text=';

//加载页面
function loadURL(uri){
    var container;
    $.ajax({
        url: uri,
        async: false,
        success:function(res){
            console.log('[Leo]LoadHTML=>',res);
            res = res.replace(/(^\s+)|(\s+$)/gm,'');
            res = res.replace(/\n/gm,'');
            var matchRes = res.match(/<div.*?class="col-md-6 text-center">[^div]+div>/gm);
            console.log('[Leo]Match Info=>',matchRes);
            container = $(matchRes[2]);
        }
    });
    return container;
}

//从网页获取Shadowsocks信息
function getShadowsocksInfo(){
    var $container = loadURL('http://freeshadowsocks.cf');

    var ssInfo, ssqrInfo;
    if($container){
        var $h4 = $container.find('h4');
        var account = $h4.eq(0).html().slice($h4.eq(0).html().indexOf(':') + 1);
        var port = $h4.eq(1).html().slice($h4.eq(1).html().indexOf(':'));
        var passwd = $h4.eq(2).html().slice($h4.eq(2).html().indexOf(':'));
        ssInfo = 'aes-256-cfb' + passwd + '@' + account + port;
        ssqrInfo = "ss://" + $.base64.encode(ssInfo);
    }else{
        ssqrInfo = "未找到Shadowsocks账号信息";
    }
    return {
        "ssInfo": ssInfo,
        "ssqrInfo": ssqrInfo
    };
}

//显示二维码
function AddElement(URLInfo, URLToEncode) {
    body = document.getElementsByTagName('body')[0];
    QRcodeElement = document.createElement('div');
    QRcodeElement.setAttribute('id', 'QRcode');
    QRcodeElement.setAttribute('style', 'position:fixed; top:0; left:0; width:100%; height:' + document.body.clientHeight +'px; z-index:60000; text-align:center; background-image: -moz-repeating-linear-gradient(top left -35deg, rgba(255,255,255,.1),rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 5px,rgba(255,255,255,.1) 6px,rgba(255,255,255,.1) 8px); background-color:rgba(0,0,0,.45);');
    QRcodeElement.innerHTML = '<p style="margin:90px 5% 10px;;display:inline-block; padding:3px 10px; border-radius:10px; font-weight:bold; font-size:16px; background-color:white;color: #000;">' + URLInfo + '</p><p><br /></p><img src="' + Engine + URLToEncode + '"></img>';
    body.insertBefore(QRcodeElement, body.firstChild);
    document.getElementById('QRcode').addEventListener('click', function () { 
        var Temp = document.getElementById('QRcode');
        Temp.parentNode.removeChild(Temp);
    }, false);
}

//获取并生成二维码
function GetQRCodeInfo() {
    ssInfo = getShadowsocksInfo();
    AddElement(ssInfo.ssInfo, ssInfo.ssqrInfo);
}

//在“用户脚本命令”添加两个命令
GM_registerMenuCommand('获取ShadowSocat二维码', GetQRCodeInfo);