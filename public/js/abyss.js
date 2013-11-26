var height;
var width;
var nextPage;
var loc;
var debug;
var fitTime = 350;
var opacityTime = 50;
jQuery.event.add(window, 'resize', resize);
jQuery.event.add(window, 'load', init);

function fadeTo(){
    window.location = nextPage;
}

function bindArrows(){
    $('#gallery-left').bind('click', function(){
        var mainImg = $('#main-image').children('img');
        var src = mainImg.attr('src') + "";
        src = src.split('-');
        num = parseInt(src[1]);
        if (num > 1) {
            num--;
        }
        else {
            num = $('.thumbs').length;
        }
        src = src[0];
        mainImg.animate({
            opacity: 0
        }, opacityTime);
        window.setTimeout(function(){
            mainImg.attr('src', src + '-' + num + '.png');
        }, opacityTime + 10);
        window.setTimeout(function(){
            fitImage(mainImg);
        }, fitTime);
    });
    $('#gallery-right').bind('click', function(){
        var mainImg = $('#main-image').children('img');
        var src = mainImg.attr('src') + "";
        src = src.split('-');
        num = parseInt(src[1]);
        if (num < $('.thumbs').length) {
            num++;
        }
        else {
            num = 1;
        }
        src = src[0];
        mainImg.animate({
            opacity: 0
        }, opacityTime);
        window.setTimeout(function(){
            mainImg.attr('src', src + '-' + num + '.png');
        }, opacityTime + 10);
        window.setTimeout(function(){
            fitImage(mainImg);
        }, fitTime);
    });
}

function fillGallery(gallery){
    //Put arrows up
    var img = document.createElement("IMG");
    img.src = "images/arrow_left.png";
    img.setAttribute('alt', 'left');
    img.setAttribute('id', 'gallery-left');
    img.setAttribute('class', 'arrow');
    document.getElementById('container').appendChild(img);
    img = document.createElement("IMG");
    img.src = "images/arrow_right.png";
    img.setAttribute('alt', 'right');
    img.setAttribute('id', 'gallery-right');
    img.setAttribute('class', 'arrow');
    document.getElementById('container').appendChild(img);
    bindArrows();
    //Fix extension based off gallery
    var extension = '.png';
    var numImgs = 36;
    if (gallery == 'entries') {
        numImgs = 32;
    }
    //making main image
    var div = document.createElement("DIV");
    div.setAttribute('id', 'main-image');
    var img = document.createElement("IMG");
    img.src = "images/" + gallery + '/img-1' + extension;
    img.setAttribute('title', '');
    img.setAttribute('id', 'img' + 1);
    div.appendChild(img);
    document.getElementById(gallery + '-gallery').appendChild(div);
	var div = document.createElement("DIV");
	document.getElementById(gallery + '-gallery').appendChild(div);
    div.setAttribute('id', 'discription');
    var mainImg = $('#main-image').children('img');
    mainImg.animate({
        opacity: 0
    }, opacityTime);
    window.setTimeout(function(){
        fitImage(mainImg);
    }, fitTime);
    div = document.createElement("DIV");
    div.setAttribute('id', 'thumbs');
    for (var i = 1; i <= numImgs; i++) {
		$.get("/images/" + gallery + '/thumbs/img-' + i + extension, function(data){
		});
        var img = document.createElement("IMG");
        img.src = "images/" + gallery + '/thumbs/img-' + i + extension;
        img.setAttribute('title', 'click to enlarge');
        img.setAttribute('class', 'thumbs');
        img.setAttribute('id', 'img' + i);
        div.appendChild(img);
    }
    document.getElementById(gallery + '-gallery').appendChild(div);
    clickImages();
    window.setTimeout('resize();', 500);
}

