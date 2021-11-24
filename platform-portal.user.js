// ==UserScript==
// @name            发布系统应用
// @namespace       https://platform-portal-pre.zhaopin.com/gated-center/#/config
// @description     userscript for mr.leo
// @match           *://platform-portal-pre.zhaopin.com/*
// @match           *://platform-portal.zhaopin.com/*
// @require         https://code.jquery.com/jquery-3.6.0.js
// @require         https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/platform-portal.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/platform-portal.user.js
// @version         1.0.1
// ==/UserScript==

//*******************************************************************************************************************//
; (async function () {
    if (typeof jQuery == 'undefined') await npmInstall('https://code.jquery.com/jquery-3.6.0.js'); // 直接引入
    typeof $ === 'undefined' && (window.$ = window.jQuery); // 在window上挂载

    $(function () {
        setTimeout(() => {
            $('div.page-domain-header > div:nth-child(2) > button')
            .after('<i class="l-btn__txt" style="color: #ab9f9f;padding: 8px 16px;"></i>')
            .after('<a class="l-btn" style="color: red;margin-left: 8px;cursor: pointer;padding: 8px 16px;">应用全部</a>')
            $(document).on('click', 'a.l-btn', function () {
                const btns = $('div.el-tree-node.is-expanded').find('button.el-button.el-button--primary.el-button--mini')
                btns.click()
                setTimeout(() => $('.l-btn__txt').text(`共触发 ${btns.length} 个工件应用`), 1000)

            })
        }, 1000)

        // let applying = false;
        // listenAllAjax({
        //     filterUrl: '^https://fe-api-internal(-pre)?.zhaopin.com/platform-portal/gated-center/config/apply$',
        //     openCallback() { },
        //     sendCallback() { },
        //     onReadyStateChangeCallback(...args) {
        //         console.log('onReadyStateChangeCallback', args)
        //         if (applying) return
        //         setTimeout(() => {
        //             const btns = $('.el-tree-node.is-expanded').find('.el-button.el-button--primary.el-button--mini')
        //             console.log(`[LOG] -> 应用工件`, btns)
        //             btns.each(function (index, Element) {
        //                 applying = true
        //                 $(Element).click()
        //             })
        //             applying = false
        //         }, 0)
        //     }
        // })
    });
})();
//*******************************************************************************************************************//
// 在页面中插入<script />标签
function injectScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            console.log(url, ' 安装成功。');
            resolve(url);
        };
        script.onerror = () => {
            console.log(url, ' 安装失败。');
            reject(url);
        };
        document.body.appendChild(script);
        // document.body.removeChild(script);
    })
}
//*******************************************************************************************************************//
async function npmInstall(originName) {
    const name = originName.trim();

    // 三种引入方式
    // 如果是一个有效的URL，直接通过<script />标签插入
    if (/^https?:\/\//.test(name)) return await injectScript(name);

    // 如果指定了版本，尝试使用unpkg加载
    if (name.indexOf('@') !== -1) return await injectScript(`https://unpkg.com/${name}`);

    // 否则，尝试使用cdnjs搜索
    const searchPromise = await fetch(
        `https://api.cdnjs.com/libraries?search=${name}`,
        { referrerPolicy: 'no-referrer' } // 不显示referrer的任何信息在请求头中
    );
    const { results, total } = await searchPromise.json();
    if (total === 0) {
        console.error('Sorry, ', name, ' not found, please try another keyword.');
        return;
    }
    // 取结果中最相关的一条
    const { name: exactName, latest: url } = results[0];
    if (name !== exactName) {
        console.log(name, ' not found, import ', exactName, ' instead.');
    }
    // 通过<script />标签插入
    return await injectScript(url);
}
//*******************************************************************************************************************//
function listenAllAjax({ filterUrl = '', openCallback = () => { }, sendCallback = () => { }, onReadyStateChangeCallback = () => { } } = {}) {
    const reg = new RegExp(filterUrl)
    const filter = (url) => reg.test(url)

    var open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send,
        onReadyStateChange;

    function openReplacement(method, url, async, user, password) {
        // console.info('[xhr] Preparing ' + (async !== false ? 'async' : 'sync') + ' HTTP request : ' + method + ' ' + url);
        if (filter(url)) openCallback.call(this, method, url, async, user, password)
        return open.apply(this, arguments);
    }

    function sendReplacement(data) {
        // console.info('[xhr] Sending HTTP request data : ', data);
        if (this.__sentry_xhr__ && filter(this.__sentry_xhr__.url)) sendCallback.call(this, data)
        if (this.onreadystatechange) this._onreadystatechange = this.onreadystatechange;
        this.onreadystatechange = onReadyStateChangeReplacement;
        return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement() {
        // this.readyState === XMLHttpRequest.DONE && console.info('[xhr] HTTP request ready state changed : ', this);
        if (filter(this.responseURL) && this.readyState === XMLHttpRequest.DONE && this.status === 200) onReadyStateChangeCallback.call(this, this.responseText)
        if (this._onreadystatechange) return this._onreadystatechange.apply(this, arguments);
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;
}

