document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#chemicalsTable tbody');

    // Function to fetch the current user's session and extract the userId
    function getCurrentUserId() {
        // Assuming user session details are available globally or can be fetched from an API
        // For the sake of this example, we'll mock this by returning a hardcoded userId
        return Promise.resolve(123); // Replace with actual logic to fetch userId from the session
    }

    // Function to fetch chemicals for the current user and render them in the table
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
                tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
            });
    }

    // Function to render chemicals data into the table
    function renderTable(chemicals) {
        tableBody.innerHTML = ''; // Clear existing table data

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

            // Add click event listener to the chemical ID cell
            row.querySelector('.clickable-id').addEventListener('click', (event) => {
                event.preventDefault(); // Prevent page refresh
                const chemicalId = row.querySelector('.clickable-id').getAttribute('data-chemical-id');
                window.location.href = `chemical-details.html?id=${chemicalId}`;
            });

            // Add click event listener to the research ID cell
            row.querySelector('.clickable-research-id').addEventListener('click', (event) => {
                event.preventDefault(); // Prevent page refresh
                const researchId = row.querySelector('.clickable-research-id').getAttribute('data-research-id');
                window.location.href = `research-details.html?id=${researchId}`;
            });

            // Add click event listener to the service request ID cell
            row.querySelector('.clickable-sr-id').addEventListener('click', (event) => {
                event.preventDefault(); // Prevent page refresh
                const srId = row.querySelector('.clickable-sr-id').getAttribute('data-sr-id');
                window.location.href = `sr-view.html?id=${srId}`;
            });
        });
    }

    // Prevent multiple initializations
    if (!window.hasRun) {
        window.hasRun = true;
        getCurrentUserId().then(userId => {
            fetchAndDisplayChemicals(userId);
        });
    }
});
