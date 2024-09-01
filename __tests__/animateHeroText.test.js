import $ from 'jquery';
import { jest } from '@jest/globals';
import { animateHeroText } from '../js/modules/heroAnimation';
// makes jQuery globally available.
global.$ = $;
global.jQuery = $;

const textillateMock = jest.fn(() => ({
    in: jest.fn(),
}));

jest.mock('textillate', () => textillateMock);

const setupDOM = () => {
    document.body.innerHTML = `
  <div class="hero">
      <div class="hero__text_container">
        <h1 class="hero__title">
          <span class="hero__text">Web</span>
          <span class="hero__text">Developer</span>
        </h1>
      </div>
    </div>`;
};

describe('hero text', () => {
    // previously: jest.mock('textillate', () => textillateMock) which only used with imports.
    $.fn.textillate = textillateMock;
    setupDOM();
    animateHeroText();

    test('textillate is called to animate text on page load', () => {
        expect(textillateMock).toHaveBeenCalled();
    });
});
