// ==UserScript==
// @name            ����Ӱ��
// @description     ����Ӱ�ӵ�ַѡ������
// @namespace       http://use.i.E.your.homepage/
// @version         0.1
// @match           http://www.yyets.com/*
// @match           http://fd.yyets.tk/*
// @include         http://www.yyets.com/*
// @include         http://fd.yyets.tk/*
// @updateURL       https://github.com/MrLeo/Leo.UserScript/blob/master/����Ӱ��.user.js
// @downloadURL     https://github.com/MrLeo/Leo.UserScript/blob/master/����Ӱ��.user.js
// ==/UserScript==

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

$(function () {
    console.log("================ ����Ӱ�� : " + location.href + " ================");
    var $strong = $('div.item_output').find('div').eq(1).find('strong');
    $strong.after('<a href="javascript:void(0);" id="getThunderUrls">[��ȡѸ�׵�ַ]</a>');
    $strong.after('<a href="javascript:void(0);" id="getMagnetUrls">[��ȡ��������]</a>');
    var herfs = "";
    var vselectSeason = "";
    $('#getThunderUrls').on('click', function () {
        herfs = "";
        getSeason();

        var $selectSeason = $('div.box_1').find('ul[season="' + selectSeason + '"]');
        console.log($selectSeason);
        var $selectSeasonInputs = $selectSeason.find('input:checked');
        console.log($selectSeasonInputs);
        $selectSeasonInputs.each(function () {
            var href = $(this).closest('li').find('.download').find('a[thundertype]')[0].attributes[5].value;
            console.log(href);
            herfs += href + "\r\n";
        });
        console.log("URLsƴ�����", herfs);

        showUrls(herfs);
    });

    $('#getMagnetUrls').on('click', function () {
        herfs = "";
        getSeason();

        var $selectSeason = $('div.box_1').find('ul[season="' + selectSeason + '"]');
        console.log($selectSeason);
        var $selectSeasonInputs = $selectSeason.find('input:checked');
        console.log($selectSeasonInputs);
        $selectSeasonInputs.each(function () {
            debugger;
            var href = $(this).closest('li').find('.download').find('a[type="magnet"]').attr('href');
            console.log(href);
            herfs += href + "\r\n";
        });
        console.log("URLsƴ�����", herfs);

        showUrls(herfs);
    });

    var getSeason = function () {
        $('.resod_list').each(function () {
            var thisDisplay = $(this).css('display');
            if (thisDisplay != "none") {
                selectSeason = $(this).attr('season');
                console.log(selectSeason);
            }
        });
    };
    var showUrls = function (herfs) {
        $('#urls textarea').html("").remove();
        $('#tabs').after('<div id="urls"><div class="close">�ر�</div><textarea style="width:99.5%;height:100%;margin:0 auto;" onpropertychange="this.style.posHeight=this.scrollHeight" onfocus="this.style.posHeight=this.scrollHeight">' + herfs + '</textarea></div>');
        $('#urls').css({
            'position': 'fixed',
            'bottom': '0',
            'left': '1%',
            'width': '99%',
            'height': '50%',
            'z-index': '999999',
            'background-color': '#CCC',
            'border': '1px solid #CCC',
            'word-break': 'break-all'
        });
        $('#urls .close').css({
            'zoom': '1.5',
            'padding': '5px 0',
            'margin-top': '-25px',
            'text-align': 'right',
            'cursor': 'pointer',
            'background-color': '#7A7A7A',
            'color': '#000'
        }).on('click', function () {
            $('#urls').remove();
        });
        $('#urls textarea').focus(function () {
            this.select();
        });
    };
});






