/**
 * @jest-environment jsdom
 */

// import jest when using ES modules
import { expect, jest } from '@jest/globals';
import $ from 'jquery';
import { headerAnimation } from '../js/modules/headerAnimation.js';

global.$ = $;
global.jQuery = $;

const textillateMock = jest.fn(() => ({
    in: jest.fn(),
}));

jest.mock('textillate', () => textillateMock);

let $window;
let $header;
let $logoTitle;

beforeAll(() => {
    global.scrollTo = jest.fn();
});

beforeEach(() => {
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

    headerAnimation();
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
    beforeEach(() => {
        // Reset the mock state after each test
        textillateMock.mockClear();
        textillateMock().in.mockClear();
    });

    test('textillate should be called to animate logo on page load', () => {
        $(document).ready(() => {
            expect(textillateMock).toHaveBeenCalled();
        });
    });

    test('textillate should be called to animate logo when scrolling back and header comes into view.', () => {
        $window.scrollTop(200).trigger('scroll');
        $window.scrollTop(100).trigger('scroll');

        expect(textillateMock).toHaveBeenCalled();
    });
});
