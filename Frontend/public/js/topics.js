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
            topicElement.href = `posts?id=${topic.id}`;
            topicElement.classList.add('post-link');
            topicElement.innerHTML = `
                <div class="post">
                    <div class="user-info">
                        <p class="username">${topic.username}</p>
                                <p class="user-role">${topic.admin_status}</p>
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

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('post-link')) {
            event.preventDefault();
            const topicId = event.target.dataset.topicId;
            fetch(`http://localhost:3000/api/topics/getTopics/${topicId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(posts => {
                const postsContainer = document.getElementById('postsContainer');
                postsContainer.innerHTML = ''; 
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <div class="user-info">
                            <p class="username">${post.username}</p>
                            <p class="user-role">${post.admin_status ? post.admin_status : 'User'}</p>
                        </div>
                        <div class="post-content">
                            <p class="post-date">Posted on: ${new Date(post.publish_date).toLocaleDateString()}</p>
                            <p class="post-text">${post.body}</p>
                        </div>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});