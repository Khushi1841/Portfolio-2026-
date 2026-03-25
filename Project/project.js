document.addEventListener('DOMContentLoaded', () => {
    // Find all slider containers on the page
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(container => {
        const slider = container.querySelector('.image-slider');
        const leftBtn = container.querySelector('.left-btn');
        const rightBtn = container.querySelector('.right-btn');

        // Scroll Left
        leftBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
        });

        // Scroll Right
        rightBtn.addEventListener('click', () => {
            slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        });
    });
});
