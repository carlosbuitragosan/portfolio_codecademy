export function fadeInUpText($text) {
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $text.textillate({
                    in: {
                        effect: 'fadeInUp',
                        sync: true,
                    },
                });
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.6,
    });

    observer.observe($('.intro__text')[0]);
}
