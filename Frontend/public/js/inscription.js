document.getElementById('inscription').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isUsernameValid(username)) {
        alert('Username must be alphanumeric and between 3 to 20 characters long.');
        return;
    }

    if (!isEmailValid(email)) {
        alert('Invalid email format.');
        return;
    }

    if (!isPasswordValid(password)) {
        alert('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
        return;
    }

        fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
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
