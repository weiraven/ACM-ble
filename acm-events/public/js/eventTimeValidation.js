// Ensure end times are after start times
document.addEventListener("DOMContentLoaded", function() {
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');

    startInput.addEventListener('input', () => {
        const startDate = new Date(startInput.value);

        if (startDate) {
            // Set end time to be at least 1 hour after start time
            const minEndDate = new Date(startDate.getTime() + 60 * 60 * 1000);

            // Format the min end date as 'YYYY-MM-DDTHH:MM' in local time
            const year = minEndDate.getFullYear();
            const month = String(minEndDate.getMonth() + 1).padStart(2, '0');
            const day = String(minEndDate.getDate()).padStart(2, '0');
            const hours = String(minEndDate.getHours()).padStart(2, '0');
            const minutes = String(minEndDate.getMinutes()).padStart(2, '0');

            endInput.min = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
    });
});

// Validate form on submission
function validateEventForm() {
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);

    if (endDate < new Date(startDate.getTime() + 60 * 60 * 1000)) {
        alert('End time must be at least 1 hour after the start time.');
        return false;
    }

    return true;
}
