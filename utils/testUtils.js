import $ from 'jquery';
// import jest when using ES modules
import { jest } from '@jest/globals';

global.$ = $;
global.jQuery = $;

// mock textillate function
export const textillateMock = jest.fn(() => ({
    in: jest.fn(),
}));

export function setupDOM(html) {
    document.body.innerHTML = html;
}

export function setupMocks() {
    // makes jQuery globally available.
    global.$ = $;
    global.jQuery = $;
    // previously: jest.mock('textillate', () => textillateMock) which only used with imports.
    $.fn.textillate = textillateMock;
    global.scrollTo = jest.fn();
}

export function clearMocks() {
    textillateMock.mockClear();
    textillateMock().in.mockClear();
    $(window).off('scroll');
}
