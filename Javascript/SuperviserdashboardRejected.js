document.addEventListener('DOMContentLoaded', function () {
    // Function to get userId from local storage (or session storage if used)
    function getUserId() {
        return localStorage.getItem('userId'); // Or use sessionStorage.getItem('userId')
    }

    // Fetch data from the API and populate the table
    function fetchRejectedSR() {
        const supervisor_rejected_data= localStorage.getItem('supervisor_rejected_data');
        const parsedData = JSON.parse(supervisor_rejected_data);
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
            <td><a href="#" class="sr-id" data-id="${request.srId}">${request.srId}</a></td>
            <td>${request.chemical?.chemicalName || 'N/A'}</td> <!-- Chemical Name -->
            <td>${request.research?.researchId || 'N/A'}</td> <!-- Research ID -->
            <td>${request.dateRequested || 'N/A'}</td> <!-- Date Requested -->
            <td>${request.riskLevel || 'N/A'}</td> <!-- Risk Level -->
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
                document.getElementById('date').innerText = `Date Created: ${data.dateRequested}`;
                document.getElementById('rejected_date').innerText = `Date Rejected: ${data.dateRejected}`;
                document.getElementById('quantity').innerText = `Quantity: ${data.quantityRequested} ${data.unitOfQuantity}`;
                document.getElementById('name').innerText = `Staff Name: ${data.user.firstName} ${data.user.lastName}`;
                document.getElementById('status').innerText = `Status: ${data.status}`;
                document.getElementById('risk').innerText = `Risk Score: ${data.riskLevel}`;
                document.getElementById('type').innerText = `Hazard Type: ${data.hazardType}`;
                document.getElementById('toxic').innerText = `Chemical Toxic: ${data.isToxic ? 'Yes' : 'No'}`;
                document.getElementById('cas_number').innerText = `Cas number: ${data.casNumber}`;
                document.getElementById('Comment').innerText = `${data.approverComment}`;
            })
            .catch(error => console.error('Error fetching SR details:', error));
    }

    function openResearchModal() {
        const researchModal = document.getElementById('sr-modal');
        researchModal.style.display = 'block';
    }
    }
    
    // Initial fetch of pending service requests when page loads
    fetchRejectedSR();
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
