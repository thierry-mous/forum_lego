document.addEventListener('DOMContentLoaded', function () {
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

            if (posts.length > 0) {
                const firstPost = posts[0];
                const firstPostElement = document.createElement('div');
                firstPostElement.classList.add('first-post');
                firstPostElement.innerHTML = `
            <div class="center-container">
                <div class="post1">
                    <div class="user-info">
                    <div class="infopost">
                        <p class="username">${firstPost.author}</p>
                         <p class="user-role">${firstPost.admin_status ? firstPost.admin_status : 'User'}</p>
                    </div>
                        <p class="post-date">Posted on: ${new Date(firstPost.publish_date).toLocaleDateString()}</p>
                    </div>
                    <div class="post-content">
                    <p class="first-text">${firstPost.body}</p>
                    </div>
                </div>
            </div>
            `;
                postsContainer.appendChild(firstPostElement);

                const otherPostsContainer = document.createElement('div');
                otherPostsContainer.classList.add('other-posts');

                posts.slice(1).forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                    <div class="center-container">
                    <div class="comment">
                        <div class="user-info">
                        <div class="infopost">
                            <p class="username">${post.author}</p>
                            <p class="user-role">${post.admin_status ? post.admin_status : 'User'}</p>
                        </div>
                            <p class="post-date">Posted on: ${new Date(post.publish_date).toLocaleDateString()}</p>
                        </div>
                        <div class="post-content">
                            <p class="post-text">${post.body}</p>
                        </div>
                    </div>
                    </div>
                `;
                    otherPostsContainer.appendChild(postElement);
                });

                postsContainer.appendChild(otherPostsContainer);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
