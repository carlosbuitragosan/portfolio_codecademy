/**
 * @jest-environment jsdom
 */
// above statement solves issue 'document is not defined'.

import { animateHeroText } from '../js/modules/heroAnimation';
import { textillateMock, setupDOM, setupMocks } from '../utils/testUtils';

const html = `<div class="hero">
      <div class="hero__text_container">
        <h1 class="hero__title">
          <span class="hero__text">Web</span>
          <span class="hero__text">Developer</span>
        </h1>
      </div>
    </div>`;

describe('hero text', () => {
    setupMocks();
    setupDOM(html);
    animateHeroText();

    test('textillate is called to animate text on page load', () => {
        expect(textillateMock).toHaveBeenCalled();
    });
});
