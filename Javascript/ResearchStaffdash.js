document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the userId from local storage
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    // If userId exists, display it in the h3 tag
    if (userName) {
        document.getElementById("userIdDisplay").textContent = "Hello "+userName;
    } else {
        document.getElementById("userIdDisplay").textContent = "Name ID not found.";
    }

    if (!userId) {
        console.error("User ID not found in local storage");
        return;
    }

    // Define the API endpoint for fetching all researches and stock data
    const researchApiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/research/getAll/${userId}`;
    
    // Fetch data from the research API
    fetch(researchApiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        // Count the number of researches by researchId
        const totalResearches = data.length;
        document.querySelector(".overview .card:nth-child(1) h2").textContent = totalResearches;

        // Count the total stock in hand (assuming 'stockInHand' is part of the JSON response)
        const totalStock = data.reduce((total, research) => total + (research.stockInHand || 0), 0);
        document.querySelector(".overview .card:nth-child(2) h2").textContent = totalStock;
    })
    .catch(error => {
        console.error("Error fetching data from API:", error);
    });
});

// Profile dropdown toggle functionality
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
document.querySelector(".logout-button").addEventListener('click', function() {
    // Clear all local storage data
    localStorage.clear();
});

document.addEventListener('DOMContentLoaded', function() {
    var researchCard = document.getElementById('researchCard');

    // Check if the element exists before adding event listener
    if (researchCard) {
        researchCard.addEventListener('click', function() {
            console.log("Research card clicked!"); // Debug log to verify click event
            window.location.href = 'research.html'; // Redirect to research.html when clicked
        });
    } else {
        console.error("researchCard not found!"); // Log if the element is not found
    }
});



