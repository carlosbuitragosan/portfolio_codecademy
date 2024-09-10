import {
    jest,
    beforeAll,
    describe,
    expect,
    test,
    beforeEach,
} from '@jest/globals';
import {
    moveItemsToBottom,
    resetTransformOnIntersect,
    highlightOnHover,
} from '../js/modules/skillsAnimation';
import { createIntersectionObserver } from '../js/modules/intersectionObserver';

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

beforeEach(() => {
    setupDOM();
    container = document.querySelector('.skills__container');
    gridItems = document.querySelectorAll('.skills__category');
});

afterEach(() => {
    // clear the DOM
    document.body.innerHTML = '';

    // Restore all mocks to their original implementations
    jest.clearAllMocks();
});

describe('moveItemsToBottom()', () => {
    it('Items should move to the bottom of the container', () => {
        // mock values for for height and distance from top of viewport
        const itemsViewportTop = [1298, 1400, 1500, 1600, 1700];
        const itemOffsetHeight = 232;
        const containerViewportTop = 1298;
        const containerOffsetHeight = 680;

        // Mock getBoundingClientRect for container
        jest.spyOn(container, 'getBoundingClientRect').mockImplementation(
            () => ({
                top: containerViewportTop,
                bottom: containerViewportTop + containerOffsetHeight,
                height: containerOffsetHeight,
            })
        );
        // Mock offsetHeight for container
        jest.spyOn(container, 'offsetHeight', 'get').mockReturnValue(
            containerOffsetHeight
        );

        gridItems.forEach((item, index) => {
            // Mock getBoundingClientRect for elements
            jest.spyOn(item, 'getBoundingClientRect').mockImplementation(
                () => ({
                    top: itemsViewportTop[index],
                    bottom: itemsViewportTop[index] + itemOffsetHeight,
                    height: itemOffsetHeight,
                })
            );
            // Mock offsetHeight for elements
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
        moveItemsToBottom(container, gridItems);

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

describe('highlightOnHover()', () => {
    let items;
    let firstItem;
    beforeEach(() => {
        // conver Nodelist to array for easier manipulation
        items = Array.from(gridItems);
        [firstItem] = items;
        // call the function
        highlightOnHover(items);
    });

    it('Applies class to all elements except the hovered one', () => {
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

describe('IntersectionObserver', () => {
    let observerCallback;
    let observe;
    let disconnect;

    beforeEach(() => {
        observe = jest.fn();
        disconnect = jest.fn();

        // mock the intersection observer
        global.IntersectionObserver = jest.fn(function (callback) {
            observerCallback = callback;
            this.observe = observe;
            this.disconnect = disconnect;
        });

        // mock the style property fo each element
        gridItems.forEach((item) => {
            Object.defineProperty(item, 'style', {
                value: { transform: '' },
                writable: true,
            });
        });
    });

    describe('resetTransformOnIntersect', () => {
        it('appies transform property to elements', () => {
            // call the function to be tested
            resetTransformOnIntersect(container, gridItems);

            // trigger observer callback
            const mockEntries = Array.from(gridItems).map((item) => ({
                isIntersecting: true,
                target: item,
            }));
            observerCallback(mockEntries, { disconnect });

            // Verify the transform style for each item
            gridItems.forEach((item) => {
                expect(item.style.transform).toBe('none');
            });
        });
    });

    describe('IntersectionObserver()', () => {
        it('detects intersection', () => {
            // call the function to test
            resetTransformOnIntersect(container, gridItems);

            // simulate intersection event
            const entry = {
                target: container,
                isIntersecting: true,
            };

            // trigger callback handleIntersecion(entry)
            observerCallback([entry], { disconnect });

            // Verify the transform style for each item
            gridItems.forEach((item) => {
                expect(item.style.transform).toBe('none');
            });

            expect(observe).toHaveBeenCalled();
            expect(disconnect).toHaveBeenCalled();
        });
    });
});
