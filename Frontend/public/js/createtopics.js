document.getElementById('create-btn').addEventListener('click', async function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('message').value;
    const tags_id = document.getElementById('category').value;

    const topic = {
        title,
        body,
        state: 'published',
        users_id: 1, // Remplacer par l'ID de l'utilisateur authentifié
        tags_id
    };

    try {
        const response = await fetch('http://localhost:3000/api/topics/createTopic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
