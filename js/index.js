import { logoAnimation } from './modules/logoAnimation.js';
import { heroAnimation } from './modules/heroAnimation.js';
import { burgerMenuToggle } from './modules/burgerMenuToggle.js';
import { headerAnimation } from './modules/headerAnimation.js';
import { introAnimation } from './modules/introAnimation.js';
import {
    skillsAnimation,
    skillsHoverEffect,
} from './modules/skillsAnimation.js';
import { footerReveal } from './modules/footerReveal.js';
import { mainContentMargin } from './modules/mainMargin.js';

$(document).ready(() => {
    mainContentMargin();
    logoAnimation();
    heroAnimation();
    burgerMenuToggle();
    headerAnimation();
    introAnimation();
    skillsAnimation();
    skillsHoverEffect();
    footerReveal();
});
