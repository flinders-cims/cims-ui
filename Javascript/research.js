document.addEventListener('DOMContentLoaded', () => {
    const rowsPerPage = 8;
    let currentPage = 1;
    let researchData = [];
    const tableBody = document.querySelector('#researchTable tbody');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const userId = localStorage.getItem("userId");

    // Function to fetch research data from API
    function fetchResearchData() {
            fetch(`https://flinders-cims-api-dev.azurewebsites.net/cims/research/getAll/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch research data');
                }
                return response.json();
            })
            .then(data => {
                researchData = data; // Assuming data is an array of research objects
                renderTable(); // Render table after fetching data
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching research data');
            });
    }

    // Function to render table with pagination
    function renderTable() {
        tableBody.innerHTML = ''; // Clear previous content
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = researchData.slice(start, end); // Get data for the current page

        pageData.forEach(research => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${research.researchId}</td>
                <td class="research-title">${research.title}</td>
                <td>${research.serviceRequest !== undefined ? research.serviceRequest : 'N/A'}</td>
                <td>${research.startDate}</td>
                <td>${research.expectedEndDate}</td>
                <td>${research.status}</td>
            `;
            tableBody.appendChild(row);
        });

        // Add click event to research titles to navigate to the details page
        const researchTitles = document.querySelectorAll('.research-title');
        researchTitles.forEach(title => {
            title.addEventListener('click', () => {
                window.location.href = 'research-details.html'; // Replace with your details page URL
            });
        });

        const totalPages = Math.ceil(researchData.length / rowsPerPage);

        // Disable both buttons if there is only one page
        if (totalPages === 1) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        } else {
            // Enable or disable buttons based on current page
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }
    }

    // Event listeners for pagination buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(researchData.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    // Initial fetch of research data from the API
    fetchResearchData();
});
