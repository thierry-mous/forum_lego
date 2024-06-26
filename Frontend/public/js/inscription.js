document.getElementById('inscription').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    clearErrorMessage();

    if (!isUsernameValid(username)) {
        showErrorMessage('Username must be alphanumeric and between 3 to 20 characters long.');
        return;
    }

    if (!isEmailValid(email)) {
        showErrorMessage('Invalid email format.');
        return;
    }

    if (!isPasswordValid(password)) {
        showErrorMessage('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
        return;
    }

    fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully! Redirecting to login page...');
            window.location.href = 'http://localhost:8080/login';
        } else {
            showErrorMessage('Error creating account: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('An error occurred while creating the account.');
    });
});

function isUsernameValid(username) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isPasswordValid(password) {
    if (password.length < 8) {
        return false;
    }
    const regexUpper = /[A-Z]/;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    return regexUpper.test(password) && regexSpecial.test(password);
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}

function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}
