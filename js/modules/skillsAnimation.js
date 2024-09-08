export function itemsInitialPosition(container, items) {
    items.forEach((item) => {
        const containerBottom =
            container.getBoundingClientRect().top + container.offsetHeight;
        const itemBottom = item.getBoundingClientRect().top + item.offsetHeight;
        const translateY = containerBottom - itemBottom;
        item.style.transform = `translateY(${translateY}px)`;
    });
}

export function animateSkills(items) {
    items.forEach((item) => {
        item.style.transform = 'none';
    });
}

export function skillsAnimation(container, items) {
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkills(items);
                observer.disconnect();
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
    });

    observer.observe(container);
}

export function skillsHoverEffect(items) {
    items.forEach((hoveredCard) => {
        hoveredCard.addEventListener('mouseenter', () => {
            items.forEach((card) => {
                if (card !== hoveredCard) {
                    card.classList.add('skills__category_greyed');
                }
            });
        });
    });
    items.forEach((item) => {
        item.addEventListener('mouseleave', () => {
            items.forEach((card) => {
                card.classList.remove('skills__category_greyed');
            });
        });
    });
}