function clickImages(){
    var imgs = $('#thumbs').children('img');
    for (var i = 0; i < imgs.length; i++) {
        $(imgs[i]).bind('click', function(){
            var src = $(this).attr('src') + "";
            src = src.split('\/thumbs');
            src = src[0] + src[1];
            var mainImg = $('#main-image').children('img');
            mainImg.animate({
                opacity: 0
            }, opacityTime);
            window.setTimeout(function(){
                mainImg.attr('src', src);
            }, opacityTime + 10);
            window.setTimeout(function(){
                fitImage(mainImg);
            }, fitTime);
            $('html, body').animate({
                scrollTop: $('#main-image').offset().top - 30
            }, 100);
        });
    }
}

function fitImage(mainImg){
	var ajax = 'discription/'+loc.split('.html')[0]+'/dis-'+mainImg.attr('src').split('-')[1].split('.')[0]+'.txt';
//	alert(ajax);
	$.get(ajax,function(data){
		$('#discription').html("<p>"+data+"</p>");
	});
    if (mainImg.width() > mainImg.height()) {
        mainImg.width(600);
        mainImg.height('auto');
    }
    if (mainImg.height() > 400) {
        mainImg.height(400);
        mainImg.width('auto');
    }
    if (mainImg.height() > 300) {
        mainImg.css('top', 0);
    }
    else {
        mainImg.css('top', 200 - (mainImg.height() / 2));
    }
    mainImg.animate({
        opacity: 1
    }, opacityTime);
}

function navbar(){
    var pages = $('#navbar').children('img')
    for (var i = 0; i < pages.length; i++) {
        $(pages[i]).bind('click', function(){
            $('#container').animate({
                opacity: 0
            }, 100);
            nextPage = "/" + $(this).attr('id') + '.html';
            window.setTimeout("fadeTo()", 105);
        });
        if ($(pages[i]).attr('id') + '.html' == loc) 
            $(pages[i]).addClass('currentPage');
    }
    
}

function putHeader(){
    var a = document.createElement("A");
    a.setAttribute("href", "/index.html");
    var img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/header.png";
    img.setAttribute("alt", "ART + DESIGN INTO THE ABYSS");
    a.appendChild(img);
    document.getElementById("header").appendChild(a);
}

function putFooter(){
    //OCEANOGRAPHY
    a = document.createElement("A");
    a.setAttribute("href", "http://www.oceanography.lsu.edu/");
    a.setAttribute("class", "logos");
    img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/docslogo.png";
    img.style.width = "80px";
    img.style.height = "87px";
    img.setAttribute("alt", "Department of Oceanography");
    a.appendChild(img);
    document.getElementById("footer").appendChild(a);
    //SOA
    var a = document.createElement("A");
    a.setAttribute("href", "http://www.art.lsu.edu");
    a.setAttribute("class", "logos");
    var img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/soalogo.png";
    img.setAttribute("alt", "School of Art");
    img.style.paddingBottom = "25px";
    img.style.width = "162px";
    img.style.height = "auto";
    a.appendChild(img);
    document.getElementById("footer").appendChild(a);
    //IN DEEP
    a = document.createElement("A");
    a.setAttribute("href", "http://www.indeep-project.org/");
    a.setAttribute("class", "logos");
    img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/indeep_logo.png";
    img.setAttribute("alt", "In Deep");
    img.style.paddingBottom = "0px";
    img.style.width = "108px";
    img.style.height = "auto";
    a.appendChild(img);
    document.getElementById("footer").appendChild(a);
    //COMARGE
    var a = document.createElement("A");
    a.setAttribute("href", "http://www.ifremer.fr/comarge/en/index.html");
    a.setAttribute("class", "logos");
    var img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/comarge_logo.png";
    img.setAttribute("alt", "COMARGE");
    img.style.width = "180px";
    img.style.height = "auto";
    img.style.paddingBottom = "0px";
    a.appendChild(img);
    document.getElementById("footer").appendChild(a);
    //SLOAN
    var a = document.createElement("A");
    a.setAttribute("href", "http://www.sloan.org/");
    a.setAttribute("class", "logos");
    var img = document.createElement("IMG");
    img.setAttribute("class", "link");
    img.src = "/images/apsloan_logo.png";
    img.setAttribute("alt", "Alfred P. Sloan Foundation");
    img.style.width = "81px";
    img.style.height = "auto";
    img.style.paddingBottom = "0px";
    a.appendChild(img);
    document.getElementById("footer").appendChild(a);
    //GDSO
    //© 2011 LSU School of Art    ¥    Design by LSU Graphic Design Student Office
    a = document.createElement("A");
    a.setAttribute("href", "http://yeswekern.org");
    a.setAttribute("class", "logos");
	a.innerHTML = "Design by LSU Graphic Design Student Office";
    img = document.createElement("P");
    img.innerHTML = "&copy 2011 LSU School of Art &nbsp&nbsp&nbsp&nbsp&nbsp<strong>&middot</strong>&nbsp&nbsp&nbsp&nbsp&nbsp";
    img.setAttribute("id", "gdso");
	img.appendChild(a);
    document.getElementById("footer").appendChild(img);
//    document.getElementById("footer").appendChild(a);
}

