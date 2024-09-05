// Example of interaction, you can expand this based on your needs

// Example: Alert when a card is clicked
document.querySelectorAll('.card, .request-card').forEach(card => {
    card.addEventListener('click', () => {
        alert('Card clicked!');
    });
});


document.getElementById('profile').addEventListener('click', function() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(e) {
    const profileButton = document.getElementById('profile');
    const dropdown = document.getElementById('dropdown-menu');
    if (!profileButton.contains(e.target)) {
        dropdown.style.display = 'none'; // Hide dropdown when clicking outside
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("background-video");
    video.playbackRate = 0.5; // Slow down the video to 50% speed
});
