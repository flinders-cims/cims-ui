var researchModal = document.getElementById("research-modal");
var closeBtn = document.getElementsByClassName("research-close")[0];
var successMessage = document.getElementById('research-success-message');

// Event listener for the "Add Research" button
document.getElementById("button-add-research").addEventListener("click", function () {
    openResearchModal();
});

function openResearchModal() {
    researchModal.style.display = "block";
    var today = new Date().toISOString().split('T')[0];

    // Set the max attribute for the start and end date fields
    document.getElementById('research-start-date').setAttribute('max', today);
    document.getElementById('research-start-date').value = today;

    // Optionally set other fields to initial values if needed
}

// Close modal on clicking the close button
closeBtn.onclick = function () {
    researchModal.style.display = "none";
    resetFormFields();
};

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == researchModal) {
        researchModal.style.display = "none";
        resetFormFields();
    }
};

// Reset form fields when closing the modal
function resetFormFields() {
    document.getElementById('research-form').reset();
}

document.getElementById('research-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const userId = localStorage.getItem("userId");
    var submitUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/research/add/${userId}`;

    // Get form data and convert it to a JSON object
    var formData = {
        title: document.getElementById('research-title').value,
        description: document.getElementById('research-description').value,
        startDate: document.getElementById('research-start-date').value,
        expectedEndDate: document.getElementById('research-end-date').value
    };

    fetch(submitUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData) // Send the JSON data
    })
    .then(response => {
        if (response.ok) { // HTTP status code 200-299 indicates success
            return response.json(); // Parse the response as JSON
        } else {
            throw new Error('Failed to submit research'); // Handle unsuccessful request
        }
    })
    .then(data => {
        // Handle successful response
        console.log('Success:', data);
        window.location.reload(); // Reload the page upon successful submission
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        var errorMessage = document.getElementById('research-error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Submission failed. Please try again.'; // Display error message
    });
});

