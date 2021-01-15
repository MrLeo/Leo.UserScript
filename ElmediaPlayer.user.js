// ==UserScript==
// @name            Elmedia Player
// @namespace       https://github.com/MrLeo/Leo.UserScript
// @description     Elmedia Player (https://cdn.eltima.com/products/elmediaplayer/IntegrateIntoBrowser/)
// @include         http://*
// @include         https://*
// @version         1.0
// @require         https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @updateURL       https://github.com/MrLeo/Leo.UserScript/raw/master/ElmediaPlayer.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/raw/master/ElmediaPlayer.user.js
// @grant           GM_registerMenuCommand
// ==/UserScript==

function command() {
  document.location.href='newelmediaplayer://'+encodeURIComponent(_.get(document.querySelector('#dpplayer video'),'src',location.href));
}

GM_registerMenuCommand('Elmedia Player', command);