function putNavbar(){
    //Exhibtion
    var h3 = document.createElement('IMG');
    h3.setAttribute('id', 'exhibition');
    if (loc == h3.getAttribute('id') + '.html') 
        h3.src = '/images/exhibition_btnover.png';
    else {
        h3.src = '/images/exhibition_btn.png';
        h3.addEventListener('mouseover', function(){
            this.src = '/images/exhibition_btnover.png';
        }, false);
        h3.addEventListener('mouseout', function(){
            this.src = '/images/exhibition_btn.png'
        }, false);
    }
    document.getElementById("navbar").appendChild(h3);
    if (loc == 'exhibition.html' || loc == 'event.html' || loc == 'entries.html') {
        //Entries
        h3 = document.createElement('IMG');
        h3.setAttribute('id', 'entries');
        h3.setAttribute('alt', 'Entries');
        h3.setAttribute('class', 'exhibition-sub');
        if (loc == h3.getAttribute('id') + '.html') {
            h3.src = '/images/entries_btnover.png';
        }
        else {
            h3.src = '/images/entries_btn.png';
            h3.addEventListener('mouseover', function(){
                this.src = '/images/entries_btnover.png';
            }, false);
            h3.addEventListener('mouseout', function(){
                this.src = '/images/entries_btn.png';
            }, false);
        }
        document.getElementById("navbar").appendChild(h3);
        //The Event
        h3 = document.createElement('IMG');
        h3.setAttribute('id', 'event');
        h3.setAttribute('alt', 'Event');
        h3.setAttribute('class', 'exhibition-sub');
        if (loc == h3.getAttribute('id') + '.html') {
            h3.src = '/images/event_btnover.png';
        }
        else {
            h3.src = '/images/event_btn.png';
            h3.addEventListener('mouseover', function(){
                this.src = '/images/event_btnover.png';
            }, false);
            h3.addEventListener('mouseout', function(){
                this.src = '/images/event_btn.png';
            }, false);
        }
        document.getElementById("navbar").appendChild(h3);
    }
    //Lecture Series
    h3 = document.createElement('IMG');
    h3.setAttribute('id', 'lecture');
    h3.setAttribute('alt', 'Lecture Series');
    if (loc == h3.getAttribute('id') + '.html') {
        h3.src = '/images/lecture_btnover.png';
    }
    else {
        h3.src = '/images/lecture_btn.png';
        h3.addEventListener('mouseover', function(){
            this.src = '/images/lecture_btnover.png';
        }, false);
        h3.addEventListener('mouseout', function(){
            this.src = '/images/lecture_btn.png';
        }, false);
    }
    document.getElementById("navbar").appendChild(h3);
    //About
    h3 = document.createElement('IMG');
    h3.setAttribute('id', 'about');
    h3.setAttribute('alt', 'About the Show');
    if (loc == h3.getAttribute('id') + '.html') {
        h3.src = '/images/about_btnover.png';
    }
    else {
        h3.src = '/images/about_btn.png';
        h3.addEventListener('mouseover', function(){
            this.src = '/images/about_btnover.png';
        }, false);
        h3.addEventListener('mouseout', function(){
            this.src = '/images/about_btn.png';
        }, false);
    }
    document.getElementById("navbar").appendChild(h3);
}

