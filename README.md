# Leo.UserScript

#### UserScript 介绍：

> UserScript 又称“油猴脚本”，其实就是一个在浏览器中能本地执行扩展名为`.user.js`的 js 文件，使用 UserScript 可以自定义被浏览的网页，更多详细可参考[维基百科](https://zh.wikipedia.org/wiki/Greasemonkey)中的介绍。

#### UserScript 优势：

> 在 Chrome 中，UserScript 类似于一个精简的 Chrome 扩展，两者的区别在于 Chrome 扩展是在浏览器启动的时候就会执行，但 UserScript 是在使用的时才候执行，这样就大大减少了 Chrome 的内存占用。而且 UserScript 只是一个单纯的 js 文件，可以随意定制修改。

---

* [Chrome 原生安装 UserScript 脚本](https://github.com/EchoFUN/melodycoder/issues/12)
* [Chrome 油猴脚本管理插件 - TamperMonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [自定义油猴脚本模版](https://raw.githubusercontent.com/MrLeo/Leo.UserScript/master/README.md)
* 热门油猴脚本推荐：

  * [二维码生成](http://userscripts-mirror.org/scripts/source/185467.user.js)
  * [百度网盘下载助手](https://greasyfork.org/scripts/986-百度网盘助手/code/百度网盘助手.user.js)

* 油猴脚本搜索(根据受欢迎程度排列)：
  * [userscript 官网](http://userscripts-mirror.org/)
  * [Greasy Fork](https://greasyfork.org/zh-CN)
  * [MonkeyGuts](https://monkeyguts.com/index.php?lang=zh)
  * [OpenUserJS.org](https://openuserjs.org/)
  * [User Script / 脚本](http://j.mozest.com/zh-CN/userscript/)
  * [油猴脚本|火狐范](http://www.firefoxfan.com/greasemonkey-scripts)
* [Greasemonkey API](http://old.sebug.net/paper/books/greasemonkey/)

---

#### Chrome userscript 模本

> 开发文档: https://www.tampermonkey.net/documentation.php

```js
// ==UserScript==
// @name            MyUserScript Temp
// @namespace       https://xuebin.me
// @description     userscript for mr.leo
// @match           http* */://*/*
// @include         http* */://*/*
// @exclude 　　　　 http* */://*baidu.com/*
// @require         http://code.jquery.com/jquery-latest.js
// @updateURL       更新地址（UserScript.meta.js)
// @downloadURL     更新地址（UserScript.user.js）
// @version         0.1
// ==/UserScript==

//根据传入的URL，在head里生成script引用DOM对象
function createScriptLink(url) {
  var scriptElement = document.createElement('script')
  scriptElement.setAttribute('type', 'text/javascript')
  scriptElement.setAttribute('src', url)
  document.head.appendChild(scriptElement)
  //console.log('添加引用：' + (new XMLSerializer()).serializeToString(scriptElement));
}
//在head引入JQuery
;(function() {
  //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
  if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
})()
```

```js
// ==UserScript==
// @name         Debug Userscript
// @namespace    https://xuebin.me
// @version      0.1
// @description  This is a debug script to load userscripts from local file system. NOTICE, you need to turn on Allow access to file URLs to @require local file https://www.tampermonkey.net/documentation.php
// @author       Leo
// @match        http*://*
// @include      http://*
// @include      https://*
// @include      *
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      https://unpkg.com/dexie@latest/dist/dexie.js
// @require      file:///home/einverne/Git/userscripts/douban_export/douban_exporter.user.js
// ==/UserScript==

(function () {
    'use strict';

    console.log("debug script start here");
    // Your code here...
})();
```

# 本地开发

在 Chrome 下有一 Tampermonkey 的插件，管理油猴子脚本，本身也自带一个编辑器，但是用它的编辑器功能上总有缺陷，而 Tampermonkey（以下简称“TM"）又不能直接调用磁盘的上的脚本，所以通过特殊方式实现用外部编辑器编辑磁盘上的 js 文件，然后 Tampermoney 自动加载自动调用。

以下来自 TM 的[论坛](http://forum.tampermonkey.net/viewtopic.php?p=1832#p1832)

@require tag 能够调用到本地磁盘上的文件，使用这种@require 方法可能会有延迟。

具体方法：

* 打开 Chrome 扩展管理，勾选 TM“允许访问文件网址”
* 进入 TM 管理，添加一个新脚本
* 打开文件管理器，找到脚本存放位置
* 用中意的编辑器打开脚本
* 复制脚本 Header，在新脚本提交
* 复制脚本在本机存放的位置
* 在 TM 中新建的脚本 Header 位置插入新行 ---- ”//@require file://<path>/<filename>"
* 保存 TM 中新脚本，然后就结束了。

# 一个例子：假设你的脚本在

C:\Users\janb\Documents\Scripts\test.js 并且开头如下：

```js
// ==UserScript==
// @name Test'Em'All
// @namespace http://tampermonkey.net/empty.html
// @version 0.1
// @description this does nothing but giving a good example
// @match http://tampermonkey.net/empty.html
// ==/UserScript==

console.log('running at ' + window.location.href)
// Normal script now do a lot of other things...
```

接下来你在 TM 中创建一个新脚本，内容如下：

```js
// ==UserScript==
// @name Test'Em'All
// @namespace http://tampermonkey.net/empty.html
// @version 0.1
// @description this does nothing but giving a good example
// @match http://tampermonkey.net/empty.html
// @require file://C:\Users\janb\Documents\Scripts\test.js
// ==/UserScript==
```

结束现在你就可以编辑本地”C:\Users\janb\Documents\Scripts\test.js“的文件，所有修改都会及时的反映到“http://tampermonkey.net/empty.html”这个网址。

**几个注意点：**

* 一定注意将 TM 的允许访问本地文件勾选上～
* 如果你的本地地址中文件夹有空格，用 %20 代替 ，例如“file://C:\Eigene%20Dateien\test.js”
* 你的本地文件不要以 user.js 结尾，user.js 文件会被 Chrome 接管，TM 不能接受到～
  ![](http://4.bp.blogspot.com/-RUs6F707g_o/Uf9Z4oS0CNI/AAAAAAAAXCM/cMPq7uHogSw/s640/einverne_2013.08.05_15h50m16s_001_.png)

给 Linux 用户的注意点：

不要用“~”来表示 home directory
在路径开始的时候加“/“ 例如：”file:///home/janb/Documents/test.js“

> /Users/leo/www/UserScript/\*\*.js

> https://www.einverne.tk/2013/08/enable-external-editor.html
