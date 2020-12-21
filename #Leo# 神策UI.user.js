// ==UserScript==
// @name            #Leo# 神策UI
// @version         0.1
// @description     自定义神策样式
// @author          Leo
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/#Leo#%20神策UI.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/#Leo#%20神策UI.user.js
// @include         *://dsm.zhaopin.cn/*
// ==/UserScript==

(function() {
    let sheet = document.createElement('style')
    sheet.setAttribute('media', 'screen')

    let style = []
    style.push('.cool-event-dropdown .cool-event-menu {width:1000px;}')
    style.push('.cool-event-dropdown .cool-event-menu .item {width:300px;}')
    style.push('.segmentation-chart .chart-config .config {width:500px;right:0;left:auto;}')

    sheet.innerHTML = style.join('')
    document.head.appendChild(sheet)
})();
