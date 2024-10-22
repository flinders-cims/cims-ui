document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the userId from local storage
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const username = localStorage.getItem("username");

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
    const rejectedRequestsApiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/manager/${username}/status/rejected`;
    const pendingRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/manager/${username}/status/pending`;
    const approvedRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/manager/${username}/status/approved`;
    const closedRequestsApiUrl= `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get-all/manager/${username}/status/Closed`;






  // Fetch data from the pending service requests API to count the number of pending requests
  fetch(pendingRequestsApiUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    const supervisorPendingData = data.filter(serviceRequest => !serviceRequest.isSentFromSupervisor);
    localStorage.setItem('supervisor_pending_data', JSON.stringify(supervisorPendingData));

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
    const supervisorApprovedData = data.filter(serviceRequest => !serviceRequest.isSentFromSupervisor);
    localStorage.setItem('supervisor_approved_data', JSON.stringify(supervisorApprovedData));
    // Count the number of approved service requests
    const totalApprovedRequests = data.length;
    // Update the DOM with the total count
    document.getElementById("approved").textContent = totalApprovedRequests;
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
    const supervisorClosedData = data.filter(serviceRequest => !serviceRequest.isSentFromSupervisor);
    localStorage.setItem('supervisor_closed_data', JSON.stringify(supervisorClosedData));
    // Count the number of pending service requests
    const totalclosedRequests = data.length;
    document.getElementById("Closed").textContent = totalclosedRequests;})
.catch(error => {
    console.error("Error fetching pending service request data:", error);
});
fetch(rejectedRequestsApiUrl , {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    const supervisorRejectedData = data.filter(serviceRequest => !serviceRequest.isSentFromSupervisor);
    localStorage.setItem('supervisor_rejected_data', JSON.stringify(supervisorRejectedData));
    // Count the number of pending service requests
    const totalrejectedRequests = data.length;
    document.getElementById("rejected").textContent = totalrejectedRequests;})
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
    var storagelocation= document.getElementById('storagelocation');

    // Check if the element exists before adding event listener
    if (storagelocation) {
        storagelocation.addEventListener('click', function() {
            console.log("Stock card clicked!"); // Debug log to verify click event
            window.location.href = 'storage_location.html'; // Redirect to research.html when clicked
        });
    } else {
        console.error("storagelocationnot found!"); // Log if the element is not found
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var stocklevel= document.getElementById('stocklevel');

    // Check if the element exists before adding event listener
    if (stocklevel) {
        stocklevel.addEventListener('click', function() {
            console.log("Stock card clicked!"); // Debug log to verify click event
            window.location.href = 'stock_level.html'; // Redirect to research.html when clicked
        });
    } else {
        console.error("stocklevel found!"); // Log if the element is not found
    }
});


