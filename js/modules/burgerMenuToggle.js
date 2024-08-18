export function burgerMenuToggle() {
    $('.burger__menu input').on('change', function () {
        $('.navbar')
            .toggleClass('show', $(this).is(':checked'))
            .toggleClass('hide', !$(this).is(':checked'));
    });
}
