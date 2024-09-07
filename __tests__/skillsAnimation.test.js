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

afterEach(() => {
    // Restore all mocks to their original implementations
    jest.resetAllMocks();
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

describe('skillsHoverEffect()', () => {
    let items;
    let firstItem;
    beforeEach(() => {
        // conver Nodelist to array for easier manipulation
        items = Array.from(gridItems);
        [firstItem] = items;
        // call the function
        skillsHoverEffect(items);
    });

    it('Applies selected class to all elements except then on hovered on to', () => {
        // simulate mouseenter on first item
        const mouseEnterEvent = new Event('mouseenter');
        firstItem.dispatchEvent(mouseEnterEvent);

        // check the class has been added
        items.forEach((item, index) => {
            if (index === 0) {
                // hovered item should not have class added
                expect(item.classList.contains('skills__category_greyed')).toBe(
                    false
                );
            } else {
                // all other items should have class added
                expect(item.classList.contains('skills__category_greyed')).toBe(
                    true
                );
            }
        });
    });

    it('removes class to all elements on mouseleave', () => {
        // simulate mouseenter on first item
        const mouseEnterEvent = new Event('mouseenter');
        firstItem.dispatchEvent(mouseEnterEvent);

        // simulate mouseleave on first item
        const mouseLeaveEvent = new Event('mouseleave');
        firstItem.dispatchEvent(mouseLeaveEvent);

        // check the class has been removed on all other items
        items.forEach((item) => {
            expect(item.classList.contains('skills__category_greyed')).toBe(
                false
            );
        });
    });
});
