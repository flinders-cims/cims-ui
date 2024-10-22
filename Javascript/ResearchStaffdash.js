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
    const researchApiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/research/getCount/${userId}`;
    const pendingRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/${userId}/status/pending`;
    const rejectedRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/${userId}/status/rejected`;
    const approvedRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/${userId}/status/approved`;
    const closedRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/${userId}/status/Closed`;


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
        const totalResearches = data;
        document.querySelector(".overview .card:nth-child(1) h2").textContent = totalResearches;

    
    })
    .catch(error => {
        console.error("Error fetching data from API:", error);
    });



  // Fetch data from the pending service requests API to count the number of pending requests
  fetch(pendingRequestsApiUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    // Count the number of pending service requests
    const totalPendingRequests = data.length;
    document.getElementById("pending").textContent = totalPendingRequests;})
.catch(error => {
    console.error("Error fetching pending service request data:", error);
});
  // Fetch data from the pending service requests API to count the number of pending requests
  fetch(approvedRequestsApiUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    // Count the number of approved service requests
    const totalApprovedRequests = data.length;
    // Update the DOM with the total count
    document.getElementById("approved").textContent = totalApprovedRequests;
    document.getElementById("stock").textContent = totalApprovedRequests;
})
.catch(error => {
    console.error("Error fetching approved service request data:", error);
});
fetch(rejectedRequestsApiUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    // Count the number of rejected service requests
    const totalApprovedRequests = data.length;
    // Update the DOM with the total count
    document.getElementById("rejected").textContent = totalApprovedRequests;
    document.getElementById("stock").textContent = totalApprovedRequests;
})
.catch(error => {
    console.error("Error fetching approved service request data:", error);
});
  // Fetch data from the pending service requests API to count the number of pending requests
  fetch(closedRequestsApiUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    // Count the number of pending service requests
    const totalclosedRequests = data.length;
    document.getElementById("Closed").textContent = totalclosedRequests;})
.catch(error => {
    console.error("Error fetching pending service request data:", error);
});
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

document.addEventListener('DOMContentLoaded', function() {
    var stockCard = document.getElementById('stockcard');

    // Check if the element exists before adding event listener
    if (stockCard ) {
        stockCard.addEventListener('click', function() {
            console.log("Stock card clicked!"); // Debug log to verify click event
            window.location.href = 'stockin-hand.html'; // Redirect to research.html when clicked
        });
    } else {
        console.error("stock not found!"); // Log if the element is not found
    }
});

