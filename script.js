const text = ['Frontend Developer', 'Python Developer', 'Full Stack', 'Web Developer', 'Software Engineer', 'Open source contributor'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === text.length) {
        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typewriter').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
    }

    setTimeout(type, 200);
})();
