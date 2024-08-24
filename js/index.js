import { logoAnimation } from './modules/logoAnimation.js';
import { heroAnimation, loadHeroImage } from './modules/heroAnimation.js';
import { burgerMenuToggle } from './modules/burgerMenuToggle.js';
import { headerAnimation } from './modules/headerAnimation.js';
import { introAnimation } from './modules/introAnimation.js';
import {
    skillsAnimation,
    skillsHoverEffect,
} from './modules/skillsAnimation.js';
import { footerReveal } from './modules/footerReveal.js';

$(document).ready(() => {
    logoAnimation();
    heroAnimation();
    burgerMenuToggle();
    headerAnimation();
    introAnimation();
    skillsAnimation();
    skillsHoverEffect();
    footerReveal();
});
