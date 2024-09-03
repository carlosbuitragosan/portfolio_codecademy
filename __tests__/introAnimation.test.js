import { beforeEach, describe, expect, jest } from '@jest/globals';
import $ from 'jquery';
import { introAnimation } from '../js/modules/introAnimation';

global.$ = $;
global.jQuery = $;

let observeMock;
let unobserveMock;
let $introText;

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
    setupDOM();
    $introText = $('.intro__text');
    // mock intersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: jest.fn(),
    }));

    introAnimation();
});

afterEach(() => {
    observeMock.mockClear();
    unobserveMock.mockClear();
    $.fn.textillate.mockClear();
});

describe('Intro text animation', () => {
    test('Intersection observer should start observing for element', () => {
        expect(observeMock).toHaveBeenCalledWith($introText[0]);
    });

    test('textillate animation should not trigger if element not intersected', () => {
        expect($.fn.textillate).not.toHaveBeenCalled();
    });

    test('textillate animation should trigger when element comes into view', () => {
        // extract intersectionObserver callback
        const intersection = IntersectionObserver.mock.calls[0][0];
        // simulate intersection
        intersection([{ target: $introText[0], isIntersecting: true }]);

        expect($.fn.textillate).toHaveBeenCalledWith({
            in: {
                effect: 'fadeInUp',
                sync: true,
            },
        });

        expect(unobserveMock).toHaveBeenCalledWith($introText[0]);
    });

    test('when element goes out of view textillate animation is not triggered.', () => {
        const intersection = IntersectionObserver.mock.calls[0][0];
        intersection([{ target: $introText[0], isIntersecting: false }]);
        expect($.fn.textillate).not.toHaveBeenCalled();
    });
});
