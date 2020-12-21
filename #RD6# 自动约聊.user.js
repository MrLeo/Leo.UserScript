// ==UserScript==
// @name            #RD6# 自动约聊
// @namespace       http://tampermonkey.net/
// @version         0.1
// @description     try to take over the world!
// @author          Leo
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/%23RD6%23%20%E8%87%AA%E5%8A%A8%E7%BA%A6%E8%81%8A.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/%23RD6%23%20%E8%87%AA%E5%8A%A8%E7%BA%A6%E8%81%8A.user.js
// @match           *://rd6.zhaopin.com/*
// @match           *://rd6-pre.zhaopin.com/*
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require         https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @grant           none
// ==/UserScript==

(function() {
    'use strict';
    listenAllAjax({
        filterUrl:'/api/talent/recommend',
        openCallback(){},
        sendCallback(){},
        onReadyStateChangeCallback(...args){
            console.log('onReadyStateChangeCallback', args)
            setTimeout(()=>{
                const doms = [] // jQuery.makeArray(doms)

                jQuery('.recommend-item').each((index,dom)=>{
                    if(!jQuery(dom).has(':contains("暂不换工作")').length){
                        doms.push(jQuery(dom).find('.resume-button button:contains("免费聊天")')[0])
                    }
                })

                console.log(doms)

                const clickDom = () => {
                    const dom = doms.shift()
                    if (!dom) {
                        window.scrollTo(0,document.body.scrollHeight)
                        return
                    }
                    dom.click()
                    setTimeout(clickDom,3000)
                }

                clickDom()
            }, 1000)
        }
    })
})();

function listenAllAjax ({filterUrl='',openCallback=()=>{},sendCallback=()=>{},onReadyStateChangeCallback=()=>{}}={}) {
    const reg = new RegExp(filterUrl)
    const filter = (url) => reg.test(url)

    var open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send,
        onReadyStateChange;

    function openReplacement(method, url, async, user, password) {
        console.info('[xhr] Preparing ' + (async !== false ? 'async' : 'sync') + ' HTTP request : ' + method + ' ' + url);
        if(filter(url)) openCallback.call(this, method, url, async, user, password)
        return open.apply(this, arguments);
    }

    function sendReplacement(data) {
        console.info('[xhr] Sending HTTP request data : ', data);
        if(filter(this.__sentry_xhr__.url)) sendCallback.call(this, data)

        if(this.onreadystatechange) this._onreadystatechange = this.onreadystatechange;
        this.onreadystatechange = onReadyStateChangeReplacement;

        return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement() {
        this.readyState === XMLHttpRequest.DONE && console.info('[xhr] HTTP request ready state changed : ', this);
        if(filter(this.responseURL) && this.readyState === XMLHttpRequest.DONE && this.status === 200) onReadyStateChangeCallback.call(this, this.responseText)

        if(this._onreadystatechange) return this._onreadystatechange.apply(this, arguments);
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;
}
