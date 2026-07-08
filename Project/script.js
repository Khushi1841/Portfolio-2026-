// Local scripts for Experience (Project) page

document.addEventListener('DOMContentLoaded', () => {

    // Animate achievement boxes on scroll
    const achBoxes = document.querySelectorAll('.ach-box');
    const achObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    achBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        achObserver.observe(box);
    });
});
