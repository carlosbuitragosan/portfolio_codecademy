import { jest, beforeAll, describe, expect, test } from '@jest/globals';
import $ from 'jquery';
import {
    itemsInitialPosition,
    animateSkills,
    skillsAnimation,
    skillsHoverEffect,
} from '../js/modules/skillsAnimation';

global.$ = $;
global.jQuery = $;

let container;
let gridItems;

const setupDOM = () => {
    document.body.innerHTML = `
        <div class="skills__container">
          <div class="skills__category"></div>
          <div class="skills__category"></div>
          <div class="skills__category"></div>
          <div class="skills__category"></div>
          <div class="skills__category"></div>
        </div>`;
};

beforeAll(() => {
    setupDOM();
    container = document.querySelector('.skills__container');
    gridItems = document.querySelectorAll('.skills__category');
});

beforeEach(() => {
    // mock getBoundingClientRect(), offsetHeight, style.transform?
});

afterEach(() => {
    $('body').empty();
});

describe('skillsAnimation', () => {
    it('Items should move to the bottom of the container', () => {
        // mock values for for height and distance from top of viewport
        const itemsViewportTop = [1298, 1400, 1500, 1600, 1700];
        const itemOffsetHeight = 232;
        const containerViewportTop = 1298;
        const containerOffsetHeight = 680;

        // Mock getBoundingClientRect and offsetHeight for container
        jest.spyOn(container, 'getBoundingClientRect').mockImplementation(
            () => ({
                top: containerViewportTop,
                bottom: containerViewportTop + containerOffsetHeight,
                height: containerOffsetHeight,
            })
        );

        jest.spyOn(container, 'offsetHeight', 'get').mockReturnValue(
            containerOffsetHeight
        );

        // Mock getBoundingClientRect and offsetHeight for elements
        gridItems.forEach((item, index) => {
            jest.spyOn(item, 'getBoundingClientRect').mockImplementation(
                () => ({
                    top: itemsViewportTop[index],
                    bottom: itemsViewportTop[index] + itemOffsetHeight,
                    height: itemOffsetHeight,
                })
            );

            jest.spyOn(item, 'offsetHeight', 'get').mockReturnValue(
                itemOffsetHeight
            );

            // mock the style property
            Object.defineProperty(item, 'style', {
                value: { transform: '' },
                writable: true,
            });
        });

        // call the function to be tested
        itemsInitialPosition(container, gridItems);

        // Verify the transform style for each item
        gridItems.forEach((item, index) => {
            const containerBottom =
                containerViewportTop + containerOffsetHeight;
            const itemBottom = itemsViewportTop[index] + itemOffsetHeight;
            const expectedTranslateY = containerBottom - itemBottom;
            expect(item.style.transform).toBe(
                `translateY(${expectedTranslateY}px)`
            );
        });
    });
});
