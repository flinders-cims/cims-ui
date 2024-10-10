document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    document.getElementById('message').textContent = 'Logging in...';
    const requestBody = JSON.stringify({
        username: username,
        password: password
    });
    const apiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.userId) { // Assuming a valid response contains userId
            // Store userId in localStorage
            localStorage.setItem('userId', data.userId);

            // Redirect to dashboard if login is successful
            window.location.href = 'ResearchStaffdash.html';
        } else {
            // If the login fails, show the failure message
            document.getElementById('message').textContent = 'Invalid credentials. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Invalid credentials. Please try again.';
        console.error('Error during login:', error);
    });
});
