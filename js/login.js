
document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordField = document.getElementById("password");
    var passwordFieldType = passwordField.getAttribute("type");
    if (passwordFieldType === "password") {
        passwordField.setAttribute("type", "text");
        this.textContent = "Hide";
    } else {
        passwordField.setAttribute("type", "password");
        this.textContent = "Show";
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;

    // if (!passwordRequirements.test(password)) {
    //     alert("Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
    //     return;
    // }

    // Using Reqres.in public API for testing
    // fetch('https://cims-web-app-sample-b6bmeuh5hsa2fsb6.australiasoutheast-01.azurewebsites.net/api/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email: email, password: password })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.token) {
    //         // Handle successful login
    //         alert('Login successful! Token: ' + data.token);
    //         // You can redirect to another page or perform other actions here
    //     } else {
    //         // Handle login failure
    //         alert('Invalid email or password. Please try again.');
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('An error occurred. Please try again later.');
    // });
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
})
.then(response => {
    if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
    }
    return response.text(); // Extract the response body as a string
})
.then(data => {
    console.log('Success:', data); // Handle the success case
})
.catch((error) => {
    console.error('Error:', error.message); // Handle the error case
});

