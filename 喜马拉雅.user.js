// ==UserScript==
// @name        	ϲ������
// @description 	ϲ������ר���б������¼���Cookie��¼
// @namespace   	http://use.i.E.your.homepage/
// @match       	http://www.ximalaya.com/*
// @include     	http://www.ximalaya.com/*
// @require     	http://code.jquery.com/jquery-latest.js
// @require			http://raw.githubusercontent.com/carhartl/jquery-cookie/master/src/jquery.cookie.js
// @version      	0.1
// ==/UserScript==
// @updateURL       
// @downloadURL     

//���ݴ����URL����head������script����DOM����
function createScriptLink(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.head.appendChild(scriptElement);
    console.log('������ã�' + (new XMLSerializer()).serializeToString(scriptElement));
}
//��head����JQuery
; (function () {
    //window.jQuery || createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
    if (typeof jQuery == 'undefined') createScriptLink('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
})();

//*******************************************************************************************************************//

$(function () {
    //��ȡurl�е���Ƶ��ҳid
    //url = location.href;
    //key = url.replace(/http:.*#?\/(\d+)\/.*/gmi,'$1');
    key = location.href;
    console.log("ָ��Cookie��Key��" + key);

    //��ȡ Cookie
    var sound = $.cookie(key);

    //ҳ���ʼ����Ϊר�����ú�ɫ�߿�
    $album = $('.album_soundlist');
    $album.find('li[sound_id=' + sound + ']').addClass('focus').css('border', '1px solid red');

    //ר��
    var AlbumFunc = function () {
        //���»�ȡר��
        $album = $('.album_soundlist');
        if ($album.length > 0) {
            key = location.href;
            sound = $.cookie(key);//����Cookie����ȡֵ
            console.log("����Cookie�ļ���" + key + "����ȡֵSoundID��" + sound);
            var sound_id = parseInt($album.find('li[class="focus"]').attr('sound_id'));//��ȡ��ǰҳ���б��������Ƶ
            console.log("��ǰҳ�汻�����SoundID��" + sound_id);
            if (typeof sound != "undefined") {
                if (!isNaN(sound_id)) {
                    $album.find('li[sound_id!=' + sound_id + ']').css('border', '0');
                    $album.find('li[sound_id=' + sound_id + ']').css('border', '1px solid red');
                    $.cookie(key, sound_id, { expires: 30 });
                    console.log("����Cookie��Key��" + key + ",Value��" + sound_id);
                } else {
                    $album.find('li[sound_id=' + sound + ']').addClass('focus').css('border', '1px solid red');
                }
            } else {
                if (!isNaN(sound_id)) {
                    $.cookie(key, sound_id, { expires: 30 });
                    console.log("��������Cookie��Key��" + key + ",Value��" + sound_id);
                }
            }
        }
    };

    //��ʱѭ��
    setInterval(function soundCookie() {
        AlbumFunc();
    }, 1000);
})
