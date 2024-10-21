document.addEventListener('DOMContentLoaded', () => {
    // Function to get the chemical ID from the URL
    function getChemicalIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Function to fetch chemical details by ID
    function fetchChemicalDetails(chemicalId) {
        fetch(`https://flinders-cims-api-dev.azurewebsites.net/cims/chemicals/get/${chemicalId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayChemicalDetails(data);
            })
            .catch(error => {
                console.error('Error fetching chemical details:', error);
                alert('Failed to fetch chemical details. Please try again later.');
            });
    }

    // Function to display chemical details on the page
    function displayChemicalDetails(chemical) {
        document.getElementById('chemicalName').textContent = chemical.chemicalName || 'N/A';
        document.getElementById('systematicName').textContent = chemical.systematicName || 'N/A';
        document.getElementById('genericRiskCategory').textContent = chemical.genericRiskCategory || 'N/A';
        document.getElementById('riskLevel').textContent = chemical.riskLevel || 'N/A';
        document.getElementById('storageRequirements').value = chemical.storageRequirements || 'N/A';
        document.getElementById('disposalProcedure').value = chemical.disposalProcedure || 'N/A';
    }

    // Get the chemical ID from the URL and fetch details
    const chemicalId = getChemicalIdFromUrl();
    if (chemicalId) {
        fetchChemicalDetails(chemicalId);
    } else {
        alert('No chemical ID provided in the URL');
    }
});
