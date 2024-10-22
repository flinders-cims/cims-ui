document.addEventListener('DOMContentLoaded', function () {
    // Function to get userId from local storage (or session storage if used)
    function getUserId() {
        return localStorage.getItem('userId'); // Or use sessionStorage.getItem('userId')
    }

    // Fetch data from the API and populate the table
    function fetchPendingSR() {
        const supervisor_pending_data= localStorage.getItem('supervisor_pending_data');
        populateTable(supervisor_pending_data);
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
                <td>${request.srId}</td> <!-- Service Request ID -->
                <td>${request.chemical.chemicalName}</td> <!-- Chemical Name -->
                <td>${request.research.researchId}</td> <!-- Research ID -->
                <td>${request.dateRequested}</td> <!-- Date Requested -->
                <td>${request.riskLevel}</td> <!-- Risk Level -->
            `;
            tbody.appendChild(row);
        });
    }

    // Initial fetch of pending service requests when page loads
    fetchPendingSR();
});
