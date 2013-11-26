jQuery.event.add(window, 'resize', resize);
jQuery.event.add(window, 'load', init);
var img_ratio;

noAjax = true;
mobile = false;

if ($.browser.webkit) 
    noAjax = false;
if (navigator.userAgent.match(/Android/i) ||
navigator.userAgent.match(/webOS/i) ||
navigator.userAgent.match(/iPhone/i) ||
navigator.userAgent.match(/iPod/i)) {
    mobile = true;
}
noAjax = true;

function initHeader(){
    $('#logo').bind('click', function(){
        window.location = '/contact';
    });
    pages = $('#nav').children('a');
    time = 200;
    for (var i = 0; i < $(pages).length; i++) {
        $(pages[i]).bind('click', function(){
            var toAjax = '/' + $(this).children('p').html();
            $('#container').animate({opacity: 0}, time);
			window.setTimeout(function(){
				window.location = toAjax;
			}, time+20);
        });
    }
    $('#visualizations').bind('click', function(){
        window.setTimeout(function(){
                window.location = 'http://wd40too.com/2010-08-03/';
            }, time+20);
    });
}

function initThumbnails(){
    $('#piece').stop().animate({
        opacity: 1
    }, 200);
    img = $('#other-images').children('img');
    for (var i = 0; i < $(img).length; i++) {
        $(img[i]).bind('click', function(){
            time = 150;
            cur = this;
            $('#current-image').stop().animate({
                opacity: 0
            }, time);
            $(this).stop().animate({
                opacity: 0
            }, time);
            window.setTimeout(function(){
                last = $('#current-image').children('img').attr('src');
                $('#current-image').children('img').attr('src', $(cur).attr('src'));
                $(cur).attr('src', last);
                $('#current-image').stop().animate({
                    opacity: 1,
                }, time);
                $('#current-image').children('img').stop().animate({
                    opacity: 1,
                }, time);
                $(cur).stop().animate({
                    opacity: 1
                }, time);
            }, time * 2);
        });
    }
}

function initImgs(){
    piece = $('#medium').children('a');
	window.setTimeout(function(){
            $(piece).animate({
                opacity: 1
            }, 300);
    }, 400);
    for (var i = 0; i < $(piece).length; i++) {
//        $(piece[i]).bind('click', function(){
//            //console.log('bound');
//            var toAjax = $(this).attr('datasrc');
//            window.location = toAjax;
//        });
		$(piece[i]).width($(piece[i]).children('img').width() + 20);
        $(piece[i]).height($(piece[i]).children('img').height() + 20);
    }
}

function init(){
//    initHeader();
    curUrl = window.location + "";
    curUrl = curUrl.split('/');
    curUrl = curUrl[curUrl.length - 1];
    //console.log(curUrl);
    if (curUrl[0, 4] == 'index' || curUrl == '' || curUrl == '#') {
        img_width = $("#bg-img").children("img").width()
        img_height = $("#bg-img").children("img").height();
        img_ratio = img_width / img_height;
    }
    else {
        $('#bg-img').remove();
    }
    resize();
    imgs = $('img'); for(var i=0; i<imgs.length; i++){ $(imgs[i]).attr('src',($(imgs[i]).attr('src')+'').split('.com')[1]);}
}

function resize(){
    var height = $(window).height();
    var width = $(window).width();
    bg(width, height);
    $("#container").width(width - 320);
    //$("#container").height(height - 50);
    $("#container").css("left", $('#navbar').width());
    $("#footer").css("top", $("#container").height() + 10);
}

function bg(width, height){
    $("#bg-img").width(width);
    $("#bg-img").height(height);
    $("#bg-img").css("top", "-10px");
    $("#bg-img").css("left", "-10px");
    var img = $("#bg-img").children("img");
    var ratio = height / width;
    img.css("width", width + 20);
    img.css("height", (width / img_ratio) + 20);
    //console.log("image: " + img.width() + " x " + img.height() + " ratio: " + 1 / img_ratio);
    //console.log("window: " + $(window).width() + " x " + $(window).height() + " ratio: " + ratio);
}
