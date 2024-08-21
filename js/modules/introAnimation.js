export function introAnimation() {
    const observer = new IntersectionObserver(
        (entries) => {
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
        },
        { threshold: 0.5 }
    );

    observer.observe($('.intro__text')[0]);
}
