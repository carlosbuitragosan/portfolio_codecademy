import { afterEach, describe, jest } from '@jest/globals';
import $ from 'jquery';

import { fadeInDownText } from '../js/modules/logoAnimation';

global.$ = $;
global.jQuery = $;

describe('Logo animation', () => {
    let $logoTitle;

    beforeEach(() => {
        $.fn.textillate = jest.fn();
        $('body').append('<h1 class="logo__title"></h1>');
        $logoTitle = $('.logo__title');
    });

    afterEach(() => {
        $('body').empty();
    });

    test('logo becomes visible and animates on page load', () => {
        fadeInDownText($logoTitle);

        expect($logoTitle.css('visibility')).toBe('visible');
        expect($.fn.textillate).toHaveBeenCalledWith({
            in: {
                effect: 'fadeInDownBig',
                delayScale: 2,
                delay: 18,
            },
        });
        expect($.fn.textillate).toHaveBeenCalledTimes(1);
    });
});
