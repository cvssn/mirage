function animLastGames() {
    $.isLastGameOpen = true;

    $('body').on('click', '.close-games-button', function() {
        if ($.isLastGameOpen === false) {
            $('.last-games').css({'transform': 'translate(0)', 'transition-duration' : '1s'}).removeClass('closed');
            $('.close-games-button').css('transform', 'rotate(0)');

            $.isLastGameOpen = true;
        } else {
            $('.last-games').css({'transform': 'translate(-90%)', 'transition-duration' : '1s'}).add('closed');
            $('.close-games-button').css('transform', 'rotate(-45deg)');

            $.isLastGameOpen = false;
        }
    });
}

function animActus() {
    /* animação para a seção de notícias */
    $.isActuOpen = true;

    $('.close-button').off('click');
    $('.close-games-button').off('click');

    $('body').on('click', '.close-button', function() {
        if ($.isActuOpen === false) {
            $('.news-block').css({'transform': 'translate(0)', 'transition-duration' : '1s'}).removeClass('closed');
            $('.close-button').css('transform', 'rotate(0)');

            $.isActuOpen = true;
        } else {
            $('.news-block').css({'transform': 'translate(-90%)', 'transition-duration' : '1s'}).add('closed');
            $('.close-button').css('transform', 'rotate(-45deg)');

            $.isActuOpen = false;
        }
    });

    /**
     * animação de notícias em formato de apresentação de slides
     * vertical (a cada 10 segundos)
     */
    const divNewsBox = $('div.news-box');
    const count = divNewsBox.find('div.actu-slide-content').length;

    if (count > 1) {
        let current = 0;

        setInterval(function() {
            current++;

            if (current === count) {
                current = 0;

                divNewsBox.find('#slides-container').animate({
                    "top": '-' + 0 + 'px'
                }, 1000);
            } else {
                divNewsBox.find('#slides-container').animate({
                    "top": '-' + (220 * current) + 'px'
                }, 1000);
            }
        }, 10000);
    }
}

function handle_filter(){
    let child_mode = localStorage.getItem('child_mode');
    let anim_mode = localStorage.getItem('anim_mode');

    if (child_mode === 'true'){
        $('#tgl-enfant').prop('checked', true);
    } else{
        localStorage.setItem('child_mode',"false");

        $('#tgl-enfant').prop('checked', false);
    }

    if (anim_mode === 'false'){
        localStorage.setItem('anim_mode',"false");
    } else {
        localStorage.setItem('anim_mode',"true");

        $('#tgl-animations').prop('checked', true);
    }
}

function changeLocale(locale) {
    let dns = location.origin;
    let tmp = dns.split('.');

    tmp[0] = window.location.protocol + '//' + locale;

    dns = tmp.join('.');

    window.location.href = dns;
}

function childFilter() {
    if ($('#tgl-enfant').is(':checked') === false) {
        localStorage.setItem('child_mode', 'false');

        $('#cm').val('false');
    } else {
        localStorage.setItem('child_mode', 'true');

        $('#cm').val('true');
    }
}

function animFilter() {
    if ($('#tgl-animations').is(':checked') === false) {
        localStorage.setItem('anim_mode', 'false');

        $('#anim').val('false');
    } else {
        localStorage.setItem('anim_mode', 'true');

        $('#anim').val('true');
    }
}

