document.getElementById('inscription').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    clearErrorMessage();

    if (!isUsernameValid(username)) {
        showErrorMessage('Username must be alphanumeric and between 3 to 20 characters long.');
        return;
    }


    if (!isPasswordValid(password)) {
        showErrorMessage('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
        return;
    }

    if (!isEmailValid(email)) {
        showErrorMessage('Email is not valid.');
        return;
    }


        fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })
    .then(response => response.text())
    .then(data => {
        window.location.href = 'http://localhost:8080/login';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function isUsernameValid(username) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}

function isPasswordValid(password) {
    if (password.length < 8) {
        return false;
    }
    const regexUpper = /[A-Z]/;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    return regexUpper.test(password) && regexSpecial.test(password);
}

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}

function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}