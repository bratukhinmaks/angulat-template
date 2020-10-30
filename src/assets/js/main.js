jQuery(document).on('ready', function ($) {
    "use strict";

    $('body').scrollspy({
        target: '.bs-example-js-navbar-scrollspy',
        offset: 50
    });

    $("#mainmenu-area").sticky({
        topSpacing: 0
    });

    $(window).stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalScrolling: false
    });

    $('a.scrolltotop, .slider-area h3 a, .navbar-header a, ul#nav a').on('click', function (event) {
        var id = $(this).attr("href");
        var offset = 40;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });

    $(window).on("scroll", function () {
        var $totalHeight = $(window).scrollTop();
        var $scrollToTop = $(".scrolltotop");
        if ($totalHeight > 300) {
            $scrollToTop.fadeIn();
        } else {
            $scrollToTop.fadeOut();
        }
        if ($totalHeight + $(window).height() === $(document).height()) {
            $scrollToTop.css("bottom", "90px");
        } else {
            $scrollToTop.css("bottom", "20px");
        }
    });

    $('.food-menu-list').mixItUp();

    $('.menu-discount-offer').owlCarousel({
        merge: true,
        video: true,
        items: 1,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplay: false,
        autoplayTimeout: 2000,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.team-slider').owlCarousel({
        merge: true,
        video: true,
        items: 1,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplay: false,
        autoplayTimeout: 2000,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    $('.food-menu-list.food-menu-slider').owlCarousel({
        smartSpeed: 1000,
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplay: true,
        autoplayTimeout: 3000,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    var feed = new Instafeed({
        get: 'user',
        userId: 3287251940,
        accessToken: '3287251940.4ac71b3.d88be01ca9c94e2e8a2d923fe0a5169e',
        target: 'instagram',
        limit: 10, //max 60 images..
        resolution: 'standard_resolution',
        after: function () {
            var el = document.getElementById('instagram');
            if (el.classList)
                el.classList.add('show');
            else
                el.className += ' ' + 'show';
        }
    });
    feed.run();

    new WOW().init();

}(jQuery));

jQuery(window).on('load', function () {
    $(".preloader").fadeOut(1000);
});
