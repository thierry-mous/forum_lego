document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json(); 
    })
    .then(data => {
        localStorage.setItem('jwtToken', data.token);
        window.location.href = '/profile';
    })
    .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = 'Error: ' + error.message;
        } else {
            console.error('Element with ID "message" not found in the DOM.');
        }
    });
});

