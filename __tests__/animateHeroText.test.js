import $ from 'jquery';
import { afterEach, beforeEach, jest } from '@jest/globals';
import { bounceInText } from '../js/modules/heroAnimation';
// makes jQuery globally available.
global.$ = $;
global.jQuery = $;
$.fn.textillate = jest.fn();

const setupDOM = () => {
    document.body.innerHTML = `
          <span class="hero__text">Web</span>
          <span class="hero__text">Developer</span>`;
};

describe('hero text', () => {
    beforeEach(() => {
        setupDOM();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('textillate is called to animate text on page load', () => {
        const $heroText = $('.hero__text');

        bounceInText($heroText);
        expect($.fn.textillate).toHaveBeenCalledWith({
            initialDelay: 1200,
            in: {
                effect: 'bounceIn',
                reverse: true,
                delay: 110,
            },
        });
    });
});
