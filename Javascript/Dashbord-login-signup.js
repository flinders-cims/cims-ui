document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login-btn");


    loginBtn.addEventListener("click", function () {
        window.location.href = "../Login.html"; // Replace with the login page URL
    });
});

    let isValid = true;

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    // Validate Username
    if (username.value.trim() === '') {
        setError(username, 'Username cannot be blank');
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Validate Email
    if (email.value.trim() === '') {
        setError(email, 'Email cannot be blank');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Email is not valid');
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Validate Password
    if (password.value.trim() === '') {
        setError(password, 'Password cannot be blank');
        isValid = false;
    } else if (password.value.trim().length < 6) {
        setError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Validate Confirm Password
    if (confirmPassword.value.trim() === '') {
        setError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (confirmPassword.value.trim() !== password.value.trim()) {
        setError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(confirmPassword);
    }

    if (isValid) {
        // Form is valid, you can submit it here or show success message
        alert('Signup Successful!');
    }


function setError(element, message) {
    const parent = element.parentElement;
    parent.classList.add('error');
    const small = parent.querySelector('small');
    small.textContent = message;
    small.style.visibility = 'visible';
}

function setSuccess(element) {
    const parent = element.parentElement;
    parent.classList.remove('error');
    const small = parent.querySelector('small');
    small.style.visibility = 'hidden';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
