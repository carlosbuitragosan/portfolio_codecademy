export function introAnimation() {
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target)
                    .find('span')
                    .each(function () {
                        $(this).textillate({
                            in: {
                                effect: 'fadeInUp',
                                sync: true,
                            },
                        });
                    });
                observer.unobserve(entry.target);
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection);

    $('.intro').each(function () {
        observer.observe(this);
    });
}
