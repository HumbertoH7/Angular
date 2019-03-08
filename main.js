$(".burguer").click(function() {
    $(this).toggleClass("is-active");
    $(".navBar").toggleClass("is-active");
    /*$(".navMobile").toggle();*/
    if ($(this).hasClass("is-active")) {
        $(".navMobile").animate({top: '5vh'});
    } else {
        $(".navMobile").animate({top: '-120'});        
    }
})
