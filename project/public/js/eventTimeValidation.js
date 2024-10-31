document.addEventListener("DOMContentLoaded", function() {
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');

    startInput.addEventListener('input', () => {
        const startDate = new Date(startInput.value);

        if (startDate) {
            // set end time to be at least 1 hour after start time
            const minEndDate = new Date(startDate.getTime() + 60 * 60 * 1000);
            endInput.min = minEndDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
        }
    });
});
