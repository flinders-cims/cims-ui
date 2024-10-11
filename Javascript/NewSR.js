
//CAS number//
const casInput = document.getElementById('cas-number');

casInput.addEventListener('input', function (event) {
    // Allow only numeric characters
    casInput.value = casInput.value.replace(/\D/g, '');

    // You can add further validation for length or other conditions if needed
    if (casInput.value.length > 7) {
        alert('CAS Number must be 7 digits only.');
        casInput.value = casInput.value.substring(0, 7); // Truncate the value to 7 digits
    }
});


//expected Date//

    // Function to populate the expected date dropdowns
    function initializeExpectedDateDropdowns() {
    const dayDropdown = document.getElementById('expected-day');
    const monthDropdown = document.getElementById('expected-month');
    const yearDropdown = document.getElementById('expected-year');

    // Populate day options (1-31)
    for (let day = 1; day <= 31; day++) {
    const optionDay = document.createElement('option');
    optionDay.value = day < 10 ? `0${day}` : day; // Pad single-digit days with a leading zero
    optionDay.textContent = day;
    dayDropdown.appendChild(optionDay);
}

    // Populate month options (1-12)
    const monthNames = [
    "01 - January", "02 - February", "03 - March", "04 - April",
    "05 - May", "06 - June", "07 - July", "08 - August",
    "09 - September", "10 - October", "11 - November", "12 - December"
    ];
    for (let i = 0; i < monthNames.length; i++) {
    const optionMonth = document.createElement('option');
    optionMonth.value = (i + 1) < 10 ? `0${i + 1}` : i + 1; // Pad single-digit months with a leading zero
    optionMonth.textContent = monthNames[i];
    monthDropdown.appendChild(optionMonth);
}

    // Populate year options (current year to 100 years forward)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 100; year++) {
    const optionYear = document.createElement('option');
    optionYear.value = year;
    optionYear.textContent = year;
    yearDropdown.appendChild(optionYear);
}
}

    // Call the function to populate the dropdowns when the page loads
    window.onload = initializeExpectedDateDropdowns;

//date//
function displayDate() {
    const today = new Date();
    // Format date as MM/DD/YYYY
    // Display formatted date
    document.getElementById('current-date').innerText = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
}

// Display date immediately after page load
displayDate();

//QUANTITY JS
const unitSelect = document.getElementById('unitSelect');
const quantityInput = document.getElementById('quantity');
const unitLabel = document.getElementById('unitLabel');
const selectedQuantity = document.getElementById('selectedQuantity');

// Update the unit label when the select option changes
unitSelect.addEventListener('change', function () {
    // Update the label based on the selected unit
    if (unitSelect.value === 'grams') {
        unitLabel.textContent = 'g';
    } else if (unitSelect.value === 'milliliters') {
        unitLabel.textContent = 'ml';
    } else if (unitSelect.value === 'liters') {
        unitLabel.textContent = 'L';
    }
    updateQuantityDisplay();
});

// Update the displayed quantity when the input value changes
quantityInput.addEventListener('input', updateQuantityDisplay);

// Function to update the displayed quantity
function updateQuantityDisplay() {
    let unit = '';
    if (unitSelect.value === 'grams') {
        unit = 'g';
    } else if (unitSelect.value === 'milliliters') {
        unit = 'ml';
    } else if (unitSelect.value === 'liters') {
        unit = 'L';
    }
    selectedQuantity.innerText = `Selected Quantity: ${quantityInput.value} ${unit}`;
}

//connect database//
document.getElementById('service-request-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form values
    const chemicalName = document.getElementById('Chemical-Name').value;
    const researchTitle = document.getElementById('Research Title').value;
    const supervisorName = document.getElementById('Supervisor Name').value;
    const dateDay = document.getElementById('date-day').value;
    const dateMonth = document.getElementById('date-month').value;
    const dateYear = document.getElementById('date-year').value;
    const expDay = document.getElementById('exp-day').value;
    const expMonth = document.getElementById('exp-month').value;
    const expYear = document.getElementById('exp-year').value;
    const unitSelect = document.getElementById('unitSelect').value;
    const quantity = document.getElementById('quantity').value;

    // Create a data object
    const formData = {
        chemicalName,
        researchTitle,
        supervisorName,
        date: `${dateDay}-${dateMonth}-${dateYear}`,
        expectedDate: `${expDay}-${expMonth}-${expYear}`,
        unit: unitSelect,
        quantity
    };

    try {
        // Send a POST request to Azure Function API
        const response = await fetch('YOUR_AZURE_FUNCTION_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Data submitted successfully!');
        } else {
            alert('Error submitting data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit data.');
    }
});


function updateRiskLabel(value) {
    const riskPercentage = document.getElementById('riskPercentage');
    const riskLevel = document.getElementById('riskLevel');
    const riskOutput = document.querySelector('.risk-output');

    value = parseInt(value);  // Ensure the value is an integer

    // Update the percentage display
    riskPercentage.textContent = value + '';

    // Determine risk level and color based on value
    if (value >= 0 && value <= 3) {
        riskLevel.textContent = 'Low';
        riskOutput.style.color = 'green';
    } else if (value > 4 && value <= 6) {
        riskLevel.textContent = 'Medium';
        riskOutput.style.color = 'orange';
    } else {
        riskLevel.textContent = 'High';
        riskOutput.style.color = 'red';
    }
}

//hazard
const selectBox = document.getElementById('select-box');
const optionsContainer = document.getElementById('options-container');
const placeholder = document.querySelector('.placeholder');

// Toggle the dropdown visibility
selectBox.addEventListener('click', function() {
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
});

// Update the selected checkboxes text in the select box
optionsContainer.addEventListener('change', function() {
    const selectedOptions = [...optionsContainer.querySelectorAll('input[type="checkbox"]:checked')]
        .map(option => option.value);

    if (selectedOptions.length > 0) {
        placeholder.textContent = selectedOptions.join(', ');
    } else {
        placeholder.textContent = 'Select hazard types';
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!selectBox.contains(event.target) && !optionsContainer.contains(event.target)) {
        optionsContainer.style.display = 'none';
    }
});

//toxic
function handleToxicityChange() {
    const isToxic = document.getElementById('isToxic').value;
    const toxicEffectsContainer = document.getElementById('toxicEffectsContainer');

    if (isToxic === 'yes') {
        toxicEffectsContainer.style.display = 'block';
    } else {
        toxicEffectsContainer.style.display = 'none';
    }
}
