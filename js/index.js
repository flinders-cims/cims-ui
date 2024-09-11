document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.querySelector('.btn-signup');
    const loginBtn = document.querySelector('.btn-login');

    signupBtn.addEventListener('click', function() {
        alert('Signup button clicked!');
    });

    loginBtn.addEventListener('click', function() {
        alert('Login button clicked!');
    });
});

