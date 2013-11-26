jQuery.event.add(window, 'load', initPieceGallery);

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

function initPieceGallery(){
    initThumbnails();
}
