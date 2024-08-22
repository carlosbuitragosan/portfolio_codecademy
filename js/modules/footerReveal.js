export function footerReveal() {
    const footerHeight = 206;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    document.querySelector('.main').style.marginBottom =
                        `${footerHeight}px`;
                } else {
                    document.querySelector('.main').style.marginBottom = '0';
                }
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0,
        }
    );

    observer.observe(document.getElementById('sentinel'));
}
