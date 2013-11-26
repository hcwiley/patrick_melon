jQuery.event.add(window, 'resize', resize);
jQuery.event.add(window, 'load', init);
var img_ratio;
//Current page = loc
var loc;

mobile = false;

//Checking for mobile browser
if (navigator.userAgent.match(/Android/i) ||
navigator.userAgent.match(/webOS/i) ||
navigator.userAgent.match(/iPhone/i) ||
navigator.userAgent.match(/iPod/i)) {
    mobile = true;
}

function init(){
	//Current page = loc
    loc = window.location + "";
    loc = loc.split('/');
    loc = loc[loc.length - 1];
    if (loc[0, 4] == 'index' || loc == '') {
        img_width = $("#bg-img").children("img").width()
        img_height = $("#bg-img").children("img").height();
        img_ratio = img_width / img_height;
    }
    resize();
    allImgs = $('img');
    for (var i = 0; i < allImgs.length; i++) {
        $(allImgs[i]).attr('src', ($(allImgs[i]).attr('src') + '').split('.com')[1]);
    }
}

function resize(){
    var height = $(window).height();
    var width = $(window).width();
	$('#decode72-logo').css('top',height -50);
//    bg(width, height);
//    $("#container").width(width - 400);
//    $("#container").css("left", (width - $("#container").width()) / 2);
//    $("#footer").css("top", $("#container").height() + 10);
    if($('#other-images').height() > $('#current-image').height())
	   $('#piece').height($('#other-images').height());
   else
    $('#piece').height($('#current-image').height());
}

