document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#chemicalsTable tbody');
    const userId = localStorage.getItem("userId"); // Change this to fetch the correct key

    if (!userId) {
        console.error("No valid userId found in localStorage.");
        tableBody.innerHTML = '<tr><td colspan="6">Error: No user ID found. Please log in.</td></tr>';
        return; // Stop execution if userId is not found
    }

    // Fetch and display chemicals data
    fetchAndDisplayChemicals(userId);

    // Function to render chemicals data into the table
    function renderTable(chemicals) {
        tableBody.innerHTML = ''; // Clear existing table data

        if (chemicals.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No chemicals found.</td></tr>';
            return;
        }

        chemicals.forEach(chemical => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="clickable-id" data-chemical-id="${chemical.chemicalId || 'null'}">${chemical.chemicalId || 'null'}</td>
                <td>${chemical.chemicalName || 'null'}</td>
                <td>${chemical.genericRiskCategory || 'null'}</td>
                <td>${chemical.quantity || 'null'}</td>
                <td class="clickable-research-id" data-research-id="${chemical.researchId || 'null'}">${chemical.researchId || 'null'}</td>
                <td class="clickable-sr-id" data-sr-id="${chemical.srId || 'null'}">${chemical.srId || 'null'}</td>
            `;
            tableBody.appendChild(row);


            // Add click event listener to the service request ID cell
            row.querySelector('.clickable-sr-id').addEventListener('click', (event) => {
                event.preventDefault(); // Prevent page refresh
                const srId = row.querySelector('.clickable-sr-id').getAttribute('data-sr-id');
                window.location.href = `sr-view.html?id=${srId}`;
            });
        });
    }

    // Function to fetch and display chemicals
    function fetchAndDisplayChemicals(userId) {
        fetch(`https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/in-hand/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(chemicals => {
                renderTable(chemicals);
            })
            .catch(error => {
                console.error('Error fetching chemicals:', error);
                tableBody.innerHTML = '<tr><td colspan="6">Error loading data. Please try again later.</td></tr>';
            });
    }
});
