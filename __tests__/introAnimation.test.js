import { beforeEach, describe, expect, jest } from '@jest/globals';
import $ from 'jquery';
import { fadeInUpText } from '../js/modules/introAnimation';

global.$ = $;
global.jQuery = $;

let $introText;
let observerCallback;
let observeMock;
let unobserveMock;

const setupDOM = () => {
    document.body.innerHTML = `<section class="intro__wrapper">
        <p class="intro__text"></p>
      </section>`;
};

// mocked as a jquery plugin
$.fn.textillate = jest.fn();

beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn(function (callback) {
        observerCallback = callback;
        this.observe = observeMock;
        this.unobserve = unobserveMock;
        this.disconnect = jest.fn();
    });

    setupDOM();
    $introText = $('.intro__text');
    fadeInUpText($introText);
});

afterEach(() => {
    jest.clearAllMocks();
    observerCallback = null;
});

describe('Intro text animation', () => {
    test('Intersection observer should start observing for element', () => {
        expect(observeMock).toHaveBeenCalledWith($introText[0]);
    });

    test('textillate animation should not trigger if element not intersected', () => {
        expect($.fn.textillate).not.toHaveBeenCalled();
    });

    test('textillate animation should trigger when element intersects', () => {
        expect(observerCallback).toBeDefined();

        // simulate intersection
        if (observerCallback) {
            // pass a mock entry to simulate intersection
            const mockEntry = { isIntersecting: true, target: $introText[0] };
            observerCallback([mockEntry], { unobserve: jest.fn() });
        }

        expect($.fn.textillate).toHaveBeenCalledWith({
            in: {
                effect: 'fadeInUp',
                sync: true,
            },
        });
    });

    it('when element goes out of view textillate animation is not triggered.', () => {
        // simulate intersection
        if (observerCallback) {
            const mockEntry = { isIntersecting: false, target: $introText[0] };
            observerCallback([mockEntry], { unobserve: jest.fn() });
        }

        expect($.fn.textillate).not.toHaveBeenCalled();
    });
});
