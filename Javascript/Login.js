document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    document.getElementById('message').textContent = 'Logging in...';
    const requestBody = JSON.stringify({
        username: username,
        password: password
    });
    const apiUrl = `https://flinders-cims-api-dev.azurewebsites.net/cims/user/logins?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(response => {
        return response.json().then(data => { // assuming API returns JSON
            if (response.ok) {
                // Store userId in localStorage
                localStorage.setItem('userId', data.userId);

                // Redirect to dashboard if login is successful
                window.location.href = 'ResearchStaffdash.html';
            } else {
                // If response is not OK, show login failure message
                document.getElementById('message').textContent = 'Invalid credentials. Please try again.';
            }
        });
    })
.catch(error => {
    document.getElementById('message').textContent = 'An error occurred: ' + error.message;
    console.error('Error during login:', error);
});
});
