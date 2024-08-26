const $container = $('.skills__container');
const $gridItems = $('.skills__category');

function itemsInitialPosition() {
    $gridItems.each(function () {
        const $item = $(this);
        const containerBottom =
            $container.offset().top + $container.outerHeight();
        const itemOffsetTop = $item.offset().top + $item.outerHeight();
        const translateY = containerBottom - itemOffsetTop;

        $item.css({
            transform: `translateY(${translateY}px)`,
        });
    });
}

function animateSkills() {
    $gridItems.each(function () {
        $(this).css({
            transform: 'none',
        });
    });
}

export function skillsAnimation() {
    itemsInitialPosition();

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
    });
    observer.observe($container[0]);
}

export function skillsHoverEffect() {
    $gridItems.on('mouseenter', function () {
        const $hoveredCard = $(this);
        $gridItems.each(function () {
            const $card = $(this);
            if (!$card.is($hoveredCard)) {
                $card.addClass('skills__category_greyed');
            }
        });
    });

    $gridItems.on('mouseleave', () => {
        $gridItems.removeClass('skills__category_greyed');
    });
}
