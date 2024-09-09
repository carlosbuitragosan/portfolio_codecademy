import { beforeAll, describe, expect, jest } from '@jest/globals';
import $ from 'jquery';
import { backgroundRipples } from '../js/modules/heroAnimation';

// makes jQuery globally available.
global.$ = $;
global.jQuery = $;

const setupDOM = () => {
    document.body.innerHTML = `
  <div class="hero" >
      <div class="hero__text_container">
        <h1 class="hero__title">
          <span class="hero__web hero__text">Web</span>
          <span class="hero__developer hero__text">Developer</span>
        </h1>
      </div>
    </div>`;
};

$.fn.ripples = jest.fn();
let $hero;

beforeEach(() => {
    setupDOM();
    $hero = $('.hero');
    window.matchMedia = jest.fn((query) => ({
        matches: query.includes('max-width: 767px'),
    }));
});

describe('Image ripple animation', () => {
    test('Ripple animation triggers on page load', () => {
        jest.useFakeTimers();
        backgroundRipples($hero);

        expect($.fn.ripples).toHaveBeenCalled();

        jest.advanceTimersByTime(4000);
        expect($.fn.ripples).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(1000);
        expect($.fn.ripples).toHaveBeenCalledTimes(3);
    });
});
