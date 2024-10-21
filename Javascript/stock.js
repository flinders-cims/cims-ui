document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem("userId");
    const tableBody = document.querySelector('#chemicalsTable tbody');

    // Function to fetch chemicals from the API and render them in the table
    function fetchAndDisplayChemicals() {
        fetch('https://flinders-cims-api-dev.azurewebsites.net/cims/chemicals/all')
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
                <td>${chemical.researchId || 'null'}</td>
                <td>${chemical.serviceRequestId || 'null'}</td>
            `;
            tableBody.appendChild(row);

            // Add click event listener to the ID cell
            row.querySelector('.clickable-id').addEventListener('click', () => {
                const chemicalId = row.querySelector('.clickable-id').getAttribute('data-chemical-id');
                window.location.href = `chemical-details.html?id=${chemicalId}`;
            });
        });
    }

    // Prevent multiple initializations
    if (!window.hasRun) {
        window.hasRun = true;
        fetchAndDisplayChemicals();
    }
});
