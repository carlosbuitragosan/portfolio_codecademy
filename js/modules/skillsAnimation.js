const $gridItems = $('.skills__category');

// export function skillsAnimation() {
//     const $container = $('.skills__container');
//     const $skillsTitleHeight = $('.skills__main_title').outerHeight();

//     $gridItems.each(function () {
//         const $item = $(this);
//         const containerTop = $container.offset().top + $skillsTitleHeight;
//         const itemTop = $item.offset().top;
//         const translateY = containerTop - itemTop;

//         $item.css({
//             transform: `translateY(${translateY}px)`,
//         });
//     });

//     function animateSkills() {
//         $gridItems.each(function () {
//             $(this).css({
//                 transform: 'none',
//             });
//         });
//     }

//     function handleIntersection(entries) {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 animateSkills();
//                 observer.unobserve(entry.target);
//             }
//         });
//     }

//     const observer = new IntersectionObserver(handleIntersection, {
//         threshold: 0.5,
//     });

//     observer.observe($container[0]);
// }

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
