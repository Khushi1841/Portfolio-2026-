// This script is optional if you want to handle errors, but for static PDF links, it is not necessary.

document.querySelector('.download-btn').addEventListener('click', function(event) {
    const link = event.target.getAttribute('href');
    fetch(link).then(response => {
        if (!response.ok) {
            document.getElementById('error-message').style.display = 'block';
        }
    });
});
