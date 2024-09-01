/**
 * @jest-environment jsdom
 */
import { headerAnimation } from '../js/modules/headerAnimation.js';
import {
    textillateMock,
    setupDOM,
    setupMocks,
    clearMocks,
} from '../utils/testUtils.js';

let $window;
let $header;

const html = `
    <header class="header" >
    <div class="logo__container">
    <a class="logo" href="#"><h1 class="logo__title">CARLOS BUITRAGO</h1></a>
    </div>
    </header>
    `;

beforeAll(() => {
    setupMocks();
});

beforeEach(() => {
    setupDOM(html);
    $window = $(window);
    $header = $('.header');
    headerAnimation();
});

// clear environment after each test
afterEach(() => {
    clearMocks();
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
