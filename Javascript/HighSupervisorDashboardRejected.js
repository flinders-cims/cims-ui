document.addEventListener('DOMContentLoaded', function () {
    // Function to get userId from local storage (or session storage if used)
    function getUserId() {
        return localStorage.getItem('userId'); // Or use sessionStorage.getItem('userId')
    }

    // Fetch data from the API and populate the table
    function fetchRejectedSR() {
        const supervisor_rejected_data= localStorage.getItem('supervisor_rejected_data');
        const parsedData = JSON.parse(supervisor_pending_data);
        populateTable(parsedData);
    }

   // Function to populate the table with fetched data
   function populateTable(serviceRequests) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Clear the table before adding new rows

    // Check if serviceRequests is an array and has items
    if (!Array.isArray(serviceRequests) || serviceRequests.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No Rejected Service Requests Found</td>`;
        tbody.appendChild(row);
        return;
    }

    // Loop through the service requests and create table rows
    serviceRequests.forEach(request => {
        const row = document.createElement('tr');
        // Use optional chaining (?.) to safely access nested properties
        row.innerHTML = `
            <td>${request.srId || 'N/A'}</td> <!-- Service Request ID -->
            <td>${request.chemical?.chemicalName || 'N/A'}</td> <!-- Chemical Name -->
            <td>${request.research?.researchId || 'N/A'}</td> <!-- Research ID -->
            <td>${request.dateRequested || 'N/A'}</td> <!-- Date Requested -->
            <td>${request.riskLevel || 'N/A'}</td> <!-- Risk Level -->
        `;
        tbody.appendChild(row);
    });
}


    // Initial fetch of pending service requests when page loads
    fetchRejectedSR();
});
