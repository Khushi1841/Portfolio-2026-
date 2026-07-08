// Local scripts for Contact page

document.addEventListener('DOMContentLoaded', () => {

    // WhatsApp button handler — formatted message
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'No Subject';
            const message = document.getElementById('message').value.trim();

            if (!name || !message) {
                alert('Please fill in your name and message before sending.');
                return;
            }

            const formatted =
`🌟 *New Portfolio Message*

👤 *Name:* ${name}
📧 *Email:* ${email}
📌 *Subject:* ${subject}

💬 *Message:*
${message}`;

            window.open(`https://wa.me/919113329839?text=${encodeURIComponent(formatted)}`, '_blank');
        });
    }

    // Email button handler
    const btnEmail = document.getElementById('btn-email');
    if (btnEmail) {
        btnEmail.addEventListener('click', () => {
            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields before sending.');
                return;
            }

            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            window.open(
                `mailto:khushisingh80139@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            );
        });
    }
});
