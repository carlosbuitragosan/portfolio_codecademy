import { logoAnimation } from './modules/logoAnimation.js';
import { heroAnimation } from './modules/heroAnimation.js';
import { burgerMenuToggle } from './modules/burgerMenuToggle.js';
import { headerAnimation } from './modules/headerAnimation.js';
import { introAnimation } from './modules/introAnimation.js';

$(document).ready(() => {
    logoAnimation();
    heroAnimation();
    burgerMenuToggle();
    headerAnimation();
    introAnimation();
});
