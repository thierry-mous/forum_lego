document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/topics/getTopics', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('topicsContainer');
        data.forEach(topic => {
            const topicElement = document.createElement('a');
            topicElement.href = `topic${topic.id}.html`;
            topicElement.classList.add('post-link');
            topicElement.innerHTML = `
                <div class="post">
                    <div class="user-info">
                        <p class="username">${topic.author}</p>
                        <p class="user-role">Member</p>
                    </div>
                    <div class="post-content">
                        <p class="post-date">Posted on: ${new Date(topic.publish_date).toLocaleDateString()}</p>
                        <p class="post-text">${topic.body}</p>
                    </div>
                </div>
            `;
            container.appendChild(topicElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});