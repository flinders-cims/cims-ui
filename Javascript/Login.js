document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginRequest = {
        username: username,
        password: password
    };
    document.getElementById('message').textContent = 'Logging in...';
    const apiUrl = 'https://flinders-cims-api-dev.azurewebsites.net/cims/user/login';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest) // Convert loginRequest object to JSON string
    })
    .then(response => {
        if (!response.ok) { // Check if the response status is not OK (i.e., 401 or any error)
            throw new Error('Invalid credentials'); // Handle unauthorized (401) or other errors
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        if (data.userId) { // Assuming a valid response contains userId
            // Store userId and userName in localStorage
            localStorage.setItem('userId', data.userId);
            localStorage.setItem("userName", data.firstName + " " + data.lastName);

            // Redirect to dashboard if login is successful
            window.location.href = 'ResearchStaffdash.html';
        }
    })
    .catch(error => {
        // If the login fails, show the failure message
        document.getElementById('message').textContent = error.message || 'Invalid credentials. Please try again.';
        console.error('Error during login:', error);
    });
});
