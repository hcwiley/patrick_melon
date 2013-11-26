jQuery.event.add(window, 'load', initGallery);

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
    }
}


function initGallery(){
    initImgs();
}