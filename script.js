// TITLE ANIMATION
$(document).ready(() => {
    $('.logo').textillate({
        in: {
            effect: 'fadeInDownBig',
            delay: 20,
        },
    });
});

// TOGGLE DROPDOWN MENU IN MOBILE
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger__menu input');
    const navbar = document.querySelector('.navbar');

    burgerMenu.addEventListener('change', () => {
        if (burgerMenu.checked) {
            navbar.classList.add('show');
        } else {
            navbar.classList.remove('show');
        }
    });
});
