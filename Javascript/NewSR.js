document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('service-request-form');
    const messageContainer = document.getElementById('message-container');
    const researchTitleDropdown = document.getElementById('research-title');
    const userId = localStorage.getItem('userId');
    const supervisorNameInput = document.getElementById('SupervisorName');
    const chemicalDropdown = document.getElementById('chemical-name');
    const casNumberInput = document.getElementById('cas-number'); // Reference to CAS number input

    // Object to store the chemical-CAS number mapping
    let chemicalCasMap = {};

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageContainer.innerHTML = ''; // Clear previous messages
        const selectedResearchTitle = researchTitleDropdown.value;
        const selectedChemicalName = chemicalDropdown.value;

        const formData = {
            userId: parseInt(userId, 10),
            chemicalName: selectedChemicalName,
            researchTitle: selectedResearchTitle,
            status: "Pending",
            riskLevel: parseInt(document.getElementById('riskRange').value, 10),
            dateRequested: currentDateInput.value,
            approverUsername: supervisorNameInput.value,
            quantityRequested: parseFloat(document.getElementById('quantity').value),
            unitOfQuantity: document.getElementById('unitSelect').value,
            riskScore: parseInt(document.getElementById('riskRange').value, 10),
            casNumber: casNumberInput.value,
            hazardType: [...document.getElementById('options-container').querySelectorAll('input[type="checkbox"]:checked')]
                .map(option => option.value)
                .join(', '), // Convert array to a comma-separated string
        };

        try {
            const response = await fetch('https://flinders-cims-api-dev.azurewebsites.net/cims/service-requests/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                messageContainer.innerHTML = '<p style="color: green;">Data submitted successfully! Redirecting to dashboard...</p>';
                setTimeout(() => {
                    window.location.href = 'ResearchStaffdash.html';
                }, 3000);
            } else {
                messageContainer.innerHTML = '<p style="color: red;">Error submitting data. Please try again.</p>';
            }
        } catch (error) {
            messageContainer.innerHTML = '<p style="color: red;">Failed to submit data. Please check your connection.</p>';
        }
    });

    // Populate "Supervisor Name" with the manager's name from local storage
    const managerName = localStorage.getItem('managerUserName');
    if (managerName) {
        supervisorNameInput.value = managerName;
    }
    // Set today's date in the "Create Request Date" field
    const currentDateInput = document.getElementById('current-date');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    currentDateInput.value = formattedDate;

    if (!userId) {
        console.error('User ID not found in local storage');
        return;
    }

    // Set the research API URL using the userId
    const researchApiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/research/getAll/${userId}`;
    
    const chemicalApiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/chemicals/all`;

    // Fetch chemical names and populate the dropdown
    async function fetchChemicalNames() {
        try {
            const response = await fetch(chemicalApiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch chemical names');
            }
            const chemicals = await response.json();

            // Clear existing options in case of multiple fetch attempts
            chemicalDropdown.innerHTML = '<option value="">Select a Chemical</option>';

            // Populate the dropdown with chemical names and store CAS numbers
            chemicals.forEach(chemical => {
                const option = document.createElement('option');
                option.value = chemical.chemicalName; // Use 'chemicalName' as the value
                option.textContent = chemical.chemicalName; // Display the chemical name
                chemicalDropdown.appendChild(option);

                // Store the CAS number mapping for each chemical
                chemicalCasMap[chemical.chemicalName] = chemical.casNumber;
            });
        } catch (error) {
            console.error('Error fetching chemical names:', error);
            messageContainer.innerHTML = '<p style="color: red;">Failed to load chemical names. Please try again later.</p>';
        }
    }

    // Automatically update the CAS number when a chemical is selected
    chemicalDropdown.addEventListener('change', () => {
        const selectedChemicalName = chemicalDropdown.value;
        casNumberInput.value = chemicalCasMap[selectedChemicalName] || ''; // Set the CAS number if available
    });

    // Fetch research titles and populate the dropdown
    async function fetchResearchTitles() {
        try {
            const response = await fetch(researchApiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch research titles');
            }
            const researchTitles = await response.json();

            // Clear existing options in case of multiple fetch attempts
            researchTitleDropdown.innerHTML = '<option value="">Select a Research Title</option>';

            // Populate the dropdown
            researchTitles.forEach(research => {
                const option = document.createElement('option');
                option.value = research.title; // Set the value as the title
                option.textContent = research.title; // Display the title
                researchTitleDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching research titles:', error);
            messageContainer.innerHTML = '<p style="color: red;">Failed to load research titles. Please try again later.</p>';
        }
    }

    // Call the function to fetch research titles on page load
    fetchResearchTitles();
    fetchChemicalNames();

    // Update risk label based on range input
    window.updateRiskLabel = function (value) {
        const riskPercentage = document.getElementById('riskPercentage');
        const riskLevel = document.getElementById('riskLevel');
        const riskOutput = document.querySelector('.risk-output');

        value = parseInt(value, 10);
        riskPercentage.textContent = value;

        if (value >= 0 && value <= 3) {
            riskLevel.textContent = 'Low';
            riskOutput.style.color = 'green';
        } else if (value >= 4 && value <= 6) {
            riskLevel.textContent = 'Medium';
            riskOutput.style.color = 'orange';
        } else {
            riskLevel.textContent = 'High';
            riskOutput.style.color = 'red';
        }
    };

    // Populate day, month, and year dropdowns for the expected date
    function populateDateDropdowns() {
        const dayDropdown = document.getElementById('expected-day');
        const monthDropdown = document.getElementById('expected-month');
        const yearDropdown = document.getElementById('expected-year');

        // Populate day dropdown (1-31)
        for (let day = 1; day <= 31; day++) {
            const option = document.createElement('option');
            option.value = day < 10 ? `0${day}` : day;
            option.textContent = day;
            dayDropdown.appendChild(option);
        }

        // Populate month dropdown (1-12)
        const monthNames = [
            "01 - January", "02 - February", "03 - March", "04 - April",
            "05 - May", "06 - June", "07 - July", "08 - August",
            "09 - September", "10 - October", "11 - November", "12 - December"
        ];
        monthNames.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = (index + 1) < 10 ? `0${index + 1}` : index + 1;
            option.textContent = month;
            monthDropdown.appendChild(option);
        });

        // Populate year dropdown (current year to 10 years in the future)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearDropdown.appendChild(option);
        }
    }

    // Call the function to populate the dropdowns on page load
    populateDateDropdowns();
});

function handleToxicityChange() {
    const isToxic = document.getElementById('isToxic').value;
    const toxicEffectsContainer = document.getElementById('toxicEffectsContainer');

    if (isToxic === 'yes') {
        toxicEffectsContainer.style.display = 'block';
    } else {
        toxicEffectsContainer.style.display = 'none';
    }
}


    // Code to handle the visibility and selection in the options container
    const selectBox = document.querySelector('#select-box');
    const optionsContainer = document.querySelector('#options-container');
    const placeholder = document.querySelector('.placeholder');

    selectBox.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!selectBox.contains(event.target) && !optionsContainer.contains(event.target)) {
            optionsContainer.style.display = 'none';
        }
    });

    optionsContainer.addEventListener('click', () => {
        const selectedOptions = [...optionsContainer.querySelectorAll('input[type="checkbox"]:checked')]
            .map(option => option.value)
            .join(', ');

        placeholder.textContent = selectedOptions || 'Select hazard types';
    });