$(window).on('load', function() {
    animLastGames();
    animActus();

    $("#back2Top").click(function(event) {
        event.preventDefault();

        $("html, body").animate({ scrollTop: 0 }, "slow");

        return false;
    });

    /* rolar para o topo ao clicar na seta para cima fim */
    /* menu de idiomas */
    $('.lang-switcher').click(function() {
        $('.dropdown-lang').toggleClass("show");
        $('.lang-selected').toggleClass("flipped");
    });

    $('.dropdown-lang li').click(function() {
        let langClass = $(this).find('span.flag-icon').attr("class");
        let langText = $(this).find('a').text();

        $('.lang-selected .flag-icon').removeClass().addClass(langClass);
        $('.lang-selected .lang-label').text(langText);
    });

    /* smoke */
    let $mouseX = 0, $mouseY = 0;

    function parallax(e, element, baseX, baseY, layer) {
        const strength = 100;

        $mouseX = baseX + ((e.pageX + $element.offset().left) / strength) / layer;
        $mouseY = baseY + ((e.pageY + $element.offset().top) / strength) / layer;
        
        $element.css('transform', 'translate3d(' + $mouseX + 'px, ' + $mouseY + 'px, 0)');
        
        return false;
    }

    function start_position(target, baseX, baseY) {
        let $winHeight = $(window).height();
        let $winWidth = $(window).width();

        let $element = $('#parallax-overlay .' + target);

        let $posX = baseX + ($winWidth + $element.offset().left) / 100;
        let $posY = baseY + ($winHeight + $element.offset().top) / 100;
        
        $element.css('transform', 'translate3d(' + $posX + 'px, ' + $posY + 'px, 0)');
        
        return false;
    }

    let par_elem = [];

    /* classe do elemento, esquerda (em pixels), topo (em pixels),
    posição da camada (velocidade de movimento) */
    par_elem[0] = ['parallax-layer-1', 600, -120, 2];
    par_elem[1] = ['parallax-layer-2', 600, -100, 1];
    par_elem[2] = ['parallax-layer-3', 0, -40, 2];
    par_elem[3] = ['parallax-layer-4', -50, -25, 1];
    par_elem[4] = ['parallax-layer-5', 500, -50, 2];
    par_elem[5] = ['parallax-layer-6', 500, -100, 1];
    par_elem[6] = ['parallax-layer-7', 0, -40, 1];

    for (let i = 0; i < par_elem.length; i++) {
        start_position(par_elem[i][0], par_elem[i][1], par_elem[i][2] + 20);
    }

    $(document).mousemove(function(e) {
        let parallaxFunc = parallax;

        for (let i = 0; i < par_elem.length; i++) {
            $element = $('#parallax-overlay .' + par_elem[i][0]);

            if ($element.css('display') !== 'none'){
                parallaxFunc(e, $element, par_elem[i][1], par_elem[i][2] + 20, par_elem[i][3]);
            }
        }
    });

    /* diamantes */
    function place_element(target, baseX, baseY, sizeWidth, placeFromLeft) {
        let element = $('.' + target);

        element.css('top', baseY);

        if (placeFromLeft)
            element.css('left', baseX);
        else
            element.css('right', baseX);

        element.find('svg').css('width', sizeWidth + 'px');

        if (sizeWidth <= 10)
            sizeWidth = sizeWidth * 2;

        element.css('height', sizeWidth + 'px');
        element.css('opacity', 0.8);
    }

    let rhombus_elem = [];

    /* classe do elemento, esquerda/direita, topo, largura em pixels
    do diamante, verdadeiro/falso (esquerda/direita) */
    rhombus_elem[0] = ['rhombus-layer-1', "12%", "-3.5%", 70, true];
    rhombus_elem[1] = ['rhombus-layer-2', "20%", "10%", 30, true];
    rhombus_elem[2] = ['rhombus-group.group-1', "8%", "18%", 50, true];
    rhombus_elem[3] = ['rhombus-layer-3', "0", "0", 15, true];
    rhombus_elem[4] = ['rhombus-layer-4', "0.3px", "-1px", 40, true];
    rhombus_elem[5] = ['rhombus-layer-5', "0", "0", 15, true];
    rhombus_elem[6] = ['rhombus-layer-6', "5%", "50%", 70, false];
    rhombus_elem[7] = ['rhombus-layer-7', "8%", "80%", 30, true];
    rhombus_elem[8] = ['rhombus-layer-8', "15%", "80%", 30, false];
    rhombus_elem[9] = ['rhombus-group.group-2', "13%", "70%", 50, true];
    rhombus_elem[10] = ['rhombus-layer-9', "0", "0", 15, true];
    rhombus_elem[11] = ['rhombus-layer-10', "0", "0", 10, true];
    rhombus_elem[12] = ['rhombus-layer-11', "0", "0", 15, true];
    rhombus_elem[13] = ['rhombus-group.group-3', "20%", "56%", 50, true];
    rhombus_elem[14] = ['rhombus-layer-12', "0", "0", 40, true];
    rhombus_elem[15] = ['rhombus-layer-13', "0.3px", "0", 15, false];
    rhombus_elem[16] = ['rhombus-group.group-4', "30%", "45%", 50, true];
    rhombus_elem[17] = ['rhombus-layer-14', "0", "0", 10, true];
    rhombus_elem[18] = ['rhombus-layer-15', "0", "0", 20, true];
    rhombus_elem[19] = ['rhombus-group.group-5', "20%", "10%", 50, false];
    rhombus_elem[20] = ['rhombus-layer-16', "0", "0", 8, true];
    rhombus_elem[21] = ['rhombus-layer-17', "0", "0", 18, true];
    rhombus_elem[22] = ['rhombus-group.group-6', "12%", "60%", 50, false];
    rhombus_elem[23] = ['rhombus-layer-18', "0.3px", "0", 20, false];
    rhombus_elem[24] = ['rhombus-layer-19', "0", "0", 42, true];
    rhombus_elem[25] = ['rhombus-group.group-7', "22%", "65%", 50, false];
    rhombus_elem[26] = ['rhombus-layer-20', "0", "0", 40, true];
    rhombus_elem[27] = ['rhombus-layer-21', "0.3px", "0", 15, false];
    rhombus_elem[28] = ['rhombus-group.group-8', "15%", "20%", 50, false];
    rhombus_elem[29] = ['rhombus-layer-22', "0", "0", 40, true];
    rhombus_elem[30] = ['rhombus-layer-23', "0", "0", 15, true];

    const rhombus = '<svg viewBox="0 0 12 12"><path class="rhombus" d="M5.9,1.2L0.7,6.5l5.2,5.4l5.2-5.4L5.9,1.2z" /></svg>';

    $(".parallax-overlay").each(
        function () {
            $(this).find('.rhombus:not(.rhombus-group)').append(rhombus);
            
            $.each(rhombus_elem, function(index, value) {
                place_element(value[0], value[1], value[2], value[3], value[4]);
            });
        }
    );

    /* ao clicar na seta para cima, volte ao início */
    $(window).scroll(function() {
        let height = $(window).scrollTop();

        if (height > 100) {
            $('#back2Top').fadeIn();
        } else {
            $('#back2Top').fadeOut();
        }
    });
});

$(window).on('resize', function() {
    if ($(this).width() <= 1738) {
        let divNewBlocks = $('div.news-block');
        let divLastGames = $('div.last-games');

        // se o bloco de notícias estiver visível, nós o fechamos para
        // não interferir com o anúncio
        if (divNewBlocks.hasClass('closed') === false) {
            divNewBlocks.addClass('closed');

            divNewBlocks.find('.close-button').trigger('click');
        }

        if (divLastGames.hasClass('closed') === false) {
            divLastGames.addClass('closed');

            divLastGames.find('.close-games-button').trigger('click');
        }
    }
});