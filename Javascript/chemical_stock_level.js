document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const location = queryParams.get('location'); // Get location from URL query
    const apiURL = 'https://flinders-cims-api-dev.azurewebsites.net/cims/chemicals/all';

    const chemicalsTableBody = document.querySelector('#chemicalsTable tbody');
    let filteredChemicals = [];

    // Define risk levels for each location
    const riskLevelMap = {
        '1': ['Low', 'LOW', 'low'],  // LAB
        '2': ['Medium', 'MEDIUM', 'medium'], // Research Facility
        '3': ['High', 'HIGH', 'high']  // Institute
    };

    // Fetch data from the API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Filter chemicals based on the selected location's risk level
            const riskLevels = riskLevelMap[location];
            filteredChemicals = data.filter(chemical => riskLevels.includes(chemical.riskLevel));

            // Sort chemicals by risk level
            filteredChemicals.sort((a, b) => a.riskLevel.localeCompare(b.riskLevel));

            // Assign random quantities to chemicals
            filteredChemicals.forEach(chemical => {
                chemical.quantity = Math.floor(Math.random() * 100) + 1; // Random quantity between 1 and 100
            });

            // Initial render of the table
            renderTable(filteredChemicals);
        })
        .catch(error => {
            console.error('Error fetching chemicals:', error);
        });

    let currentPage = 1;
    const itemsPerPage = 10; // Set how many items to show per page

    // Function to render a paginated table
    function renderTable(chemicals, page = 1) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = chemicals.slice(start, end);

        chemicalsTableBody.innerHTML = paginatedItems.map(chemical => `
            <tr>
                <td>${chemical.chemicalId}</td>
                <td>${chemical.chemicalName}</td>
                <td>${chemical.riskLevel}</td>
                <td>${chemical.quantity}</td>
            </tr>
        `).join('');

        // Enable/disable pagination buttons
        document.getElementById('prevBtn').disabled = page === 1;
        document.getElementById('nextBtn').disabled = end >= chemicals.length;
    }

    // Pagination buttons event listeners
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(filteredChemicals, currentPage);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if ((currentPage * itemsPerPage) < filteredChemicals.length) {
            currentPage++;
            renderTable(filteredChemicals, currentPage);
        }
    });
});
