document.getElementById('loginform').addEventListener('submit', async function(event) {
    event.preventDefault();

    const identifier = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!identifier || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    });

    const data = await response.json();

    if (data.success) {
        alert("Connexion réussie !");
    window.location.href = '/';
    } else {
        alert(data.message);
    }
});
