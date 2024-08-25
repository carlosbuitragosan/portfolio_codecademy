export function introAnimation() {
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target).textillate({
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
        threshold: 0.8,
    });

    observer.observe($('.intro__text')[0]);
}
