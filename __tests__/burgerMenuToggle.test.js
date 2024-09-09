import $ from 'jquery';
import { beforeEach, describe, jest } from '@jest/globals';
import { burgerMenuToggle } from '../js/modules/burgerMenuToggle';

global.$ = $;
global.jQuery = $;

let $burgerMenu;
let $burgerMenuInput;
let $navbar;

const setupDom = () => {
    document.body.innerHTML = ` <label class="burger__menu">
  <input type="checkbox"/></label>
  <nav class="navbar"></nav>`;
};

beforeAll(() => {
    setupDom();
    $burgerMenu = $('.burger__menu');
    $burgerMenuInput = $('.burger__menu input');
    $navbar = $('.navbar');
});

beforeEach(() => {
    burgerMenuToggle($burgerMenuInput);
    // reset the state of the checkbox
    $burgerMenu.find('input').prop('checked', false).trigger('change');
    $navbar.removeClass('show hide');
});

describe('Burger menu', () => {
    test('It should display the burger menu when the checkbox is checked', () => {
        $burgerMenu.find('input').prop('checked', true).trigger('change');

        expect($navbar.hasClass('show')).toBe(true);
        expect($navbar.hasClass('hide')).toBe(false);
    });

    test('It should hide the burger menu when the checkbox is unchecked', () => {
        $burgerMenu.find('input').prop('checked', false).trigger('change');

        expect($navbar.hasClass('show')).toBe(false);
        expect($navbar.hasClass('hide')).toBe(true);
    });
});
