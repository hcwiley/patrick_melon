jQuery.event.add(window, 'load', initPieceGallery);
jQuery.event.add(window, 'resize', fitBig);

var showTime = 250;
var imgs = $('imgs');
var curImg = 0;
lastHeight = $(document).height();
lastWidth = $(document).width();

function initThumbnails(){
    $('#piece').stop().animate({
        opacity: 1
    }, 200);
    img = $('#other-images').children('img');
    for (var i = 0; i < $(img).length; i++) {
        $(img[i]).bind('click', function(){
            time = 150;
            cur = this;
            $('#current-image').animate({
                opacity: 0
            }, time);
            $(this).animate({
                opacity: 0
            }, time);
            window.setTimeout(function(){
                last = $('#current-image').children('img').attr('src');
                //console.log('last: ' + last);
                $('#current-image').children('img').attr('src', $(cur).attr('src'));
                //console.log('now: ' + $(cur).attr('src'));
                $(cur).attr('src', last);
                $('#current-image').animate({
                    opacity: 1,
                }, time);
                $('#current-image').children('img').animate({
                    opacity: 1,
                }, time);
                $(cur).animate({
                    opacity: 1
                }, time);
            }, time * 2);
            $('html, body').animate({
                scrollTop: $('#current-image').offset().top - 30
            }, 100);
        });
    }
}

function fitBig(){
    $('#big-img').animate({
        width: $(window).width() + 30,
        height: $(window).height() + 8,
        left: -390,
        top: -95
    }, showTime);
	window.setTimeout("$('#piece').hide();",showTime);
	$('#big-img').children('img').offsetParent($(window).height() / 2 - $('#big-img').children('img').height() / 2);
}

function closeBig(){
	$('#piece').show();
	$('#big-img').animate({
		opacity: 0,
		width: 0,
		height: 0
	}, showTime);
}

function changeImage(dir){
	if( dir < 0){
		//console.log('left');
		if (curImg == 0)
		  curImg = imgs.length -1;
	  else
	  curImg--;
	}
	else if( dir > 0){
		//console.log('right');
        if (curImg == imgs.length -1)
          curImg = 0;
      else
      curImg++;
    }
	$('#big-img > img').attr('src', $(imgs[curImg]).attr('src'));
}

function initMainImage(){
    $('#current-image').bind('click', function(){
		$('#big-img').children('img').attr('src', $(imgs[0]).attr('src'));
		fitBig();
		window.setTimeout(function(){$('#big-img').animate({
			opacity: 1
		}, showTime);}, showTime + 20);
		$('#big-img').show();
    });
	$('#big-img > img').bind('click', closeBig);
	$('#prev').bind('click', function(){
		changeImage(-1);
	});
	$('#next').bind('click', function(){
		changeImage(1);
	});
    $(document).bind('keydown', function(event){
        if (event.keyCode == 27 || event.which == 27) {
			closeBig();
		}
		else if (event.keyCode == 37 || event.which == 37) {
			changeImage(-1);
		}
		else if (event.keyCode == 39 || event.which == 39) {
            changeImage(1);
        }
    });
}

function initPieceGallery(){
    initThumbnails();
    initMainImage();
	window.setTimeout(function(){
		 imgs = $('img').not('.ignore');
		 $('img').mousedown(function(event){
		 	if(event.which == 3){
				$('body').hide();
				window.setTimeout("$('body').show();",2);
			}
		 });
	},300);
}