function resize(){
    width = $(window).width();
    var top = $("#header").height() + 95;
    var leftAlign = width / 2 - 385;
    $("#header").css("left", leftAlign - 100);
    $("#navbar").css("left", leftAlign - 95);
    $("#container").css("top", top - 28);
    $("#container").css("left", leftAlign + 150);
    //$("#show").css("top", 0);
    $("#lecture").css("top", $("#show").height() + 50);
    //$("#show").css("left", 110);
    $("#lecture").css("left", 110);
    //    $("#competition").css("top", 0);
    //	$("#competition").css("left", leftAlign+50);
    $("#footer").css("left", leftAlign - 100);
    $("#footer").css("top", height + top + 50);
}

function initVideos(){
    var vids = $('#video-thumbnails').children('a');
    for (i = 0; i < vids.length; i++) {
        $(vids[i]).bind('click', function(){
            $("#video").attr('src', $(this).children('img').attr('alt'));
        });
    }
}

function init(){
    if (jQuery.browser.msie) {
        $('#container').remove();
        $('#links').css('display', 'inline-block');
        $('#links').css('top', 100);
        $('#links').css('left', 400);
        $('#links').html('<p>Into the Abyss only supports these browers:</p><br/><br/><br/>' + $('#links').html());
        var links = $('#links').children('a');
        $(links[0]).attr('href', 'http://www.mozilla.com/en-US/products/download.html');
        $(links[0]).children('h4').text('Firefox');
        $(links[0]).children('h4').css('left', '190');
        $(links[0]).children('img').attr('src', 'images/firefox-logo.png');
        $(links[1]).children('h4').css('left', '360');
        $(links[1]).children('h4').text('Safari');
        $(links[1]).attr('href', 'http://www.apple.com/safari/download');
        $(links[1]).children('img').attr('src', 'images/safari-logo.png');
        $(links[2]).attr('href', 'http://www.google.com/chrome');
        $(links[2]).children('img').attr('src', 'images/chrome-logo.png');
        $(links[2]).children('h4').text('Chrome');
        $(links[2]).children('h4').css('left', '500');
    }
    else {
        $('#container').css('opacity', '0');
        $('#container').animate({
            opacity: 1
        }, 100);
        loc = window.location + '';
        loc = loc.split('/');
        loc = loc[loc.length - 1];
        if (loc == 'index.html' || loc == '') 
            height = 650;
        else 
            height = $(document).height();
        width = $(document).width();
        var div = document.createElement('div');
        div.setAttribute('id', 'header');
        div.setAttribute('class', 'header border-bottom');
        document.getElementsByTagName('body').item(0).appendChild(div);
        putHeader();
        div = document.createElement('div');
        div.setAttribute('id', 'footer');
        div.setAttribute('class', 'link border-top');
        document.getElementsByTagName('body').item(0).appendChild(div);
        putFooter();
        div = document.createElement('div');
        div.setAttribute('id', 'navbar');
        div.setAttribute('class', 'navbar rounded-corners');
        document.getElementsByTagName('body').item(0).appendChild(div);
        putNavbar();
        navbar();
        if (loc == 'lecute.html') {
            window.setTimeout('initVideos()', 20);
            height = $('#container').height();
        }
        else if (loc == 'entries.html') {
            window.setTimeout("fillGallery('entries');", 100);
            height = 1145;
            resize();
        }
        else if (loc == 'event.html') {
            window.setTimeout("fillGallery('event');", 100);
            height = 734;
            resize();
        }
        else {
            height = $('#container').height();
        }
        resize();
    }
    debug = window.location + '';
    if (debug.split(':')[0] == 'file') 
        debug = true;
    else 
        debug = false;
    if (debug) {
        debugLinks();
    }
}

function debugLinks(){
    imgs = $('img');
    for (var i = 0; i < $(imgs).length; i++) {
        $(imgs[i]).attr('src', $(imgs[i]).attr('src').replace('\/images', 'images'));
    }
}
