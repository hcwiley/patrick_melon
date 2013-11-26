jQuery.event.add(window, 'load', initEdit);
function moveAddDiv(){
    $('#gallery').prepend(document.getElementById('add-new-piece'));
	$('#series').prepend(document.getElementById('add-new-piece'));
    $('#other-images').prepend(document.getElementById('add-new-piece'));
    $('#add-new-piece').animate({
        opacity: 1
    }, 800);
}

function showRequest(formData, jqForm, options){
    //console.log('requesting...');
}

function handlePostSuccess(responseText, statusText, xhr, $form){
    //console.log('handling success');
    var ajax = '/get/header';
    window.setTimeout(function(){
        $.get(ajax, function(data){
            $('#header').html(data);
        });
        ajax = '/get/' + loc;
        $.get(ajax, function(data){
			$('#container').prepend($('#add-new-piece'));
            $('.content').remove();
            $('#container').html($('#container').html() + data);
			moveAddDiv();
			if(loc != 'edit')
			 initPieceGallery();
        });
    }, 1500);
    closeAddPieceForm();
}

function handlePostFail(){
    alert('sorry something went wrong...');
}

function closeAddSeriesForm(){
    $('#add-series').animate({
        opacity: 0
    }, 100);
    $('#add-series').css('z-index', -1);
}

function closeAddPieceForm(){
    $('#add-piece').animate({
        opacity: 0
    }, 100);
    $('#add-piece').css('z-index', -1);
}

function editHeader(){
    as = $('a');
    for (var i = 0; i < $(as).length; i++) {
        $(as[i]).attr('href', '/edit' + $(as[i]).attr('href'));
    }
}

function initAddNew(){
    $('#close-add-piece').bind('click', function(){
        closeAddPieceForm();
    });
	$('#close-add-series').bind('click', function(){
        closeAddSeriesForm();
    });
	$('#add-new-series').bind('click', function(){
        $('#add-series').animate({
            opacity: 1
        }, 100);
        $('#add-series').css('z-index', 3);
    });
    $('#add-new-piece').bind('click', function(){
        $('#add-piece').animate({
            opacity: 1
        }, 100);
        $('#add-piece').css('z-index', 3);
    });
    var options = {
        //        target: '#header', // target element(s) to be updated with server response 
        beforeSubmit: showRequest, // pre-submit callback 
        success: handlePostSuccess, // post-submit callback
//        url: '/add/piece',
        clearForm: true
    };
    $('#add-piece-form').bind('keypress', function(event){
        if (event.keyCode == 13 || event.which == 13) {
            $(this).trigger('submit');
        }
        else if (event.keyCode == 27 || event.which == 27) {
            closeAddPieceForm();
        }
    });
    $('#add-piece-form').submit(function(){
        if ($('#piece_title').val() == '') {
            //console.log('title');
            $('#piece_title').css('background-color', '#900');
        }
        else if ($('#piece_default_image').val() == "") {
            //console.log('image');
            $('#piece_default_image').css('background-color', '#F00');
        }
        else if ($('#piece_series').val() == '') {
            //console.log('series');
            $('#piece_series').css('background-color', '#F00');
        }
        else {
            //console.log('sending...');
            $('#add-piece-form').ajaxSubmit(options);
        }
        
        return false;
    });
	var options = {
        //        target: '#header', // target element(s) to be updated with server response 
        beforeSubmit: showRequest, // pre-submit callback 
        success: handlePostSuccess, // post-submit callback
//        url: '/add/series',
        clearForm: true
    };
	$('#add-series-form').bind('keypress', function(event){
        if (event.keyCode == 13 || event.which == 13) {
            $(this).trigger('submit');
        }
        else if (event.keyCode == 27 || event.which == 27) {
            closeAddPieceForm();
        }
    });
    $('#add-series-form').submit(function(){
        if ($('#series_name').val() == '') {
            //console.log('title');
            $('#series_name').css('background-color', '#900');
        }
        else {
            //console.log('sending...');
            $('#add-series-form').ajaxSubmit(options);
        }
        
        return false;
    });
}

function handleLogoutSuccess(){
	window.location = window.location;
}
function handleLogoutFail(){
	
}

function handleLoginSuccess(){
    window.location = window.location;
}

function handleLoginFail(response, statusText, xhr){
    //console.log(response.responseText);
    if (response.responseText == 'password') {
        $('#login').html($('#login').html() + 'password did not match');
    }
    else if (response.responseText == 'username') {
        $('#login').html($('#login').html() + 'username not found');
    }
}

function initLogin(){
    $('#login-form').bind('keypress', function(event){
        if (event.keyCode == 13 || event.which == 13) {
            $(this).trigger('submit');
        }
        else if (event.keyCode == 27 || event.which == 27) {
            closeAddPieceForm();
        }
    });
    $('#login-form').submit(function(){
        if ($('#username').val() == '') {
            $('#username').css('background-color', '#900');
        }
        else if ($('#password').val() == "") {
            $('#password').css('background-color', '#F00');
        }
        else {
            //console.log('sending...');
            $.ajax({
                url: '/login',
                type: 'POST',
                data: $('#login-form').serialize(),
                success: handleLoginSuccess,
                error: handleLoginFail
            });
        }
        
        return false;
    });
	$('#logout').click(function(){
		$.ajax({
                url: '/logout',
                type: 'POST',
                success: handleLogoutSuccess,
                error: handleLogoutFail
            });
	})
}

function checkAs(){
    as = $('.content > * > a');
    for (var i = 0; i < $(as).length; i++) {
        if (($(as[i]).attr('href') + '').substring(0, 5) != '/edit') 
            $(as[i]).attr('href', '/edit' + $(as[i]).attr('href'));
    }
}

function initEdit(){
    moveAddDiv();
    checkAs();
    initAddNew();
    initLogin();
	if(loc != 'edit')
	   $('#piece_series').val(loc)
   else{
   	$('.gallery_thumb').removeClass('gallery_thumb');
   }
}
