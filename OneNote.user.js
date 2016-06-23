// ==UserScript==
// @name            OneNote Clipper - Ctrl+Alt+O
// @namespace       https://github.com/MrLeo/Leo.UserScript
// @description     The clipper Bookmarklet
// @include         http://*
// @include         https://*
// @version         1.0
// @grant           GM_registerMenuCommand
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/OneNote.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/OneNote.user.js
// ==/UserScript==

/**
 * OneNote 剪裁
 */
function onenote() {
    var jsCode = document.createElement('script');
    jsCode.setAttribute('src', 'https://www.onenote.com/clipper/root?ClipperId=ON-6a191eef-84a2-4491-9cc2-2e4560cfb9af&ClipperType=Bookmarklet&ClipperVersion=2.0.2');
    jsCode.setAttribute('id', 'oneNoteCaptureRootScript');
    jsCode.setAttribute('type', 'text/javascript');
    document.body.appendChild(jsCode);
}

/**
 * 启动 OneNote 剪裁
 * @constructor
 */
function OnenoteClipper() {
    console.log("Clipper Hotkey Pressed");
    onenote(); // Open OneNote Clipper.
}

/**
 * 监听键盘操作
 */
(function () {
    document.addEventListener('keydown', function (e) {
        // pressed ctrl+alt+o
        if (e.keyCode == 79 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
            OnenoteClipper();
        }
    }, false);
})();

//在“用户脚本命令”添加两个命令
GM_registerMenuCommand('OneNote Clipper', OnenoteClipper);