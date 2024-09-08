import { logoAnimation } from './modules/logoAnimation.js';
import {
    animateHeroText,
    heroImageAnimation,
} from './modules/heroAnimation.js';
import { burgerMenuToggle } from './modules/burgerMenuToggle.js';
import { headerAnimation } from './modules/headerAnimation.js';
import { introAnimation } from './modules/introAnimation.js';
import {
    skillsHoverEffect,
    skillsAnimation,
    itemsInitialPosition,
} from './modules/skillsAnimation.js';
import { footerReveal } from './modules/footerReveal.js';

const container = document.querySelector('.skills__container');
const gridItems = document.querySelectorAll('.skills__category');

heroImageAnimation();
itemsInitialPosition(container, gridItems);
logoAnimation();
animateHeroText();
burgerMenuToggle();
headerAnimation();
introAnimation();
skillsAnimation(container, gridItems);
skillsHoverEffect(gridItems);
footerReveal();
