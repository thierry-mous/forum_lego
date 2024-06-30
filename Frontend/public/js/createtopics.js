document.getElementById('create-btn').addEventListener('click', async function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('message').value;
    const tags_id = document.getElementById('category').value;

    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('User is not authenticated');
        return;
    }

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    console.log('User ID:', userId);

    const topic = {
        title,
        body,
        state: 'published',
        users_id: userId,
        tags_id
    };

    try {
        const response = await fetch('http://localhost:3000/api/topics/createTopic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(topic)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Topic created successfully');
        } else {
            alert(data.message || 'Error creating topic');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error');
    }
});
