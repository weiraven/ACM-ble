const event = require("../../models/event");

function confirmDelete() {
    return confirm('Are you sure you want to delete this event? This action cannot be undone.');
}

function showRSVPPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('rsvp-popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';

}

function hideRSVPPopup() {
    const popup = document.getElementById('rsvp-popup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}

document.addEventListener('click', function (event) {
    const popup = document.getElementById('rsvp-popup');
    if (event.target === popup) {
        hideRSVPPopup(); // hide pop-up if user clicks outside of it
    }
});
