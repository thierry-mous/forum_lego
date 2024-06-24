document.getElementById('inscription').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(username)) {
        alert("The username must contain only permitted letters, numbers and special characters.");
        return;
    }

    const response = await fetch('/check-unique', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    });

    const data = await response.json();

    if (data.userExists) {
        alert("Username already taken.");
        return;
    }

    if (data.emailExists) {
        alert("Email already taken.");
        return;
    }

    const isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!isPasswordValid) {
        alert("The password must contain at least 8 characters, one uppercase letter and one special character.");
        return;
    }

    const registerResponse = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const registerData = await registerResponse.json();

    if (registerData.success) {
        alert("successful registration !");
    } else {
        alert(registerData.message);
    }
});