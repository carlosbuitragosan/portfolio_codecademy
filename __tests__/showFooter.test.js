import $ from 'jquery';
import { jest, beforeEach, it, afterEach } from '@jest/globals';
import { showFooter } from '../js/modules/showFooter.js';

global.$ = $;
global.jQuery = $;

let $footer;
let $main;
let $sentinel;
let observerCallback;
let footerHeight;
let mainCssMock;
let fotterCssMock;

// mock dom
const setupDOM = () => {
    document.body.innerHTML = `
    <main class="main">
    <div class="sentinel"></div>
    </main>
    <footer class="footer"></footer>
   `;
    $footer = $('.footer');
    $main = $('.main');
    $sentinel = $('.sentinel');
};

beforeEach(() => {
    setupDOM();

    // mock the IntesectionObserver
    global.IntersectionObserver = jest.fn(function (callback) {
        observerCallback = callback;
        this.observe = jest.fn();
        this.disconnect = jest.fn();
    });

    // mock values
    footerHeight = 240;

    // mock footer outerheight()
    jest.spyOn($footer, 'outerHeight').mockReturnValue(footerHeight);

    // mock main css
    mainCssMock = jest.spyOn($main, 'css');

    // mock fotter css
    fotterCssMock = jest.spyOn($footer, 'css');

    // call the function to be tested
    showFooter($main, $sentinel, $footer);
});

afterEach(() => {
    delete global.IntersectionObserver;
    jest.restoreAllMocks();
});

describe('showFooter()', () => {
    it('adds the footer height as bottom margin to main content', () => {
        // verify the style has been added
        expect(mainCssMock).toHaveBeenCalledWith(
            'margin-bottom',
            `${footerHeight}px`
        );
    });

    it('detects intersection and adds z-index to footer', () => {
        //  mock intersection values
        const mockEntry = {
            isIntersecting: true,
            target: $sentinel[0],
        };

        expect(observerCallback).toBeDefined();

        // simulate intersection
        observerCallback([mockEntry], {});

        expect(fotterCssMock).toHaveBeenCalledWith('z-index', '3');
    });

    it('adds z-index to footer on exit intersection', () => {
        //  mock intersection values
        const mockEntry = {
            isIntersecting: false,
            target: $sentinel[0],
        };

        // simulate intersection
        observerCallback([mockEntry], {});
        expect(fotterCssMock).toHaveBeenCalledWith('z-index', '-1');
    });

    it('updates main margin on window resize', () => {
        // simulate resize event
        $(window).trigger('resize');

        expect(mainCssMock).toHaveBeenCalled();
    });
});
