document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

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
                    <p class="username">${post.author}</p>
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
});

       