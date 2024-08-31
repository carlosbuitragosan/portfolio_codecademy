/**
 * @jest-environment jsdom
 */
// above statement solves issue 'document is not defined'.

// solves error 'jest is not defined.
import { jest } from '@jest/globals';
// $ import solves issue '$ is not defined'.
import $ from 'jquery';
import { animateHeroText } from '../js/modules/heroAnimation';

// makes jQuery globally available.
global.$ = $;
global.jQuery = $;

// mock textillate function. Solves error 'textillate is not a function (from animateHeroText).
const textillateMock = jest.fn().mockImplementation(() => ({
    in: jest.fn(),
}));

$.fn.textillate = textillateMock;

// makes variables globally available.
let $window;
let $heroText;

const setupDOM = () => {
    document.body.innerHTML = `<div class="hero">
      <div class="hero__text_container">
        <h1 class="hero__title">
          <span class="hero__text">Web</span>
          <span class="hero__text">Developer</span>
        </h1>
      </div>
    </div>`;
    $window = $(window);
    $heroText = $('.hero__text');
};

// clear environment after each test
afterEach(() => {
    textillateMock.mockClear();
    textillateMock().in.mockClear();
    $(window).off('scroll');
});

describe('hero text', () => {
    beforeEach(() => {
        setupDOM();
        animateHeroText();
    });
    test('textillate is called to animate text on page load', () => {
        expect(textillateMock).toHaveBeenCalled();
    });
});
