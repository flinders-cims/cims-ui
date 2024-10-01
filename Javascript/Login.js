document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

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
.then(response => {
    return response.text().then(text => {
        if (response.ok && text.toLowerCase().includes('login successful')) {
            window.location.href = 'ResearchStaffdash.html';
        } else {
            document.getElementById('message').textContent = 'Login failed: ' + text;
        }
    });
})
.catch(error => {
    document.getElementById('message').textContent = 'An error occurred: ' + error.message;
    console.error('Error during login:', error);
});
});
