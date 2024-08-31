/**
 * @jest-environment jsdom
 */

// import jest when using ES modules
import { expect, jest } from '@jest/globals';
import $ from 'jquery';
import { headerAnimation } from '../js/modules/headerAnimation.js';

// makes jQuery globally available.
global.$ = $;
global.jQuery = $;

// mock textillate function
const textillateMock = jest.fn(() => ({
    in: jest.fn(),
}));

// previously: jest.mock('textillate', () => textillateMock);
$.fn.textillate = textillateMock;

let $window;
let $header;
let $logoTitle;

const setupDOM = () => {
    document.body.innerHTML = `
    <header class="header" >
    <div class="logo__container">
    <a class="logo" href="#"><h1 class="logo__title">CARLOS BUITRAGO</h1></a>
    </div>
    </header>
    `;
    $window = $(window);
    $header = $('.header');
    $logoTitle = $('.logo__title');
};

beforeAll(() => {
    global.scrollTo = jest.fn();
});

beforeEach(() => {
    setupDOM();
    headerAnimation();
});

// clear environment after each test
afterEach(() => {
    textillateMock.mockClear();
    textillateMock().in.mockClear();
    $(window).off('scroll');
});

describe('Header animation', () => {
    test('Header should hide when scrolling down past 150px', () => {
        // mock scroll to 200px
        $window.scrollTop(200).trigger('scroll');
        expect($header.is(':hidden')).toBe(true);
    });

    test('Header should show when scrolling back up to 150px or less', () => {
        $window.scrollTop(200).trigger('scroll');
        $window.scrollTop(100).trigger('scroll');
        expect($header.css('display')).toBe('block');
    });
});

describe('Logo animation', () => {
    test('textillate should be called to animate logo on page load', () => {
        expect(textillateMock).toHaveBeenCalled();
    });

    test('textillate should be called to animate logo when scrolling back and header comes into view.', () => {
        $window.scrollTop(200).trigger('scroll');
        $window.scrollTop(100).trigger('scroll');
        expect(textillateMock).toHaveBeenCalled();
    });
});
