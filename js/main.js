"use strict";
jQuery(document).ready(function ($) {
    new WOW().init();
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 0)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('#scrollUp').fadeIn('slow');
        } else {
            $('#scrollUp]').fadeOut('slow');
        }
    });
    $('#scrollUp').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });
    $('.fancybox').fancybox();
    $(window).load(function () {
        $("#loading").fadeOut(500);
    });

    //DOM STRINGS OBJECT
        const DOM = {
            timelineDate: document.querySelectorAll('.timeline__date'),
            timelineElem: document.querySelectorAll('.timeline__elem'),
            timelineBar: document.querySelector('.timeline__bar')
        };
        //TIMELINE ELEM SET DIRECTION TO EVENT ITEMS (left or right oriented)
        //getting direction from .timeline-elem
        const __getDir = timelineElem => {
            if (timelineElem.classList.contains('timeline__elem--left')) {
                return 'left'
            } else if (timelineElem.classList.contains('timeline__elem--right')) {
                return 'right'
            }
        };
        const setDirEvent = () => {
            DOM.timelineElem.forEach(elem => {
                const direction = __getDir(elem);
                const timelineEvent = elem.querySelector('.timeline__event');
                timelineEvent.classList.add(`timeline__event--${direction}`);
            });
        };
        //TIMELINE ELEM DATE STYLES (background)
        const __getBGImage = () => {
            const compStyle = getComputedStyle(DOM.timelineBar);
            return compStyle.backgroundImage;
        };
        const __getBGSize_height = () => {
            const timebarHeight = DOM.timelineBar.offsetHeight;
            return timebarHeight;
        }
        const __getBGPos_y = (dateElem) => {
            const timelinebarBox = DOM.timelineBar.getBoundingClientRect();
            const dateBox = dateElem.getBoundingClientRect();
            const pos_y = dateBox.top - timelinebarBox.top;
            return pos_y;
        }

        const setDateBG = () => {
            const bgImg = __getBGImage();
            const bgHeight = __getBGSize_height();
            DOM.timelineDate.forEach(elem => {
                //setting bgImage
                elem.style.backgroundImage = bgImg;
                //setting bgSize
                elem.style.backgroundSize = `100% ${bgHeight}px`;
                //setting bgPosition
                const dateOffset = __getBGPos_y(elem);
                elem.style.backgroundPosition = `0 -${dateOffset}px`;
            });
        };
        //ONLOAD FUNCTION
        window.addEventListener('load', () => {
            //setting direction class to the timeline event block
            setDirEvent();
            //set date background styles
            setDateBG();
        });


});