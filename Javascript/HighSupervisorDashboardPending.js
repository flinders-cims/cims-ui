document.addEventListener('DOMContentLoaded', function () {
    // Function to get userId from local storage (or session storage if used)
    function getUserId() {
        return localStorage.getItem('userId'); // Or use sessionStorage.getItem('userId')
    }

    // Fetch data from the API and populate the table
    function fetchPendingSR() {
        const supervisor_pending_data= localStorage.getItem('supervisor_pending_data');
        const parsedData = JSON.parse(supervisor_pending_data);
        populateTable(parsedData);
    }

    // Function to populate the table with fetched data
    function populateTable(serviceRequests) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = ''; // Clear the table before adding new rows

        // Check if there are any service requests to display
        if (serviceRequests.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5">No Pending Service Requests Found</td>`;
            tbody.appendChild(row);
            return;
        }

        // Loop through the service requests and create table rows
        serviceRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" class="sr-id" data-id="${request.srId}">${request.srId}</a></td>
                <td>${request.chemical.chemicalName}</td> <!-- Chemical Name -->
                <td>${request.research.researchId}</td> <!-- Research ID -->
                <td>${request.dateRequested}</td> <!-- Date Requested -->
                <td>${request.riskLevel}</td> <!-- Risk Level -->
            `;
            tbody.appendChild(row);
        });
        // Add event listeners to the SR IDs
        document.querySelectorAll('.sr-id').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const srId = e.target.getAttribute('data-id');
                fetchServiceRequestDetails(srId);
            });
        });
        function fetchServiceRequestDetails(srId) {
            const apiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/get/${srId}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    openResearchModal();
                    // Populate modal with data
                    document.getElementById('SR_NO').innerText = `SR_${data.srId}`;
                    document.getElementById('chemical_name').innerText = `Chemical Name: ${data.chemical.chemicalName}`;
                    document.getElementById('research').innerText = `Research Title: ${data.research.title}`;
                    document.getElementById('date').innerText = `Date: ${data.dateRequested}`;
                    document.getElementById('quantity').innerText = `Quantity: ${data.quantityRequested} ${data.unitOfQuantity}`;
                    document.getElementById('name').innerText = `Staff Name: ${data.user.firstName} ${data.user.lastName}`;
                    document.getElementById('status').innerText = `Status: ${data.status}`;
                    document.getElementById('risk').innerText = `Risk Score: ${data.riskLevel}`;
                    document.getElementById('type').innerText = `Hazard Type: ${data.hazardType}`;
                    document.getElementById('toxic').innerText = `Chemical Toxic: ${data.isToxic ? 'Yes' : 'No'}`;
                    document.getElementById('cas_number').innerText = `Cas number: ${data.casNumber}`;
                })
                .catch(error => console.error('Error fetching SR details:', error));
        }
    
        function openResearchModal() {
            const researchModal = document.getElementById('sr-modal');
            researchModal.style.display = 'block';
        }
    }

    // Initial fetch of pending service requests when page loads
    fetchPendingSR();
});

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('sr-close-button');
    const modal = document.getElementById('sr-modal');
    
    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal if a click happens outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Approve button click handler
    document.getElementById('approve').addEventListener('click', function () {
        handleApprove();
    });

    // Function to handle the approve action
    function handleApprove() {
        // Get the SR number from the modal
        const srId = document.getElementById('SR_NO').innerText.replace('SR_', '').trim();
        if (!srId) {
            alert('Service request number is missing.');
            return;
        }

        // Get the comment from the textarea
        const comment = document.getElementById('Comment').value.trim();
        const messageContainer = document.getElementById('message-container');
        // Get today's date
        const today = new Date();

        // Format the date as YYYY-MM-DD
        const formattedDate = today.toISOString().split('T')[0];
        if (!comment) {
            alert('Please enter a comment.');
            return;
        }

        // Define the API URL for approval
        const apiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/update/${srId}`;

        // Make a POST request to the API with the SR number and comment
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment:approverComment,
                status: "Approved",
                dateApproved:today
            })
        })
        .then(response => {
            if (response.ok) {
                messageContainer.innerHTML = '<p style="color: green;">Data submitted successfully! Redirecting to dashboard...</p>';
                setTimeout(() => {
                    window.location.href = 'HighSupervisorDashboard.html';
                }, 3000);
            } else {
                messageContainer.innerHTML = '<p style="color: red;">Error submitting data. Please try again.</p>';
            }
        })
        .catch(error => {
            messageContainer.innerHTML = '<p style="color: red;">Failed to submit data. Please check your connection.</p>';

        });
    }
});





document.addEventListener('DOMContentLoaded', function () {
    // Approve button click handler
    document.getElementById('reject').addEventListener('click', function () {
        handleApprove();
    });

    // Function to handle the approve action
    function handleApprove() {
        // Get the SR number from the modal
        const srId = document.getElementById('SR_NO').innerText.replace('SR_', '').trim();
        if (!srId) {
            alert('Service request number is missing.');
            return;
        }

        // Get the comment from the textarea
        const comment = document.getElementById('Comment').value.trim();
        const messageContainer = document.getElementById('message-container');
        // Get today's date
        const today = new Date();

        // Format the date as YYYY-MM-DD
        const formattedDate = today.toISOString().split('T')[0];
        if (!comment) {
            alert('Please enter a comment.');
            return;
        }

        // Define the API URL for approval
        const apiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/update/${srId}`;

        // Make a POST request to the API with the SR number and comment
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: approverComment,
                status: "Rejected",
                dateRejected:today
            })
        })
        .then(response => {
            if (response.ok) {
                messageContainer.innerHTML = '<p style="color: green;">Data submitted successfully! Redirecting to dashboard...</p>';
                setTimeout(() => {
                    window.location.href = 'HighSupervisorDashboard.html';
                }, 3000);
            } else {
                messageContainer.innerHTML = '<p style="color: red;">Error submitting data. Please try again.</p>';
            }
        })
        .catch(error => {
            messageContainer.innerHTML = '<p style="color: red;">Failed to submit data. Please check your connection.</p>';

        });
    }
});
