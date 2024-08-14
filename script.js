// TITLE ANIMATION
$(document).ready(() => {
    // TITLE ANIMATION
    $('.logo').textillate({
        in: {
            effect: 'bounceInDown',
            delay: 50,
        },
    });

    // TOGGLE DROPDOWN MENU IN MOBILE
    $('.burger__menu input').on('change', function () {
        if ($(this).is(':checked')) {
            $('.navbar').removeClass('hide').addClass('show');
        } else {
            $('.navbar').removeClass('show').addClass('hide');
        }
    });
});
